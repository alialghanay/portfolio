"use client";

import React from "react";
import { motion } from "framer-motion";
import { Building2, MapPin, Calendar } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { getContent } from "@/lib/content";
import { Badge } from "@/components/ui/badge";
import SectionHeading from "@/components/ui/section-heading";
import { cn } from "@/lib/utils/cn";

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Experience() {
  const t = useTranslations("Experience");
  const { experience } = getContent(useLocale());
  return (
    <section id="experience" className="py-24 sm:py-32 px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />

        <div className="relative mx-auto max-w-3xl">
          {/* Timeline rail — logical `start` so it follows the reading direction. */}
          <div
            aria-hidden="true"
            className="absolute start-4 top-2 bottom-2 w-px bg-gradient-to-b from-accent/60 via-border to-transparent"
          />

          <ol className="space-y-8">
            {experience.map((item, index) => (
              <motion.li
                key={item.id}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                className="relative ps-12 sm:ps-14"
              >
                {/* Timeline dot, centred on the rail via a negative inline-start margin. */}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute start-4 top-7 -ms-[7px] size-3.5 rounded-full border-2 border-accent ring-4 ring-background",
                    index === 0 ? "bg-accent" : "bg-background"
                  )}
                />

                <article className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-[border-color,box-shadow] duration-300 hover:border-accent/40 hover:shadow-lg">
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <Badge variant="outline" className="font-normal text-xs text-accent border-accent/30 bg-accent/5">
                      {item.category}
                    </Badge>
                    {item.period && (
                      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="size-3" aria-hidden="true" />
                        {item.period}
                      </span>
                    )}
                  </div>

                  <h3 className="mb-2 font-heading text-lg font-semibold text-foreground">
                    {item.role}
                  </h3>
                  <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <Building2 className="size-3.5 shrink-0" aria-hidden="true" />
                      {item.company}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
                      {item.location}
                    </span>
                  </div>

                  <ul className="space-y-2">
                    {item.bullets.map((bullet, bulletIndex) => (
                      <li
                        key={bulletIndex}
                        className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground"
                      >
                        <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
