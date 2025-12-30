# Website Template

A web project template for static sites and SPAs.

## Structure

```
├── src/                  # Source files (HTML, CSS, JS, etc.)
├── public/               # Static assets (images, fonts, etc.)
├── tests/                # Test files
├── dist/                 # Build output (gitignored)
├── package.json
├── vite.config.js        # or webpack.config.js
└── README.md
```

## Quick Start

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build

# Run tests
npm test
```

## Configuration

### package.json

```json
{
  "name": "my-website",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest"
  },
  "dependencies": {},
  "devDependencies": {
    "vite": "^5.0.0"
  }
}
```

## Deployment

Build to `dist/` and deploy to:
- GitHub Pages
- Netlify
- Vercel
- AWS S3 + CloudFront
