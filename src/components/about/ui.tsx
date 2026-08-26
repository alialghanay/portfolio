"use client";

import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, MapPin } from "lucide-react";

const skills = [
  "Java",
  "Dart",
  "Python",
  "JavaScript",
  "C/C++",
  "SQL",
  "Flutter",
  "Next.js",
  "React.js",
  "Django",
  "Laravel",
  "Clean Architecture",
  "OOP",
  "RESTful APIs",
  "Database Design",
  "Git",
  "GitHub",
  "Linux/Unix",
];

const About = () => {
  return (
    <section id="about" className="py-24 sm:py-32 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-sm font-medium text-accent uppercase tracking-widest mb-3">
              About Me
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Software Developer, Project Lead & Teaching Assistant
            </h2>
            <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
              <p>
                Experienced Software Developer, Project Lead, and University Teaching Assistant based in
                Tripoli, Libya. I specialize in cross-platform mobile development with Flutter, full-stack
                web applications with Next.js and React, and software architecture using Clean Architecture
                and OOP principles.
              </p>
              <p>
                As the founder of Octobits and lead developer behind live commercial platforms in Libya
                including Mutah.ly and Addidi.ly, I have managed end-to-end product development, from
                frontend implementation and staging pipelines to production deployment and team leadership.
              </p>
            </div>

            {/* Education */}
            <div className="mt-10 space-y-4">
              <h3 className="font-heading text-xl font-semibold text-foreground flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-accent" />
                Education
              </h3>
              <div className="space-y-3">
                <div className="p-4 rounded-xl border border-border bg-muted/30">
                  <p className="font-medium text-foreground">Master of Science in Software Development</p>
                  <p className="text-sm text-muted-foreground">University of Tripoli, Tripoli, Libya</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Paused for overseas scholarship — completed 2 taught semesters.
                  </p>
                </div>
                <div className="p-4 rounded-xl border border-border bg-muted/30">
                  <p className="font-medium text-foreground">Bachelor of Science in Software Engineering</p>
                  <p className="text-sm text-muted-foreground">
                    University of Tripoli, Faculty of Information Technology · Grade: 71.7%
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-accent" />
              <h3 className="font-heading text-xl font-semibold text-foreground">Tripoli, Libya</h3>
            </div>

            <h3 className="font-heading text-xl font-semibold text-foreground mb-4">
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Badge
                  key={skill}
                  variant="outline"
                  className="px-3 py-1 text-sm font-normal border-border text-foreground hover:border-accent hover:text-accent transition-colors cursor-default"
                >
                  {skill}
                </Badge>
              ))}
            </div>

            <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-muted/30 border border-border">
                <p className="font-heading text-2xl font-bold text-foreground">5+</p>
                <p className="text-sm text-muted-foreground">Years Coding</p>
              </div>
              <div className="p-4 rounded-xl bg-muted/30 border border-border">
                <p className="font-heading text-2xl font-bold text-foreground">5+</p>
                <p className="text-sm text-muted-foreground">Commercial Projects</p>
              </div>
              <div className="p-4 rounded-xl bg-muted/30 border border-border">
                <p className="font-heading text-2xl font-bold text-foreground">Flutter</p>
                <p className="text-sm text-muted-foreground">Mobile Focus</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
