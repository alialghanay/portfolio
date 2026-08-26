"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import { cn } from "@/lib/utils/cn";

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

export interface Project {
  id: number;
  title: string;
  role: string;
  description: string;
  tags: string[];
  image: string | null;
  liveUrl: string;
  repoUrl: string | null;
  featured?: boolean;
}

export default function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {projects.map((project) => (
        <motion.div key={project.id} variants={itemVariants}>
          <Card className="group h-full flex flex-col overflow-hidden border-border bg-card hover:border-accent/50 transition-colors duration-300">
            <CardHeader className="pb-3">
              <p className="text-xs font-medium text-accent uppercase tracking-wider mb-1">
                {project.role}
              </p>
              <CardTitle className="font-heading text-xl text-card-foreground">
                {project.title}
              </CardTitle>
              <CardDescription className="text-muted-foreground line-clamp-3">
                {project.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="font-normal text-xs"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="mt-auto flex items-center gap-3">
                {project.liveUrl && project.liveUrl !== "#" && (
                  <Button
                    asChild
                    size="sm"
                    variant="default"
                    className={cn(
                      "rounded-full",
                      !project.repoUrl && "flex-1"
                    )}
                  >
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit ${project.title} live site`}
                    >
                      <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                      Visit
                    </a>
                  </Button>
                )}
                {project.repoUrl && (
                  <Button
                    asChild
                    size="sm"
                    variant="outline"
                    className={cn(
                      "rounded-full",
                      !project.liveUrl && "flex-1"
                    )}
                  >
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View source code of ${project.title}`}
                    >
                      <Github className="mr-1.5 h-3.5 w-3.5" />
                      Code
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
