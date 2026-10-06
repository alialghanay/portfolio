"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "center" | "start";
  /** Render the title as the page's h1 instead of a section h2. */
  as?: "h1" | "h2";
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  as: Heading = "h2",
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "mb-14 sm:mb-16",
        align === "center" ? "text-center" : "text-start",
        className
      )}
    >
      <p
        className={cn(
          "mb-3 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-accent",
          align === "center" && "justify-center"
        )}
      >
        <span aria-hidden="true" className="h-px w-6 bg-accent/60" />
        {eyebrow}
      </p>
      <Heading className="font-heading text-3xl font-bold text-balance text-foreground sm:text-4xl lg:text-5xl">
        {title}
      </Heading>
      {description && (
        <p
          className={cn(
            "mt-4 max-w-2xl text-lg text-pretty text-muted-foreground",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
