"use client";

import React from "react";
import { Link } from "@/lib/utils/i18n/navigation";
import { ChevronRight, Home } from "lucide-react";
import type { NotesNode } from "@/lib/utils/notes-tree";

interface NotesBreadcrumbsProps {
  items: NotesNode[];
}

export function NotesBreadcrumbs({ items }: NotesBreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
        <li>
          <Link
            href="/notes"
            className="flex items-center hover:text-foreground transition-colors"
          >
            <Home className="w-4 h-4" />
          </Link>
        </li>
        {items.slice(1).map((item, index) => {
          const isLast = index === items.length - 2;
          const slugParts = items.slice(1, index + 2).map((i) => i.slug);
          const href = `/notes${slugParts.length > 0 ? `/${slugParts.join("/")}` : ""}`;

          return (
            <React.Fragment key={item.slug || index}>
              <ChevronRight className="w-3.5 h-3.5" />
              <li>
                {isLast || !item.outputPath ? (
                  <span className={isLast ? "text-foreground font-medium" : ""}>{item.title}</span>
                ) : (
                  <Link href={href} className="hover:text-foreground transition-colors">
                    {item.title}
                  </Link>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
