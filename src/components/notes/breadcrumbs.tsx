"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/lib/utils/i18n/navigation";
import { ChevronRight, Home } from "lucide-react";
import type { NotesNode } from "@/lib/utils/notes-tree";

interface NotesBreadcrumbsProps {
  items: NotesNode[];
}

export function NotesBreadcrumbs({ items }: NotesBreadcrumbsProps) {
  const t = useTranslations("Notes");
  return (
    <nav aria-label={t("breadcrumb")} className="mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
        <li>
          <Link
            href="/notes"
            aria-label={t("home")}
            className="flex items-center rounded-sm hover:text-foreground transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Home className="size-4" aria-hidden="true" />
          </Link>
        </li>
        {items.slice(1).map((item, index) => {
          const isLast = index === items.length - 2;
          const slugParts = items.slice(1, index + 2).map((i) => i.slug);
          const href = `/notes${slugParts.length > 0 ? `/${slugParts.join("/")}` : ""}`;

          return (
            <li key={item.slug || index} className="flex items-center gap-1.5">
              <ChevronRight className="size-3.5 rtl:rotate-180" aria-hidden="true" />
                {isLast || !item.outputPath ? (
                  <span
                    className={isLast ? "text-foreground font-medium" : ""}
                    aria-current={isLast ? "page" : undefined}
                  >
                    {item.title}
                  </span>
                ) : (
                  <Link href={href} className="hover:text-foreground transition-colors">
                    {item.title}
                  </Link>
                )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
