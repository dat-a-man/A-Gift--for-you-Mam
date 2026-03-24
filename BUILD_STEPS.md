# Build Steps: Modern Centered Blog Platform

This document outlines the steps to build and deploy the Modern Centered Blog Platform using React (Next.js), TypeScript, Sanity, and Shadcn UI.

## 1. Architecture

We follow the **Atomic Design** methodology:

- **Atoms**: Basic building blocks (Buttons, Typography, Avatars).
- **Molecules**: Groups of atoms (PostCard, SearchBar).
- **Organisms**: Complex UI sections (Header, BlogList, AboutSection).
- **Templates**: Page layouts.
- **Pages**: Next.js App Router pages.

**Tech Stack:**

- Framework: Next.js 14+ (App Router)
- Language: TypeScript
- Styling: Tailwind CSS + Shadcn UI
- CMS: Sanity
- Animations: Framer Motion
- Content: Sanity Portable Text

## 2. Setup Instructions

### Prerequisites

- Node.js 18+
- Sanity account + project

### Installation

1.  **Initialize Project** (if not already done):

    ```bash
    npx create-next-app@latest . --typescript --tailwind --eslint
    # Select "Yes" for App Router, "No" for src directory (optional, we use root here), "Yes" for import alias (@/*)
    ```

2.  **Install Dependencies**:

    ```bash
    npm install sanity next-sanity @sanity/image-url framer-motion lucide-react clsx tailwind-merge next-themes react-markdown date-fns
    npm install -D @tailwindcss/typography
    ```

3.  **Setup Shadcn UI**:

    ```bash
    npx shadcn-ui@latest init
    # Style: Default, Base Color: Slate, CSS: app/globals.css
    ```

4.  **Environment Variables**:
    Create a `.env.local` file in the root directory:
    ```env
    NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
    NEXT_PUBLIC_SANITY_DATASET=production
    NEXT_PUBLIC_SANITY_API_VERSION=2026-02-26
    ```

## 3. Sanity Studio

Run the app and open Studio:

```bash
npm run dev
```

Visit `http://localhost:3000/studio` and create/publish `Post` documents.

Required post fields:

- `title`
- `slug`
- `publishedAt`
- `body`

## 4. Deployment

1.  Push code to GitHub.
2.  Connect repository to Vercel.
3.  Add Environment Variables in Vercel.
4.  Deploy.

## 5. Directory Structure

```
/app
  layout.tsx
  page.tsx
  blog/
    [slug]/
      page.tsx
/components
  /atoms
  /molecules
  /organisms
  /templates
/lib
  sanity.ts
  sanity.queries.ts
  utils.ts
```
