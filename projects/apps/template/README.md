# Desktop/Mobile App Template

Application template for desktop or mobile platforms.

## Structure

```
├── src/                  # Application source
│   ├── main.ts           # Entry point
│   ├── App.tsx           # Main component
│   └── components/
├── tests/                # Test files
├── dist/                 # Build output (gitignored)
├── package.json
└── README.md
```

## Quick Start

```bash
# Install dependencies
npm install

# Development
npm run dev

# Build
npm run build

# Test
npm test
```

## Platform-Specific

### Electron (Desktop)

```bash
npm install electron
npm run electron:dev
npm run electron:build
```

### React Native (Mobile)

```bash
npx react-native init MyApp
cd MyApp
npm run ios
npm run android
```

## Building

### Production Build

```bash
# Desktop
npm run build:desktop

# Mobile
npm run build:ios
npm run build:android
```

### Code Signing

Configure code signing for production releases.
