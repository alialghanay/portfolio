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
