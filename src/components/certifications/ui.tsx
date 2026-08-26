"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Award, Users, CheckCircle2, GraduationCap, ExternalLink, FileText } from "lucide-react";
import data from "@/lib/constants/certifications.json";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" as const },
  },
};

export default function Certifications() {
  return (
    <section id="certifications" className="py-24 sm:py-32 px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium text-accent uppercase tracking-widest mb-3">
            Credentials & Community
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Certifications & Education
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Academic background, verified certifications, and community leadership.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="font-heading text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <Award className="w-5 h-5 text-accent" />
              freeCodeCamp Certificates
            </h3>
            <motion.ul
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-3"
            >
              {data.certificates.map((cert) => (
                <motion.li key={cert.id} variants={itemVariants}>
                  <Card className="border-border bg-card hover:border-accent/30 transition-colors">
                    <CardContent className="p-4 flex flex-col gap-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3 min-w-0">
                          <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                          <div className="min-w-0">
                            <p className="font-medium text-foreground">{cert.title}</p>
                            <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                            {cert.date && (
                              <p className="text-xs text-muted-foreground mt-0.5">{cert.date}</p>
                            )}
                          </div>
                        </div>
                        {cert.credentialUrl && (
                          <Button asChild size="sm" variant="ghost" className="shrink-0">
                            <a
                              href={cert.credentialUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`Verify ${cert.title}`}
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          </Button>
                        )}
                      </div>
                      {cert.imageUrl && (
                        <a
                          href={cert.credentialUrl || cert.imageUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block rounded-md overflow-hidden border border-border"
                        >
                          <Image
                            src={cert.imageUrl}
                            alt={`${cert.title} certificate`}
                            width={800}
                            height={600}
                            className="w-full h-auto"
                          />
                        </a>
                      )}
                    </CardContent>
                  </Card>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Academic */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="font-heading text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-accent" />
              Academic Credentials
            </h3>
            <motion.ul
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-3"
            >
              {data.academic.map((item) => (
                <motion.li key={item.id} variants={itemVariants}>
                  <Card className="border-border bg-card hover:border-accent/30 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <p className="font-medium text-foreground">{item.title}</p>
                          <p className="text-sm text-muted-foreground">{item.institution}</p>
                          <p className="text-xs text-accent mt-1 font-medium">{item.status}</p>
                          {item.details && (
                            <p className="text-sm text-muted-foreground mt-2">{item.details}</p>
                          )}
                        </div>
                        {item.documentUrl && (
                          <Button asChild size="sm" variant="ghost" className="shrink-0">
                            <a
                              href={item.documentUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`View ${item.title} document`}
                            >
                              <FileText className="w-4 h-4" />
                            </a>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>

        {/* Leadership */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16"
        >
          <h3 className="font-heading text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
            <Users className="w-5 h-5 text-accent" />
            Leadership & Community
          </h3>
          <motion.ul
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
          >
            {data.leadership.map((item) => (
              <motion.li key={item.id} variants={itemVariants}>
                <Card className="border-border bg-card hover:border-accent/30 transition-colors h-full">
                  <CardContent className="p-4 flex items-start gap-3">
                    <Users className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium text-foreground">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.organization}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  );
}
