"use client";

import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";

// Skill names are technical terms and stay in English in every locale.
const skillGroups = [
  { key: "languages", skills: ["Java", "Dart", "Python", "JavaScript", "C/C++", "SQL"] },
  { key: "frameworks", skills: ["Flutter", "Next.js", "React.js", "Django", "Laravel"] },
  { key: "architecture", skills: ["Clean Architecture", "OOP", "RESTful APIs", "Database Design"] },
  { key: "tooling", skills: ["Git", "GitHub", "Linux/Unix"] },
] as const;

const stats = [
  { value: "5+", key: "years" },
  { value: "5+", key: "commercial" },
  { value: "Flutter", key: "focus" },
] as const;

const education = ["masters", "bachelors"] as const;

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const About = () => {
  const t = useTranslations("About");
  return (
    <section id="about" className="py-24 sm:py-32 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-20 items-start">
          <motion.div {...reveal()}>
            <p className="mb-3 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-accent">
              <span aria-hidden="true" className="h-px w-6 bg-accent/60" />
              {t("eyebrow")}
            </p>
            <h2 className="mb-6 font-heading text-3xl font-bold text-balance text-foreground sm:text-4xl lg:text-5xl">
              {t("title")}
            </h2>
            <p className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/40 px-3 py-1 text-sm text-muted-foreground">
              <MapPin className="size-4 text-accent" aria-hidden="true" />
              {t("location")}
            </p>
            <div className="space-y-4 text-lg leading-relaxed text-pretty text-muted-foreground">
              <p>{t("bio1")}</p>
              <p>{t("bio2")}</p>
            </div>

            <dl className="mt-10 grid grid-cols-3 gap-3 sm:gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.key}
                  className="flex flex-col-reverse rounded-2xl border border-border bg-muted/30 p-4"
                >
                  <dt className="mt-1 text-xs text-muted-foreground sm:text-sm">{t(`stats.${stat.key}`)}</dt>
                  <dd className="font-heading text-xl font-bold text-foreground sm:text-2xl">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </motion.div>

          <div className="space-y-10">
            <motion.div {...reveal(0.1)}>
              <h3 className="mb-5 font-heading text-xl font-semibold text-foreground">{t("techStack")}</h3>
              <div className="space-y-5">
                {skillGroups.map((group) => (
                  <div key={group.key}>
                    <h4 className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {t(`groups.${group.key}`)}
                    </h4>
                    <ul className="flex flex-wrap gap-2">
                      {group.skills.map((skill) => (
                        <li
                          key={skill}
                          className="rounded-lg border border-border bg-card px-3 py-1.5 text-sm text-foreground shadow-xs transition-colors hover:border-accent/50"
                        >
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div {...reveal(0.2)}>
              <h3 className="mb-5 flex items-center gap-2 font-heading text-xl font-semibold text-foreground">
                <GraduationCap className="size-5 text-accent" aria-hidden="true" />
                {t("education")}
              </h3>
              <ol className="relative space-y-3 border-s border-border ps-6">
                {education.map((item) => (
                  <li key={item} className="relative">
                    <span
                      aria-hidden="true"
                      className="absolute -start-[1.84rem] top-1.5 size-2.5 rounded-full border-2 border-accent bg-background"
                    />
                    <p className="font-medium text-foreground">{t(`${item}.degree`)}</p>
                    <p className="text-sm text-muted-foreground">{t(`${item}.school`)}</p>
                    {item === "masters" && (
                      <p className="mt-1 text-xs text-muted-foreground">{t("masters.note")}</p>
                    )}
                  </li>
                ))}
              </ol>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
