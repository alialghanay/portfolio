import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { routing } from "@/lib/utils/i18n/routing";
import { loadManifest, buildNotesTree, findNodeBySlug, getBreadcrumbs } from "@/lib/utils/notes-tree";
import { NotesNavigation } from "@/components/notes/navigation";
import { NotesBreadcrumbs } from "@/components/notes/breadcrumbs";
import { VolumeList } from "@/components/notes/volume-list";
import "katex/dist/katex.min.css";

/**
 * Notes pages render the static HTML fragments produced by the Octospace
 * pipeline (`pnpm notes:build` → `notes/`). Fragments carry site-absolute
 * links (`/mssd/...`) which are rewritten to the locale-prefixed `/notes`
 * route at load time; images already point at `/notes-assets/` (served from
 * `public/notes-assets/`).
 *
 * `/notes` itself has no generated fragment; it renders a React index that
 * lists the top-level volumes (e.g. MSSD). Each volume has its own generated
 * fragment and nested pages.
 */

const NOTES_DIR = path.join(process.cwd(), "notes");

function collectSlugs(dir: string, base = dir): string[][] {
  if (!existsSync(dir)) return [];
  const slugs: string[][] = [];
  for (const entry of readdirSync(dir)) {
    const fullPath = path.join(dir, entry);
    if (statSync(fullPath).isDirectory()) {
      slugs.push(...collectSlugs(fullPath, base));
    } else if (entry.endsWith(".html")) {
      const rel = path.relative(base, fullPath).split(path.sep).join("/");
      slugs.push(rel.replace(/\.html$/, "").split("/"));
    }
  }
  return slugs;
}

function loadFragment(slug: string[] | undefined, locale: string): string | undefined {
  const rel = !slug || slug.length === 0 ? undefined : slug.join("/");
  if (!rel) return undefined;

  const filePath = path.join(NOTES_DIR, `${rel}.html`);
  if (!filePath.startsWith(NOTES_DIR) || !existsSync(filePath)) return undefined;

  const html = readFileSync(filePath, "utf8");
  return html.replace(/href="\/(?!\/)/g, `href="/${locale}/notes/`);
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => [
    { locale, slug: undefined },
    ...collectSlugs(NOTES_DIR).map((slug) => ({ locale, slug })),
  ]);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug?: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const manifest = loadManifest();
  const tree = manifest ? buildNotesTree(manifest) : null;
  const activeNode = tree ? findNodeBySlug(tree, slug ?? []) : null;
  const title = activeNode?.title ? `${activeNode.title} | Notes` : "Notes";

  return {
    title: `${title} | Ali Mohammed Al-Ghanay`,
    description: "Lecture notes and study material, published with Octospace.",
  };
}

export default async function NotesPage({
  params,
}: {
  params: Promise<{ locale: string; slug?: string[] }>;
}) {
  const { locale, slug } = await params;
  const isIndex = !slug || slug.length === 0;
  const html = loadFragment(slug, locale);

  const manifest = loadManifest();
  const tree = manifest ? buildNotesTree(manifest) : null;
  const activeNode = tree ? findNodeBySlug(tree, slug ?? []) : null;
  const breadcrumbs = tree ? getBreadcrumbs(tree, slug ?? []) : [];
  const title = activeNode?.title ?? "Notes";

  if (!isIndex && html === undefined) notFound();

  return (
    <main className="mx-auto w-full max-w-7xl px-6 pt-24 pb-16">
      <div className="flex flex-col lg:flex-row gap-10">
        {tree && <NotesNavigation tree={tree} activeSlug={slug ?? []} />}

        <article className="flex-1 min-w-0">
          <NotesBreadcrumbs items={breadcrumbs} />
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-8">
            {title}
          </h1>
          {isIndex ? (
            tree ? (
              <VolumeList tree={tree} />
            ) : (
              <p className="text-muted-foreground">No note collections available yet.</p>
            )
          ) : (
            <div
              className="notes-content"
              // Fragments are generated from trusted local Markdown by Octospace,
              // which escapes raw HTML in the source.
              dangerouslySetInnerHTML={{ __html: html || "" }}
            />
          )}
        </article>
      </div>
    </main>
  );
}
