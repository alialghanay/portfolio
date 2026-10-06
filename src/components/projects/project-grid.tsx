"use client";

import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Github } from "lucide-react";
import { useTranslations } from "next-intl";
import type { Project } from "@/lib/content";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function ProjectCard({ project }: { project: Project }) {
  const t = useTranslations("Projects");
  const hasLive = Boolean(project.liveUrl) && project.liveUrl !== "#";

  return (
    <article className="group relative flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/5">
      <span
        aria-hidden="true"
        className="mb-5 grid size-12 place-items-center rounded-xl border border-border bg-gradient-to-br from-accent/15 to-accent/0 font-heading text-sm font-bold text-accent"
      >
        {project.initials}
      </span>

      <p className="mb-1.5 text-xs font-medium uppercase tracking-wider text-accent rtl:text-sm">
        {project.role}
      </p>
      <h3 className="font-heading text-xl font-semibold text-card-foreground">
        {project.title}
      </h3>
      <p className="mt-2 line-clamp-4 text-sm leading-relaxed text-muted-foreground">
        {project.description}
      </p>

      <ul className="mt-5 mb-6 flex flex-wrap gap-1.5" aria-label={t("technologies")}>
        {project.tags.map((tag) => (
          <li key={tag}>
            <Badge variant="secondary" className="font-normal text-xs">
              {tag}
            </Badge>
          </li>
        ))}
      </ul>

      <div className="mt-auto flex items-center gap-2 border-t border-border pt-5">
        {hasLive && (
          <Button asChild size="sm" className="h-10 flex-1 rounded-full">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("visitAria", { title: project.title })}
            >
              {t("visitSite")}
              <ArrowUpRight
                aria-hidden="true"
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100"
              />
            </a>
          </Button>
        )}
        {project.repoUrl && (
          <Button asChild size="sm" variant="outline" className="h-10 flex-1 rounded-full">
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("codeAria", { title: project.title })}
            >
              <Github aria-hidden="true" />
              {t("code")}
            </a>
          </Button>
        )}
      </div>
    </article>
  );
}

export default function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <motion.ul
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
    >
      {projects.map((project) => (
        <motion.li key={project.id} variants={itemVariants}>
          <ProjectCard project={project} />
        </motion.li>
      ))}
    </motion.ul>
  );
}
