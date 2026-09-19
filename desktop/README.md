# OpenMarketing Hub - Desktop App

Native desktop and mobile wrapper for the OpenMarketing Hub web app, built with the Tauri framework.

Produces installers for:

- **Windows** → `.exe` / `.msi` (installer)
- **macOS** → `.dmg` (disk image)
- **Android** → `.apk` (application package)

## Requirements

- **Node.js** 20.x
- **Rust** toolchain (stable)
- **JDK 17+** (for Android APK builds)
- **Android SDK/NDK** 25.x (for `.apk` builds only)

## Quick Start

```bash
# Install dependencies
cd desktop && npm install

# Start development (hot reload)
npm run tauri:dev
```

## Building Installers

### Windows (.exe / .msi)

```bash
rustup target add x86_64-pc-windows-msvc
npm run package:windows
```

Output: `desktop/src-tauri/target/release/bundle/nsis/`

### macOS (.dmg)

```bash
rustup target add x86_64-apple-darwin
npm run package:macos
```

Output: `desktop/src-tauri/target/release/`

### Android (.apk)

```bash
# Set environment variables
export JAVA_HOME=/path/to/jdk-17
export ANDROID_HOME=$HOME/Android/Sdk
export ANDROID_SDK_ROOT=$ANDROID_HOME
export ANDROID_NDK_HOME=$ANDROID_HOME/ndk/25.2.9519653
export PATH=$JAVA_HOME/bin:$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools:$ANDROID_HOME/build-tools/34.0.0:$ANDROID_HOME/ndk/25.2.9519653:$PATH

npm run package:android
```

Output: `desktop/src-tauri/target/aarch64-linux-android/release/`

### Build All

```bash
npm run package:all
```

## Architecture

The desktop app is a thin wrapper that:

1. Bundles the React frontend (Vite)
2. Embeds a Rust-based native shell (Tauri)
3. Connects to your backend API (localhost or remote)
4. Provides native windowing, tray, and platform integration

```text
desktop/
├── src/                  # React frontend source
│   ├── App.tsx
│   ├── main.tsx
│   ├── styles.css
│   └── components/
├── src-tauri/            # Rust backend (Tauri)
│   ├── src/lib.rs
│   ├── tauri.conf.json
│   ├── Cargo.toml
│   ├── build.rs
│   └── icons/
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Distribution

| Platform | Build Command | Output Path |
| --- | --- | --- |
| Windows `.exe`/`.msi` | `npm run package:windows` | `desktop/src-tauri/target/release/bundle/nsis/` |
| macOS `.dmg` | `npm run package:macos` | `desktop/src-tauri/target/release/` |
| Android `.apk` | `npm run package:android` | `desktop/src-tauri/target/aarch64-linux-android/release/` |

## Android Configuration

- **Package name**: `com.openmarketing.hub`
- **Min SDK**: 24
- **Target SDK**: 34
- **Compile SDK**: 34
- **Permissions**: INTERNET, ACCESS_NETWORK_STATE, WRITE_EXTERNAL_STORAGE, READ_EXTERNAL_STORAGE

## Signing (Recommended for Commercial Use)

Sign your binaries to establish trust:

```bash
# Generate a code-signing certificate
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes -subj "/CN=OpenMarketing Hub"

# Set signing keys (Windows/macOS) in tauri.conf.json
# Under bundle.android.key section
```

## CI/CD

GitHub Actions workflows are defined in `.github/workflows/build.yml`:

- Builds backend, Windows, macOS, and Android packages
- Includes linting, testing, and security scans
- Uploads artifacts for each platform

## License

See [LICENSE](LICENSE) for details.
