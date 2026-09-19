# OpenMarketing Hub - Deployment Guide

Production-ready deployment for commercial use across Windows, macOS, Android, and cloud (Docker).

## Architecture

```mermaid
graph LR
    A[Desktop App] -->|HTTP| B[Backend API]
    A -->|HTTP| C[PostgreSQL]
    C -->|Query| D[Redis]
    E[Worker] -->|Queue| D
- **JDK 17+** (for Android APK builds)
- **Android SDK/NDK** (for `.apk` builds): install via Android Studio
- **PostgreSQL** 16+
- **Redis** 7+

## 1. Build the Backend (Node.js)

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Edit .env with your production values

# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate deploy

# Seed database
npm run seed

# Build
npm run build

# Start
npm start
```

## 2. Build Desktop Apps

OpenMarketing Hub uses [Tauri](https://tauri.app) — a Rust-based framework that packages your React app into native desktop and mobile binaries.

### Prerequisites for Tauri

```bash
# Install Rust toolchain
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
rustup default stable

# Install targets
rustup target add x86_64-pc-windows-msvc    # Windows
rustup target add x86_64-apple-darwin       # macOS
rustup target add aarch64-linux-android     # Android

# Install JDK 17+
export JAVA_HOME=$(/usr/libexec/java_home -v 17)   # macOS
# On Linux: sudo apt install openjdk-17-jdk
# On Windows: install JDK 17 from temurin.net

# Install Android SDK/NDK
# Install Android Studio or Android SDK command-line tools
export ANDROID_HOME=$HOME/Android/Sdk
export ANDROID_SDK_ROOT=$ANDROID_HOME
export ANDROID_NDK_HOME=$ANDROID_HOME/ndk/25.2.9519653
export PATH=$JAVA_HOME/bin:$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools:$ANDROID_HOME/build-tools/34.0.0:$ANDROID_HOME/ndk/25.2.9519653:$PATH
```

### Build for Windows (.exe / .msi)

```bash
npm run package:windows
# Output: desktop/src-tauri/target/release/bundle/nsis/OpenMarketing_Hub_1.0.0_x64-setup.exe
#         desktop/src-tauri/target/release/bundle/msi/OpenMarketing_Hub_1.0.0_x64.msi
```

### Build for macOS (.dmg)

```bash
npm run package:macos
# Output: desktop/src-tauri/target/release/OpenMarketing_Hub_1.0.0_x64.dmg
```

### Build for Android (.apk)

```bash
npm run package:android
# Output: desktop/src-tauri/target/aarch64-linux-android/release/app-debug.apk
#         desktop/src-tauri/target/aarch64-linux-android/release/app-release.apk
```

### Build All at Once

```bash
npm run package:all
```

## 3. Build Output Paths

| Platform | Build Command | Output Path |
|----------|--------------|-------------|
| Windows `.exe` | `npm run package:windows` | `desktop/src-tauri/target/release/bundle/nsis/` |
| Windows `.msi` | `npm run package:windows` | `desktop/src-tauri/target/release/bundle/msi/` |
| macOS `.dmg` | `npm run package:macos` | `desktop/src-tauri/target/release/` |
| Android `.apk` | `npm run package:android` | `desktop/src-tauri/target/aarch64-linux-android/release/` |

## 4. Docker Deployment

```bash
# Build images
docker-compose build

# Start services
docker-compose up -d

# Scale for production
docker-compose up -d --scale app=3 --scale worker=2
```

## 5. Production Docker Compose

Use `deploy/production.yml` for orchestrated production deployment:

```bash
docker stack deploy -c deploy/production.yml omh
```

## 6. Environment Variables Reference

| Variable | Required | Description |
| --- | --- | --- |
| `NODE_ENV` | Yes | Set to `production` |
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `REDIS_URL` | Yes | Redis connection string |
| `JWT_SECRET` | Yes | Secret for JWT signing (use `openssl rand -base64 48`) |
| `JWT_REFRESH_SECRET` | Yes | Secret for refresh tokens |
| `GOOGLE_CLIENT_ID` | No | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | No | Google OAuth client secret |
| `META_APP_ID` | No | Meta (Facebook) app ID |
| `META_APP_SECRET` | No | Meta app secret |
| `META_ACCESS_TOKEN` | No | Meta access token |
| `CORS_ORIGIN` | Yes | Comma-separated allowed origins |

## Desktop App Configuration

### Tauri Config (`desktop/src-tauri/tauri.conf.json`)

- **Windows installer**: NSIS (`bundle.targets: ["nsis"]`)
- **macOS installer**: DMG (`bundle.targets: ["dmg"]`)
- **Android APK**: AArch64 Linux Android (`bundle.targets: ["apk"]`)
- **App icon**: `desktop/src-tauri/icons/` (32x32.png, 128x128.png, 128x128@2x.png, icon.ico)

### Android Configuration

- **Package**: `com.openmarketing.hub`
- **Min SDK**: 24
- **Target SDK**: 34
- **Compile SDK**: 34
- **Permissions**: INTERNET, ACCESS_NETWORK_STATE, WRITE_EXTERNAL_STORAGE, READ_EXTERNAL_STORAGE

## CI/CD Pipeline

GitHub Actions workflows are defined in `.github/workflows/build.yml`:

- **`build-backend`**: Builds and tests the Node.js backend
- **`build-desktop-windows`**: Builds Windows .exe/.msi installer
- **`build-desktop-macos`**: Builds macOS .dmg
- **`build-desktop-android`**: Builds Android .apk
- **`build-desktop-all`**: Orchestrates all platform builds
- **`lint-and-test`**: Runs linting and tests
- **`security-scan`**: Runs npm audit and dependency checks

## Security Checklist for Commercial Use

- [ ] Generate strong JWT secrets: `openssl rand -base64 48`
- [ ] Set `NODE_ENV=production` (disables debug logging)
- [ ] Enable HTTPS with HSTS headers
- [ ] Configure `CORS_ORIGIN` to your domain only
- [ ] Run behind a reverse proxy (nginx) with TLS termination
- [ ] Set `AUTH_RATE_LIMIT_MAX` to prevent brute force
- [ ] Use a managed PostgreSQL (RDS, Cloud SQL, etc.) with backups
- [ ] Enable Redis persistence (`appendonly yes`)
- [ ] Set up log aggregation and alerting
- [ ] Run regular database backups
- [ ] Keep dependencies updated (`npm audit`)
- [ ] Sign desktop binaries (Windows/macOS)
- [ ] Upload APK to Google Play Store with proper signing

## License

See [LICENSE](LICENSE) for details.
