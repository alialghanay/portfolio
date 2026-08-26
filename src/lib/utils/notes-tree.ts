import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

export interface MigrationEntry {
  sourcePath: string;
  outputPath: string;
  title: string;
  slug: string;
}

export interface MigrationManifest {
  generatedFiles: MigrationEntry[];
}

export interface NotesNode {
  slug: string;
  title: string;
  outputPath: string;
  children: NotesNode[];
}

const MANIFEST_PATH = path.join(process.cwd(), "content", "migration-manifest.json");

export function loadManifest(): MigrationManifest | null {
  if (!existsSync(MANIFEST_PATH)) return null;
  return JSON.parse(readFileSync(MANIFEST_PATH, "utf8")) as MigrationManifest;
}

function humanizeSegment(segment: string): string {
  return segment
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .replace(/\bIi\b/g, "II")
    .replace(/\bIii\b/g, "III")
    .replace(/\bIv\b/g, "IV");
}

function titleFromSegments(segments: string[]): string {
  const last = segments[segments.length - 1];
  if (!last) return "Notes";
  return humanizeSegment(last);
}

export function buildNotesTree(manifest: MigrationManifest): NotesNode {
  const root: NotesNode = {
    slug: "",
    title: "Notes",
    outputPath: "",
    children: [],
  };

  for (const entry of manifest.generatedFiles) {
    const parts = entry.outputPath.replace(/\.md$/, "").split("/");
    let current = root;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      if (!part) continue;

      const isLeaf = i === parts.length - 1;
      const existing = current.children.find((child) => child.slug === part);

      if (existing) {
        // A page can be both an index and a parent (e.g. /mssd has children
        // and also has its own mssd.md fragment). Enrich the existing node
        // when we later encounter its leaf entry.
        if (isLeaf && !existing.outputPath) {
          existing.title = entry.title;
          existing.outputPath = entry.outputPath;
        }
        current = existing;
      } else {
        const node: NotesNode = {
          slug: part,
          title: isLeaf ? entry.title : titleFromSegments(parts.slice(0, i + 1)),
          outputPath: isLeaf ? entry.outputPath : "",
          children: [],
        };
        current.children.push(node);
        current.children.sort((a, b) => a.title.localeCompare(b.title));
        current = node;
      }
    }
  }

  return root;
}

export function findNodeBySlug(tree: NotesNode, slug: string[]): NotesNode | null {
  let current: NotesNode | undefined = tree;
  for (const part of slug) {
    current = current.children.find((child) => child.slug === part);
    if (!current) return null;
  }
  return current ?? null;
}

export function getBreadcrumbs(tree: NotesNode, slug: string[]): NotesNode[] {
  const breadcrumbs: NotesNode[] = [tree];
  let current: NotesNode | undefined = tree;
  for (const part of slug) {
    current = current.children.find((child) => child.slug === part);
    if (!current) break;
    breadcrumbs.push(current);
  }
  return breadcrumbs;
}
