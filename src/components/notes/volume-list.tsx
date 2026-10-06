import { useTranslations } from "next-intl";
import { Link } from "@/lib/utils/i18n/navigation";
import { BookOpen } from "lucide-react";
import type { NotesNode } from "@/lib/utils/notes-tree";
import { Card, CardContent } from "@/components/ui/card";

interface VolumeListProps {
  tree: NotesNode;
}

export function VolumeList({ tree }: VolumeListProps) {
  const t = useTranslations("Notes");
  if (tree.children.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground">{t("empty")}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {tree.children.map((volume) => (
        <Link
          key={volume.slug}
          href={`/notes/${volume.slug}`}
          className="group outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-2xl"
        >
          <Card className="h-full rounded-2xl border-border bg-card shadow-sm transition-[transform,border-color,box-shadow] duration-300 group-hover:-translate-y-1 group-hover:border-accent/40 group-hover:shadow-lg">
            <CardContent className="p-6 flex flex-col items-start gap-4">
              <div className="p-3 rounded-xl bg-accent/10">
                <BookOpen
                  className="w-6 h-6 text-accent"
                  aria-hidden="true"
                />
              </div>
              <div>
                <h2 className="font-heading text-xl font-semibold text-foreground group-hover:text-accent transition-colors">
                  {volume.title}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {t("sections", { count: volume.children.length })}
                </p>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
