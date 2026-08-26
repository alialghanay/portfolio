# Projects Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Move the full project list to a dedicated `/projects` page and show only featured projects on the homepage with a "Show more" link.

**Architecture:** A shared `ProjectGrid` component renders project cards. The homepage uses a `FeaturedProjects` wrapper that filters `featured: true` and adds a CTA. A new `app/[locale]/projects/page.tsx` renders the full grid. The nav/footer Projects link points to the full page.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript strict, Tailwind CSS 4, shadcn/ui, framer-motion, next-intl.

## Global Constraints

- Use TypeScript strict mode; no `any`.
- All new components are function components in `.tsx` files.
- Use Tailwind utility classes and `cn()` from `@/lib/utils/cn` for conditional classes.
- Client components must include `"use client"` at the top.
- Use `next-intl` locale-aware `Link` from `@/lib/utils/i18n/navigation` for internal links.
- Run `pnpm lint && pnpm build` and verify zero errors before finishing.

---

### Task 1: Add `featured` flag to projects.json

**Files:**
- Modify: `src/lib/constants/projects.json`

**Interfaces:**
- Produces: project entries with optional `featured: boolean`.

- [ ] **Step 1: Mark featured projects**

Add `"featured": true` to the first four commercial projects (Octobits.ly, Mutah.ly, Addidi.ly, Alekhwa Printing Services & Media). Add `"featured": false` to the remaining entries so the field is explicit.

```json
[
  {
    "id": 1,
    "title": "Octobits.ly",
    "featured": true,
    ...
  },
  {
    "id": 2,
    "title": "Mutah.ly",
    "featured": true,
    ...
  },
  {
    "id": 3,
    "title": "Addidi.ly",
    "featured": true,
    ...
  },
  {
    "id": 4,
    "title": "Alekhwa Printing Services & Media",
    "featured": true,
    ...
  },
  {
    "id": 5,
    "title": "AlNarjis Carpets System",
    "featured": false,
    ...
  },
  ...
]
```

- [ ] **Step 2: Verify JSON is valid**

Run: `node -e "JSON.parse(require('fs').readFileSync('src/lib/constants/projects.json','utf8'))"`
Expected: no output / no error.

- [ ] **Step 3: Commit**

```bash
git add src/lib/constants/projects.json
git commit -m "feat: add featured flag to projects data"
```

---

### Task 2: Create shared ProjectGrid component

**Files:**
- Create: `src/components/projects/project-grid.tsx`

**Interfaces:**
- Consumes: `Project` items from `projects.json`.
- Produces: `ProjectGrid({ projects }: { projects: Project[] })` component.

- [ ] **Step 1: Extract the grid from the existing Projects component**

Create `src/components/projects/project-grid.tsx` with the card grid logic currently inside `src/components/projects/ui.tsx`. Use the same imports, variants, and card layout.

```tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

export interface Project {
  id: number;
  title: string;
  role: string;
  description: string;
  tags: string[];
  image: string | null;
  liveUrl: string;
  repoUrl: string | null;
  featured?: boolean;
}

export default function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {projects.map((project) => (
        <motion.div key={project.id} variants={itemVariants}>
          <Card className="group h-full flex flex-col overflow-hidden border-border bg-card hover:border-accent/50 transition-colors duration-300">
            <CardHeader className="pb-3">
              <p className="text-xs font-medium text-accent uppercase tracking-wider mb-1">
                {project.role}
              </p>
              <CardTitle className="font-heading text-xl text-card-foreground">
                {project.title}
              </CardTitle>
              <CardDescription className="text-muted-foreground line-clamp-3">
                {project.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="font-normal text-xs"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="mt-auto flex items-center gap-3">
                {project.liveUrl && project.liveUrl !== "#" && (
                  <Button
                    asChild
                    size="sm"
                    variant="default"
                    className={cn(
                      "rounded-full",
                      !project.repoUrl && "flex-1"
                    )}
                  >
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit ${project.title} live site`}
                    >
                      <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                      Visit
                    </a>
                  </Button>
                )}
                {project.repoUrl && (
                  <Button
                    asChild
                    size="sm"
                    variant="outline"
                    className={cn(
                      "rounded-full",
                      !project.liveUrl && "flex-1"
                    )}
                  >
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View source code of ${project.title}`}
                    >
                      <Github className="mr-1.5 h-3.5 w-3.5" />
                      Code
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
```

- [ ] **Step 2: Verify TypeScript**

Run: `pnpm tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/projects/project-grid.tsx
git commit -m "feat: add reusable ProjectGrid component"
```

---

### Task 3: Refactor homepage Projects section to show featured projects

**Files:**
- Modify: `src/components/projects/ui.tsx`
- Create: `src/components/projects/featured-list.tsx`

**Interfaces:**
- Consumes: `ProjectGrid` and `projects.json`.
- Produces: `FeaturedProjects` homepage section.

- [ ] **Step 1: Replace ui.tsx content with FeaturedProjects**

`src/components/projects/ui.tsx` becomes a thin wrapper around the new `FeaturedProjects` component so existing imports keep working.

```tsx
import FeaturedProjects from "./featured-list";

export default FeaturedProjects;
```

- [ ] **Step 2: Create featured-list.tsx**

Create `src/components/projects/featured-list.tsx` that filters `featured` projects and renders the existing section header plus a "Show more projects" button.

```tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProjectGrid from "./project-grid";
import projects from "@/lib/constants/projects.json";
import { Link } from "@/lib/utils/i18n/navigation";

export default function FeaturedProjects() {
  const featured = projects.filter((p) => p.featured);

  return (
    <section id="projects" className="py-24 sm:py-32 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium text-accent uppercase tracking-widest mb-3">
            Selected Work
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Commercial platforms and freelance projects I have founded, led, or contributed to across mobile and web.
          </p>
        </motion.div>

        <ProjectGrid projects={featured} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 text-center"
        >
          <Button asChild size="lg" className="group">
            <Link href="/projects">
              Show more projects
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Verify build still passes**

Run: `pnpm lint && pnpm build`
Expected: no errors, 165 pages.

- [ ] **Step 4: Commit**

```bash
git add src/components/projects/ui.tsx src/components/projects/featured-list.tsx
git commit -m "feat: show featured projects on homepage with link to full page"
```

---

### Task 4: Create the full Projects page

**Files:**
- Create: `src/app/[locale]/projects/page.tsx`

**Interfaces:**
- Consumes: `ProjectGrid`, `projects.json`.
- Produces: server-rendered page at `/{locale}/projects`.

- [ ] **Step 1: Create the page**

```tsx
import type { Metadata } from "next";
import { routing } from "@/lib/utils/i18n/routing";
import projects from "@/lib/constants/projects.json";
import ProjectGrid from "@/components/projects/project-grid";

export const metadata: Metadata = {
  title: "Projects | Ali Mohammed Al-Ghanay",
  description:
    "A collection of commercial platforms, freelance work, and learning projects across mobile and web.",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function ProjectsPage() {
  return (
    <main className="py-24 sm:py-32 px-6 bg-background min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-accent uppercase tracking-widest mb-3">
            Portfolio
          </p>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            All Projects
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Commercial platforms, freelance work, and freeCodeCamp projects.
          </p>
        </div>

        <ProjectGrid projects={projects} />
      </div>
    </main>
  );
}
```

- [ ] **Step 2: Verify route is generated**

Run: `pnpm build`
Expected: output includes `/[locale]/projects` as a static route.

- [ ] **Step 3: Commit**

```bash
git add src/app/[locale]/projects/page.tsx
git commit -m "feat: add full projects page"
```

---

### Task 5: Update nav/footer Projects link to point to the full page

**Files:**
- Modify: `src/lib/constants/navs.json`

**Interfaces:**
- Produces: navs.json with Projects url as `/projects`.

- [ ] **Step 1: Change the Projects URL**

```json
  {
    "id": 2,
    "name": "Projects",
    "url": "/projects"
  },
```

- [ ] **Step 2: Verify links**

Run: `pnpm lint && pnpm build`
Expected: no errors.

- [ ] **Step 3: Manual check**

Open `/en` and click the "Projects" nav link or footer link; it should navigate to `/en/projects`.

- [ ] **Step 4: Commit**

```bash
git add src/lib/constants/navs.json
git commit -m "feat: point nav/footer projects link to full projects page"
```

---

## Self-Review

**Spec coverage:**
- Featured flag in JSON: Task 1.
- Shared grid component: Task 2.
- Homepage featured section with CTA: Task 3.
- Dedicated Projects page: Task 4.
- Nav/footer routing: Task 5.

**Placeholder scan:** No TBD/TODO; all code and commands are concrete.

**Type consistency:** `ProjectGrid` accepts `Project[]`; `featured-list.tsx` and `projects/page.tsx` both pass arrays from `projects.json`.

## Execution Handoff

**Plan complete and saved to `docs/superpowers/plans/2026-08-26-projects-page.md`. Two execution options:**

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration.

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints.

**Which approach?**
