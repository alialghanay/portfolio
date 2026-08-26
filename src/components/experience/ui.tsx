"use client";

import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Building2, MapPin, Calendar } from "lucide-react";
import experience from "@/lib/constants/experience.json";
import { Badge } from "@/components/ui/badge";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

export default function Experience() {
  return (
    <section id="experience" className="py-24 sm:py-32 px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium text-accent uppercase tracking-widest mb-3">
            Career Path
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Experience
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A blend of entrepreneurship, commercial product development, teaching, and professional web development.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative"
        >
          {/* Timeline line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-border sm:-translate-x-1/2" />

          <div className="space-y-10">
            {experience.map((item, index) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className={`relative flex flex-col sm:flex-row ${
                  index % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                } items-start sm:items-center gap-6 sm:gap-12`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 sm:left-1/2 w-3 h-3 rounded-full bg-accent ring-4 ring-background sm:-translate-x-1/2 z-10" />

                {/* Content card */}
                <div
                  className={`ml-12 sm:ml-0 sm:w-[calc(50%-2rem)] ${
                    index % 2 === 0 ? "sm:pr-0" : "sm:pl-0"
                  }`}
                >
                  <div className="p-6 rounded-2xl border border-border bg-card hover:border-accent/30 transition-colors">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <Badge variant="outline" className="font-normal text-xs">
                        {item.category}
                      </Badge>
                      {item.period && (
                        <span className="inline-flex items-center text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3 mr-1" />
                          {item.period}
                        </span>
                      )}
                    </div>

                    <h3 className="font-heading text-lg font-semibold text-foreground mb-1">
                      {item.role}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-4">
                      <span className="inline-flex items-center">
                        <Building2 className="w-3.5 h-3.5 mr-1" />
                        {item.company}
                      </span>
                      <span className="inline-flex items-center">
                        <MapPin className="w-3.5 h-3.5 mr-1" />
                        {item.location}
                      </span>
                    </div>

                    <ul className="space-y-2">
                      {item.bullets.map((bullet, bulletIndex) => (
                        <li
                          key={bulletIndex}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <Briefcase className="w-4 h-4 mt-0.5 text-accent shrink-0" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Empty spacer for alternating layout */}
                <div className="hidden sm:block sm:w-[calc(50%-2rem)]" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
