"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { SparklesCore } from "../ui/sparkles";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import SocialLinks from "../ui/social-links";
import { Link } from "@/lib/utils/i18n/navigation";
import { ArrowDown, Mail } from "lucide-react";

const reveal = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export default function HeroSection() {
  const t = useTranslations("Hero");
  const tCommon = useTranslations("Common");
  return (
    <section
      className="relative isolate flex min-h-[calc(100dvh-4rem)] w-full flex-col items-center justify-center overflow-hidden bg-[#09090B] px-6 py-24 text-white"
      id="home"
    >
      {/* Particle field — SparklesCore skips itself for reduced-motion users. */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.4}
          maxSize={1.2}
          particleDensity={60}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>

      {/* Faint grid + accent glow, masked so the edges fade into the page. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgb(255_255_255/0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.04)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_45%,#000_40%,transparent_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[38%] -z-10 h-[28rem] w-[42rem] max-w-[120vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(59_130_246/0.28),transparent)] blur-2xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-[#09090B]"
      />

      <div className="relative flex max-w-3xl flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative mb-8"
        >
          <div
            aria-hidden="true"
            className="absolute -inset-1 rounded-full bg-gradient-to-tr from-blue-500/60 via-white/20 to-transparent blur-sm"
          />
          <Avatar className="relative size-28 ring-4 ring-[#09090B] sm:size-32">
            <AvatarImage src="/profile.jpg" alt={t("portraitAlt")} />
            <AvatarFallback className="bg-white/10 font-heading text-2xl text-white">AA</AvatarFallback>
          </Avatar>
        </motion.div>

        <motion.p
          {...reveal(0.05)}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm text-white/80 backdrop-blur"
        >
          <span className="relative flex size-2" aria-hidden="true">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
          </span>
          {t("available")}
        </motion.p>

        <motion.h1
          {...reveal(0.15)}
          className="mb-4 font-heading text-4xl font-bold tracking-tight text-balance sm:text-6xl lg:text-7xl"
        >
          <span className="bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent">
            {tCommon("name")}
          </span>
        </motion.h1>

        <motion.p
          {...reveal(0.25)}
          className="mb-5 text-sm font-medium uppercase tracking-[0.2em] text-blue-300 sm:text-base"
        >
          {tCommon("roles")}
        </motion.p>

        <motion.p
          {...reveal(0.35)}
          className="mb-10 max-w-2xl text-lg text-pretty text-white/75 sm:text-xl"
        >
          {t("tagline")}
        </motion.p>

        <motion.div
          {...reveal(0.45)}
          className="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row sm:gap-4"
        >
          <Button
            asChild
            size="lg"
            className="h-12 w-full rounded-full bg-white px-8 text-[#09090B] hover:bg-white/90 focus-visible:ring-white/50 sm:w-auto"
          >
            <Link href="#projects">
              {t("viewProjects")}
              <ArrowDown aria-hidden="true" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-12 w-full rounded-full border-white/25 bg-white/5 px-8 text-white hover:bg-white/10 hover:text-white focus-visible:ring-white/50 sm:w-auto"
          >
            <Link href="#contact">
              <Mail aria-hidden="true" />
              {t("contactMe")}
            </Link>
          </Button>
        </motion.div>

        <motion.div {...reveal(0.55)} className="mt-8">
          <SocialLinks linkClassName="text-white/60 hover:bg-white/10 hover:text-white focus-visible:ring-white/50" />
        </motion.div>
      </div>

      {/* Scroll hint (decorative; the CTA above is the accessible path). */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 sm:block"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="text-white/40"
        >
          <ArrowDown className="size-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
