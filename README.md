# OpenMarketing Hub

Open-source, self-hosted all-in-one SEO and marketing automation platform. Connect and manage Google, Meta, SEO, and advertising tools from a single dashboard.

## Features

### All-in-One SEO Platform

- **SEO Dashboard**: Comprehensive score tracking, keyword rankings, backlink analysis
- **Technical SEO Audit**: 12-category automated audit (performance, mobile, accessibility, security, indexing, structured data, etc.)
- **Content Analysis**: Word count, readability, heading structure, keyword density, duplicate detection
- **Competitor Tracking**: Keyword gap analysis, backlink comparison, SEO score benchmarking
- **AI-Powered Insights**: Automated recommendations with confidence scoring
- **Sitemap Manager**: XML sitemap generation, validation, search engine pinging
- **Robots.txt Manager**: Auto-generation and validation
- **Schema Markup Builder**: Organization, Website, Article, Product, FAQ, LocalBusiness, Breadcrumbs
- **Keyword Research**: Position tracking, volume analysis, keyword clustering
- **Backlink Analysis**: Domain authority, spam score, anchor text distribution, referring domains

### Google Marketing Tools

- **Google Analytics 4 (GA4)** - Real-time analytics and conversion tracking
- **Google Ads** - Campaign management and performance reporting
- **Google Search Console** - Search performance and indexing monitoring
- **Google Tag Manager** - Tag management and deployment

### Meta Tools

- **Meta Pixel** - Event tracking and conversion measurement
- **Meta Conversions API (CAPI)** - Server-side conversion tracking with deduplication

### Event & Pipeline System

- Real-time marketing event tracking
- Configurable data pipelines (filter, transform, enrich, route)
- BullMQ-based event queue with retry and dead letter handling
- Batch event processing

### Tag & Pixel Management

- Centralized tag control with drag-and-drop ordering
- Consent-aware tag loading (GDPR/CCPA compliant)
- Google Analytics, GA4, GTM, custom HTML tags
- Meta Pixel verification and fire event tracking

### Consent Management

- GDPR/CCPA compliance built-in
- Consent banner configuration
- Granular category controls
- Audit logging for all consent changes

### Reporting & Dashboards

- Comprehensive SEO reports (technical, content, competitor, keyword, backlink)
- Custom report builder with filters
- CSV/PDF export
- Scheduled report generation
- AI-generated executive summaries

### Plugin Architecture

- Modular and extensible design
- Plugin SDK for custom integrations
- Built-in sample connector

## Quick Start

```bash
# Clone the repository
git clone https://github.com/openmarketing-hub/openmarketing-hub.git
cd openmarketing-hub

# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Edit .env with your credentials

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Seed the database
npx ts-node prisma/seed.ts

# Start development server
npm run dev
```

## Docker Deployment

```bash
# Build and start all services
docker-compose up -d

# Production deployment
docker-compose -f deploy/production.yml up -d
```

## Project Structure

```text
openmarketing-hub/
├── src/
│   ├── core/              # Core modules (events, tags, consent, connectors, scheduler)
│   ├── modules/
│   │   ├── seo/           # SEO platform (services, auditors, analyzers, competitors, schemas, sitemap, AI)
│   │   ├── google/        # Google adapters (Analytics, Ads, Search Console)
│   │   ├── meta/          # Meta adapters (Pixel, CAPI)
│   │   ├── rank-trackers/ # Keyword rank tracking
│   │   ├── crawlers/      # Website crawling service
│   │   ├── sites/         # Site management
│   │   ├── reporting/     # Report generation and export
│   │   └── ad-platforms/  # Adapter factory
│   ├── routes/            # API route handlers
│   ├── middleware/        # Express middleware (auth, rate limiting, RBAC)
│   ├── utils/             # Utility functions (prisma, redis, logger, validators)
│   ├── config/            # Application configuration
│   └── worker.ts          # Background worker process
├── client/src/            # React dashboard frontend
├── docs/                  # Documentation
├── docker/                # Docker configuration
├── deploy/                # Deployment scripts and configs
├── tests/                 # Test files
├── plugins/               # Plugin directory
├── docker-compose.yml     # Docker Compose configuration
├── Dockerfile             # Docker image definition
├── prisma/                # Database schema and migrations
└── package.json
```

## API Documentation

See [API Design](docs/api-design.md) for complete API documentation.

## SEO Platform Documentation

- [Technical Audit](docs/architecture.md#seo-platform-architecture)
- [Content Analysis](docs/architecture.md#seo-platform-architecture)
- [Competitor Tracking](docs/architecture.md#seo-platform-architecture)
- [Sitemap & Robots.txt](docs/architecture.md#seo-platform-architecture)
- [Schema Markup](docs/architecture.md#seo-platform-architecture)
- [AI Insights](docs/architecture.md#seo-platform-architecture)

## Security

See [Security Requirements](docs/security.md) for complete security documentation.

## Development Roadmap

See [Roadmap](docs/roadmap.md) for the development plan.

## Risks & API Limitations

See [Risks & Limitations](docs/risks.md) for risk analysis and API limitation documentation.

## Contributing

We welcome contributions! Please see [Development Roadmap](docs/roadmap.md) for priorities.

## License

MIT License - see LICENSE file for details.
