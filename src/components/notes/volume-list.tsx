import { Link } from "@/lib/utils/i18n/navigation";
import { BookOpen } from "lucide-react";
import type { NotesNode } from "@/lib/utils/notes-tree";
import { Card, CardContent } from "@/components/ui/card";

interface VolumeListProps {
  tree: NotesNode;
}

export function VolumeList({ tree }: VolumeListProps) {
  if (tree.children.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground">No note collections available yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {tree.children.map((volume) => (
        <Link
          key={volume.slug}
          href={`/notes/${volume.slug}`}
          className="group outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl"
        >
          <Card className="h-full border-border bg-card hover:border-accent/30 transition-colors">
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
                  {volume.children.length} section
                  {volume.children.length === 1 ? "" : "s"}
                </p>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
