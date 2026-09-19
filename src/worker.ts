import { syncManager } from "./core/integrations/sync-manager";
import { eventQueue } from "./core/events/queue";
import { connectRedis } from "./utils/redis";
import { prisma } from "./utils/prisma";
import { Logger } from "./utils/logger";

const logger = new Logger("Worker");

async function startWorker() {
  try {
    await connectRedis();
    await prisma.$connect();

    logger.info("Worker started");

    // Process sync jobs
    const syncQueue = await syncManager.getQueue();

    // Process event jobs
    const eventQueueInstance = await eventQueue.getQueue();

    // Handle graceful shutdown
    process.on("SIGTERM", async () => {
      logger.info("SIGTERM received, shutting down...");
      await syncQueue.close();
      await eventQueueInstance.close();
      await prisma.$disconnect();
      process.exit(0);
    });
  } catch (error) {
    logger.error("Worker failed to start", error);
    process.exit(1);
  }
}

startWorker();
