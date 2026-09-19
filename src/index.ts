import express from "express";
import helmet from "helmet";
import cors from "cors";
import { config } from "./config";
import { connectRedis } from "./utils/redis";
import { prisma } from "./utils/prisma";
import { authMiddleware, rateLimiter, requestLogger } from "./middleware";
import { routes } from "./routes";
import { eventPipeline } from "./core/events/pipeline";
import { scheduler } from "./core/scheduler";
import { Logger } from "./utils/logger";
import { disconnectDb } from "./utils/prisma";
import { disconnectRedis } from "./utils/redis";

const app = express();
export { app };
const logger = new Logger("App");

async function bootstrap() {
  try {
    app.use(helmet({
      contentSecurityPolicy: false, // CSP set per-route for API
      hsts: config.hsts,
      frameguard: { action: "deny" },
      hidePoweredBy: true,
      noSniff: true,
      xssFilter: true,
    }));
    app.use(cors(config.cors));
    app.use(express.json({ limit: "10mb" }));
    app.use(express.urlencoded({ extended: true }));

    app.use(requestLogger);
    app.use("/api/auth", rateLimit({
      windowMs: config.authRateLimit.windowMs,
      max: config.authRateLimit.max,
      standardHeaders: true,
      legacyHeaders: false,
      message: { error: "Too many auth attempts, try again later" },
    }));
    app.use(rateLimiter);

    app.use("/api/v1", routes);

    app.get("/health", (_req, res) => {
      res.json({ status: "ok", uptime: process.uptime() });
    });

    await connectRedis();
    await prisma.$connect();

    eventPipeline.init();
    scheduler.init();

    const port = config.port || 3000;
    app.listen(port, () => {
      logger.info(`OpenMarketing Hub running on port ${port}`);
      logger.info(`Environment: ${config.nodeEnv}`);
    });
  } catch (error) {
    logger.error("Failed to start application", error);
    process.exit(1);
  }
}

process.on("unhandledRejection", (reason) => {
  logger.error("Unhandled Rejection:", reason);
});

process.on("uncaughtException", (error) => {
  logger.error("Uncaught Exception:", error);
  process.exit(1);
});

// Graceful shutdown handlers for commercial deployment
function shutdown(signal: string) {
  logger.info(`Received ${signal}, shutting down gracefully...`);
  Promise.all([disconnectDb(), disconnectRedis()])
    .then(() => {
      logger.info("Shutdown complete");
      process.exit(0);
    })
    .catch((error) => {
      logger.error("Error during shutdown", error);
      process.exit(1);
    });
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));

bootstrap();
