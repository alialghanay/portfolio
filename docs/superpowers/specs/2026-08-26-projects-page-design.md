# Projects Page Design

## Goal

Move the full project list off the homepage so the landing page stays compact. The homepage will show only a curated set of featured projects with a link to a dedicated Projects page that lists every project.

## Approach

Use **Approach A**: static server-rendered Projects page + featured subset on the homepage.

- Add a `featured: boolean` field to `src/lib/constants/projects.json`.
- Homepage `Projects` section renders only projects where `featured === true`.
- A new page at `src/app/[locale]/projects/page.tsx` renders the full project grid.
- A "Show more projects" button on the homepage links to `/{locale}/projects`.

## Data Model

`src/lib/constants/projects.json` entries gain an optional `featured` flag:

```json
{
  "id": 1,
  "title": "Octobits.ly",
  "featured": true,
  ...
}
```

If `featured` is missing, the project is treated as not featured. This keeps the change backward-compatible.

## Routing

- New route: `/{locale}/projects`
- Implementation: `src/app/[locale]/projects/page.tsx`
- Metadata: title "Projects | Ali Mohammed Al-Ghanay".

## Components

### Existing

- `src/components/projects/ui.tsx` — currently renders the full grid on the homepage.

### New / Modified

- `src/components/projects/featured-list.tsx` — renders the featured-only grid and a "Show more" button for the homepage.
- `src/components/projects/project-grid.tsx` — shared grid component used by both the homepage featured list and the full Projects page.
- `src/app/[locale]/projects/page.tsx` — full Projects page, server component, imports `ProjectGrid`.

## Homepage Changes

`src/app/[locale]/page.tsx`:

- Replace `<Projects />` with `<FeaturedProjects />`.
- The featured section keeps the existing section heading and intro copy.

`src/components/ui/navbar.tsx`:

- The "Projects" nav link currently points to `#projects` (homepage anchor).
- It should resolve to the full Projects page when the user is not on the homepage, and to `#projects` when on the homepage. The existing `hrefFor` helper already handles this pattern.

`src/components/ui/footer.tsx`:

- Same `hrefFor` logic applies to the footer Projects link.

## Full Projects Page

- Uses the same `max-w-6xl` container and card styling as the current homepage grid.
- Renders all projects from `projects.json`.
- Filters are intentionally out of scope for this first iteration; the page is a clean scrollable archive.

## UI/UX Notes

- Keep the existing card design, motion variants, and tag badges so the transition between homepage and full page is consistent.
- The "Show more" button should be a primary CTA at the bottom of the featured grid.
- Empty state: if no projects are marked featured, the homepage section should still show the heading and a prompt to view all projects.

## Verification

- `pnpm lint` passes.
- `pnpm build` generates the new `/[locale]/projects` route.
- Navigating from the homepage "Show more" button reaches `/{locale}/projects`.
- The Projects nav/footer link works correctly from both homepage and deep pages.
