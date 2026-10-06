"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/ui/section-heading";
import ProjectGrid from "./project-grid";
import { useLocale, useTranslations } from "next-intl";
import { getContent } from "@/lib/content";
import { Link } from "@/lib/utils/i18n/navigation";

export default function FeaturedProjects() {
  const t = useTranslations("Projects");
  const { projects } = getContent(useLocale());
  const featured = projects.filter((p) => p.featured);

  return (
    <section id="projects" className="py-24 sm:py-32 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />

        <ProjectGrid projects={featured} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 text-center"
        >
          <Button asChild size="lg" variant="outline" className="group h-12 rounded-full px-6">
            <Link href="/projects">
              {t("seeAll", { count: projects.length })}
              <ArrowRight
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
              />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
