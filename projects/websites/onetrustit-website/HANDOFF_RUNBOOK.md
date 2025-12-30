# One Trust IT - Website Handoff & Runbook

This document serves as the complete manual for the **One Trust IT** website. It covers project setup, customization, content updates, and deployment.

## 🚀 Project Overview

*   **Type**: Single-page modern website
*   **Tech Stack**: [React](https://reactjs.org/), [Vite](https://vitejs.dev/) (Build Tool), [Tailwind CSS v4](https://tailwindcss.com/) (Styling), [Lucide React](https://lucide.dev/) (Icons).
*   **Key Features**: Dark Mode UI, Glassmorphism, Responsive Grid Layouts, Formspree Contact Form, 3D Assets.

---

## 🛠️ Installation & Setup

If you are moving this project to a new computer, follow these steps:

1.  **Install Node.js**: Ensure you have Node.js (v18 or higher) installed.
2.  **Open Terminal**: Navigate to the project folder.
    ```bash
    cd onetrustit-replit-website
    ```
3.  **Install Dependencies**:
    ```bash
    npm install
    ```
4.  **Start Development Server** (View site locally):
    ```bash
    npm run dev
    ```
    The site will be available at `http://localhost:5173`.

---

## 🎨 Customization Guide

### 1. Branding (Logo & Icons)
*   **Files**: All images are in the `public/` folder.
    *   `logo-full.png`: The main 3D logo used in the Navbar and Footer.
    *   `favicon.png`: The browser tab icon.
    *   `og-image.png`: The social media share banner.
*   **How to Change**:
    1.  Place your new files in `public/`.
    2.  If you keep the same filenames, no code changes are needed.
    3.  If you change filenames, update references in `src/components/Navbar.jsx` (Line 31) and `src/components/Footer.jsx` (Line 12).

### 2. Colors & Typography
*   **Colors**: Configured in `src/index.css` under the `@theme` block.
    *   `--color-brand-primary`: The main blue accent (Cyan/Blue mix).
    *   `--color-brand-darker`: The deep background color.
*   **Fonts**: The site uses **Inter** from Google Fonts, imported in `index.html`.

### 3. Navigation Links
*   **File**: `src/components/Navbar.jsx`
*   **How to Edit**: Look for the `navLinks` array (~Line 17).
    ```javascript
    const navLinks = [
        { name: 'Services', href: '#services' },
        { name: 'Plans', href: '#pricing' }, // Updated from 'Solutions'
        { name: 'Company', href: '#about' },
    ];
    ```
    Simply change the `name` or `href` to update the menu.

---

## 📝 Editing Content

### Hero Section (Main Banner)
*   **File**: `src/sections/Hero.jsx`
*   **Update**: Change the headline text inside the `<h1>` and the subheadline in the `<p>` tag.
*   **Urgent CTA**: The "Urgent incident?" banner is located at the bottom of the content block (~Line 65).

### Services Section
*   **File**: `src/sections/Services.jsx`
*   **Update**: Modify the `services` array at the top of the file.
    ```javascript
    const services = [
      {
        icon: <Shield ... />,
        title: "Managed Security (MSSP)",
        description: "..."
      },
      // ...
    ];
    ```

### Plans & SLAs (Pricing)
*   **File**: `src/sections/Pricing.jsx`
*   **Update**: Edit the `plans` array. You can change prices, features list, or badges (e.g., "Most Popular").
    *   To make a plan popular/highlighted: Set `popular: true`.

### Ecosystem Carousel (Partners)
*   **File**: `src/sections/Ecosystem.jsx`
*   **Update**: Modify the `partners` array.
    ```javascript
    const partners = [
      { name: 'CrowdStrike', category: 'EDR', icon: ... },
      // ...
    ];
    ```

### Client Success (Testimonials)
*   **File**: `src/sections/Testimonials.jsx`
*   **Update**: Edit the `testimonials` array to add new client quotes, names, and success metrics.

### Contact Form
*   **File**: `src/sections/Contact.jsx`
*   **Important**: Ensure your Formspree ID is correct.
    ```javascript
    const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mbdjeaqv';
    ```
    Change `'mbdjeaqv'` if you create a new form in the future.

---

## 🚢 Deployment

### Option A: GitHub Pages (Recommended / Free)
I have already set up a **"Secure Deployment Workflow"** in `.github/workflows/deploy.yml`.

**To deploy:**
1.  **Create a New Repository** on GitHub (do not add a README/gitignore there).
2.  **Push your code**:
    ```bash
    git add .
    git commit -m "Initial commit"
    git branch -M main
    git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
    git push -u origin main
    ```
3.  **Activate in GitHub**:
    *   Go to **Settings** > **Pages**.
    *   Under "Source", ensure it says **"GitHub Actions"** (if beta) or wait for the Action to run.
    *   Once the Action finishes (check the **Actions** tab), your site will be live!

### Option B: Netlify/Vercel
1.  Connect your GitHub repository to Netlify or Vercel.
2.  It should auto-detect "Vite".
3.  Ensure Build Command is `npm run build` and Publish Directory is `dist`.
4.  Click **Deploy**.

---

## 📂 Project Structure Map

```text
/
├── public/              # Static assets (Logos, icons)
├── src/
│   ├── components/      # Reusable UI parts (Navbar, Footer, Button)
│   ├── sections/        # Main page sections (Hero, Services, Contact...)
│   ├── App.jsx          # Main layout assembler
│   ├── main.jsx         # Entry point
│   └── index.css        # Tailwind Global Styles
├── index.html           # HTML entry point (SEO tags here)
├── package.json         # Dependencies
└── tailwind.config.js   # Tailwind Config (Legacy support)
```
