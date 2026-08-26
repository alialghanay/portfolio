"use client";

import React from "react";
import { motion } from "framer-motion";
import { BookOpen, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "@/lib/utils/i18n/navigation";

export default function NotesTeaser() {
  return (
    <section id="notes" className="py-24 sm:py-32 px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-border bg-card overflow-hidden">
            <CardContent className="p-8 sm:p-12">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-accent/10">
                    <BookOpen className="w-6 h-6 text-accent" aria-hidden="true" />
                  </div>
                  <div>
                    <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-2">
                      Lecture Notes & Knowledge Base
                    </h2>
                    <p className="text-muted-foreground max-w-2xl">
                      Study guides, reference materials, and deep dives from my
                      Master&apos;s coursework and side research — organized for quick
                      lookup and long-form reading.
                    </p>
                  </div>
                </div>
                <Button asChild size="lg" className="shrink-0 group">
                  <Link href="/notes">
                    Browse notes
                    <ArrowRight
                      className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1"
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
