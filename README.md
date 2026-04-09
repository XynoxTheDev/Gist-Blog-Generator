# Gist Blog Generator

[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)

> A web application that turns your blog content into professionally formatted Markdown — ready to publish on GitHub Gists or any Markdown-supported platform.

<!-- Add a screenshot or GIF here -->
<!-- ![App Screenshot](public/screenshot.png) -->

---

## Overview

Gist Blog Generator provides a structured form-based interface for composing blog posts. Fill in your title, introduction, body sections, conclusion, and author details — then generate clean, publication-ready Markdown in one click. The output includes a table of contents, author bio, social links, and a call-to-action footer, all formatted consistently.

It's designed for developers and writers who publish technical content on GitHub Gists and want to skip the manual Markdown formatting.

---

## Features

- **Structured input form** — Dedicated fields for title, author, cover image URL, introduction, body sections, conclusion, and author bio
- **Dynamic sections** — Add as many content sections as needed; each gets its own title and body
- **Auto-generated table of contents** — Built automatically from your section titles, with anchor links
- **Real-time Markdown preview** — Switch between the Input and Preview tabs to see your output as you write
- **One-click copy** — Copy the generated Markdown to clipboard directly from the preview
- **Social links in output** — Twitter, LinkedIn, and GitHub links are woven into the author footer
- **Responsive design** — Works across desktop and mobile viewports

---

## Tech Stack

| Technology | Purpose |
|---|---|
| [Next.js 15](https://nextjs.org/) | React framework, static export |
| [React 18](https://reactjs.org/) | UI component model |
| [TypeScript 5](https://www.typescriptlang.org/) | Type safety |
| [Tailwind CSS 3](https://tailwindcss.com/) | Utility-first styling |
| [shadcn/ui](https://ui.shadcn.com/) | Pre-built accessible components |
| [Radix UI](https://www.radix-ui.com/) | Headless UI primitives (Tabs, Toast, Label) |
| [Lucide React](https://lucide.dev/) | Icon library |
| [pnpm](https://pnpm.io/) | Package manager |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18.0.0 or later
- [pnpm](https://pnpm.io/) v8.0.0 or later (`npm install -g pnpm`)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/XynoxTheDev/Gist-Blog-Generator.git
   cd Gist-Blog-Generator
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Start the development server:
   ```bash
   pnpm dev
   ```

4. Open your browser and visit `http://localhost:3000`

### Available Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production (static export) |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm deploy` | Build and deploy to GitHub Pages |

---

## Usage

1. **Fill in the blog details** — Enter your blog title, author name, and an optional cover image URL.
2. **Write your content** — Add an introduction, then fill in the body sections. Each section has a title and content field.
3. **Add more sections** — Click **Add Section** to insert additional content blocks as needed.
4. **Write your conclusion** — Fill in the conclusion field and your author bio.
5. **Add social links** — Enter your Twitter handle, LinkedIn URL, and GitHub username — these appear in the generated footer.
6. **Generate Markdown** — Click the **Generate Markdown** button in the footer.
7. **Preview the output** — Switch to the **Preview** tab to see the formatted Markdown.
8. **Copy and publish** — Click the copy button, then paste into a new [GitHub Gist](https://gist.github.com/) or any Markdown editor.

---

## Project Structure

```
src/
├── app/
│   ├── blog-markdown-generator.tsx  # Main generator component (form + preview + logic)
│   ├── globals.css                  # Global styles
│   ├── layout.tsx                   # Root layout
│   └── page.tsx                     # Entry page
├── components/
│   └── ui/                          # shadcn/ui components
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── tabs.tsx
│       ├── textarea.tsx
│       ├── toast.tsx
│       └── toaster.tsx
├── hooks/
│   └── use-toast.ts                 # Toast notification hook
└── lib/
    └── utils.ts                     # Utility functions (cn helper)
```

---

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m 'Add your feature'
   ```
4. Push to your branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a Pull Request

Please ensure your code passes linting (`pnpm lint`) before submitting.

---

## License

This project is licensed under the Apache License 2.0. See the [LICENSE](LICENSE) file for details.

---

## Contact

**Arindam Hazra** (XynoxTheDev)

- GitHub: [@XynoxTheDev](https://github.com/XynoxTheDev/)
- Email: [connect@xynoxthedev.xyz](mailto:connect@xynoxthedev.xyz)
