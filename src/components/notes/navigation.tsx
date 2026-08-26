"use client";

import React from "react";
import { Link } from "@/lib/utils/i18n/navigation";
import { cn } from "@/lib/utils/cn";
import type { NotesNode } from "@/lib/utils/notes-tree";
import { ChevronRight, BookOpen } from "lucide-react";

function buildHref(slugParts: string[]): string {
  const slug = slugParts.join("/");
  return `/notes${slug ? `/${slug}` : ""}`;
}

interface NavigationNodeProps {
  node: NotesNode;
  activeSlug: string[];
  depth: number;
  path: string[];
}

function NavigationNode({ node, activeSlug, depth, path }: NavigationNodeProps) {
  const currentPath = [...path, node.slug];
  const hasChildren = node.children.length > 0;
  const onActivePath = activeSlug[depth] === node.slug;
  const isActiveLeaf = onActivePath && depth === activeSlug.length - 1;
  const expanded = hasChildren && onActivePath;

  return (
    <li className="mt-0.5">
      <div className="flex items-center">
        {hasChildren && (
          <ChevronRight
            className={cn(
              "w-3.5 h-3.5 text-muted-foreground mr-1 transition-transform",
              expanded && "rotate-90"
            )}
          />
        )}
        {!hasChildren && <span className="w-3.5 h-3.5 mr-1" />}
        {node.outputPath ? (
          <Link
            href={buildHref(currentPath)}
            className={cn(
              "flex-1 text-sm rounded-md px-2 py-1 transition-colors",
              isActiveLeaf
                ? "bg-accent/10 text-accent font-medium"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
          >
            {node.title}
          </Link>
        ) : (
          <span
            className={cn(
              "flex-1 text-sm rounded-md px-2 py-1 font-medium",
              onActivePath ? "text-foreground" : "text-muted-foreground"
            )}
          >
            {node.title}
          </span>
        )}
      </div>
      {hasChildren && expanded && (
        <ul className="pl-4 border-l border-border ml-3 mt-1 space-y-0.5">
          {node.children.map((child) => (
            <NavigationNode
              key={child.slug}
              node={child}
              activeSlug={activeSlug}
              depth={depth + 1}
              path={currentPath}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

interface NotesNavigationProps {
  tree: NotesNode;
  activeSlug?: string[];
}

export function NotesNavigation({ tree, activeSlug = [] }: NotesNavigationProps) {
  return (
    <nav className="w-full lg:w-72 shrink-0 lg:sticky lg:top-24 lg:max-h-[calc(100dvh-8rem)] overflow-y-auto pr-2">
      <div className="mb-4">
        <Link
          href="/notes"
          className="flex items-center gap-2 font-heading font-semibold text-foreground hover:text-accent transition-colors"
        >
          <BookOpen className="w-5 h-5" />
          {tree.title}
        </Link>
      </div>
      <ul className="space-y-0.5">
        {tree.children.map((child) => (
          <NavigationNode
            key={child.slug}
            node={child}
            activeSlug={activeSlug}
            depth={0}
            path={[]}
          />
        ))}
      </ul>
    </nav>
  );
}
