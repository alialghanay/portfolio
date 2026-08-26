"use client";

import React from "react";
import { motion } from "framer-motion";
import { SparklesCore } from "../ui/sparkles";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Link } from "@/lib/utils/i18n/navigation";
import { ArrowDown, Mail } from "lucide-react";

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#09090B] text-white px-6"
      id="home"
    >
      {/* Particle background */}
      <div className="absolute inset-0 z-0">
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

      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#09090B] via-transparent to-[#09090B] pointer-events-none z-[1]" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Avatar className="w-28 h-28 mb-6 ring-4 ring-white/20 shadow-xl">
            <AvatarImage src="/profile.jpg" alt="Ali Alghanay" />
            <AvatarFallback className="text-2xl font-heading bg-white/10 text-white">AA</AvatarFallback>
          </Avatar>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-sm sm:text-base font-medium text-white/70 uppercase tracking-widest mb-3"
        >
          Software Developer · Project Lead · Teaching Assistant
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-heading text-4xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-4"
        >
          Ali Mohammed Al-Ghanay
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-lg sm:text-xl text-white/80 max-w-2xl mb-8"
        >
          Building cross-platform mobile apps with Flutter, full-stack web experiences with Next.js & React, and
          scalable systems guided by Clean Architecture and OOP.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Button asChild size="lg" className="rounded-full px-8 bg-white text-[#09090B] hover:bg-white/90">
            <Link href="#projects">
              View Projects
              <ArrowDown className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-full px-8 border-white/30 text-white hover:bg-white/10 hover:text-white">
            <Link href="#contact">
              <Mail className="mr-2 h-4 w-4" />
              Contact Me
            </Link>
          </Button>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden sm:block"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="text-white/60"
        >
          <ArrowDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
