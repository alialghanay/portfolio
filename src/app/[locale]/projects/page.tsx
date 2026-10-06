import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/lib/utils/i18n/routing";
import { Link } from "@/lib/utils/i18n/navigation";
import { getContent } from "@/lib/content";
import ProjectGrid from "@/components/projects/project-grid";
import SectionHeading from "@/components/ui/section-heading";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return {
    title: t("projectsTitle"),
    description: t("projectsDescription"),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Projects");
  const { projects } = getContent(locale);
  const featured = projects.filter((p) => p.featured);
  const more = projects.filter((p) => !p.featured);

  return (
    <main id="main" className="min-h-screen bg-background px-6 pt-12 pb-24 sm:pt-16 sm:pb-32">
      <div className="max-w-6xl mx-auto">
        <Link
          href="/"
          className="mb-10 inline-flex items-center gap-2 rounded-md text-sm text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ArrowLeft className="size-4 rtl:rotate-180" aria-hidden="true" />
          {t("backHome")}
        </Link>

        <SectionHeading
          as="h1"
          eyebrow={t("pageEyebrow")}
          title={t("pageTitle")}
          description={t("pageDescription")}
        />

        <section aria-labelledby="featured-heading">
          <h2 id="featured-heading" className="mb-6 font-heading text-xl font-semibold text-foreground">
            {t("commercial")}
            <span className="ms-2 text-base font-normal text-muted-foreground">({featured.length})</span>
          </h2>
          <ProjectGrid projects={featured} />
        </section>

        {more.length > 0 && (
          <section aria-labelledby="more-heading" className="mt-20">
            <h2 id="more-heading" className="mb-6 font-heading text-xl font-semibold text-foreground">
              {t("learning")}
              <span className="ms-2 text-base font-normal text-muted-foreground">({more.length})</span>
            </h2>
            <ProjectGrid projects={more} />
          </section>
        )}
      </div>
    </main>
  );
}
