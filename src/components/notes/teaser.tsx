"use client";

import React from "react";
import { motion } from "framer-motion";
import { BookOpen, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "@/lib/utils/i18n/navigation";
import { useTranslations } from "next-intl";

export default function NotesTeaser() {
  const t = useTranslations("Notes");
  return (
    <section id="notes" className="py-24 sm:py-32 px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <Card className="relative overflow-hidden rounded-3xl border-border bg-card py-0 shadow-sm">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 -end-24 size-72 rounded-full bg-accent/10 blur-3xl"
            />
            <CardContent className="relative p-8 sm:p-12">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 p-3 rounded-xl bg-accent/10">
                    <BookOpen className="w-6 h-6 text-accent" aria-hidden="true" />
                  </div>
                  <div>
                    <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-2">
                      {t("teaserTitle")}
                    </h2>
                    <p className="text-muted-foreground max-w-2xl">
                      {t("teaserBody")}
                    </p>
                  </div>
                </div>
                <Button asChild size="lg" className="h-12 shrink-0 group rounded-full px-6">
                  <Link href="/notes">
                    {t("browse")}
                    <ArrowRight
                      className="transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
