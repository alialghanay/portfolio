"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Award, Users, CheckCircle2, GraduationCap, ExternalLink, FileText } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { getContent, type Content } from "@/lib/content";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CategoryDialog from "@/components/certifications/category-dialog";
import SectionHeading from "@/components/ui/section-heading";

type Certs = Content["certifications"];

function CertCard({ cert }: { cert: Certs["certificates"][number] }) {
  const t = useTranslations("Certifications");
  return (
    <Card className="gap-0 py-0 rounded-2xl border-border bg-card shadow-sm transition-[border-color,box-shadow] duration-300 hover:border-accent/40 hover:shadow-md">
      <CardContent className="p-4 flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 min-w-0">
            <CheckCircle2 className="size-5 text-accent mt-0.5 shrink-0" aria-hidden="true" />
            <div className="min-w-0">
              <p className="font-medium text-foreground">{cert.title}</p>
              <p className="text-sm text-muted-foreground">{cert.issuer}</p>
              {cert.date && (
                <p className="text-xs text-muted-foreground mt-0.5">{cert.date}</p>
              )}
            </div>
          </div>
          {cert.credentialUrl && (
            <Button asChild size="icon" variant="ghost" className="size-10 shrink-0 rounded-full text-muted-foreground">
              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("verifyAria", { title: cert.title })}
              >
                <ExternalLink aria-hidden="true" />
              </a>
            </Button>
          )}
        </div>
        {cert.imageUrl && (
          <a
            href={cert.credentialUrl || cert.imageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block overflow-hidden rounded-lg border border-border outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={t("openCertAria", { title: cert.title })}
          >
            <Image
              src={cert.imageUrl}
              alt=""
              width={800}
              height={600}
              className="h-auto w-full transition-transform duration-500 hover:scale-[1.02]"
            />
          </a>
        )}
      </CardContent>
    </Card>
  );
}

function AcademicCard({ item }: { item: Certs["academic"][number] }) {
  const t = useTranslations("Certifications");
  return (
    <Card className="gap-0 py-0 rounded-2xl border-border bg-card shadow-sm transition-[border-color,box-shadow] duration-300 hover:border-accent/40 hover:shadow-md">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="font-medium text-foreground">{item.title}</p>
            <p className="text-sm text-muted-foreground">{item.institution}</p>
            <p className="mt-2 inline-flex rounded-full bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent">{item.status}</p>
            {item.details && (
              <p className="text-sm text-muted-foreground mt-2">{item.details}</p>
            )}
          </div>
          {item.documentUrl && (
            <Button asChild size="icon" variant="ghost" className="size-10 shrink-0 rounded-full text-muted-foreground">
              <a
                href={item.documentUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("documentAria", { title: item.title })}
              >
                <FileText aria-hidden="true" />
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function LeadershipCard({ item }: { item: Certs["leadership"][number] }) {
  return (
    <Card className="gap-0 py-0 rounded-2xl border-border bg-card shadow-sm transition-[border-color,box-shadow] duration-300 hover:border-accent/40 hover:shadow-md">
      <CardContent className="p-4 flex items-start gap-3">
        <Users className="size-5 text-accent mt-0.5 shrink-0" aria-hidden="true" />
        <div>
          <p className="font-medium text-foreground">{item.title}</p>
          <p className="text-sm text-muted-foreground">{item.organization}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Certifications() {
  const t = useTranslations("Certifications");
  const data = getContent(useLocale()).certifications;
  // The last entry of each category is the one previewed on the home page.
  const previewCert = data.certificates.at(-1);
  const previewAcademic = data.academic.at(-1);
  const previewLeadership = data.leadership.at(-1);
  return (
    <section id="certifications" className="py-24 sm:py-32 px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Academic Credentials */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="mb-5 flex items-center gap-3 font-heading text-lg font-semibold text-foreground">
              <span aria-hidden="true" className="grid size-9 place-items-center rounded-lg bg-accent/10 text-accent">
                <GraduationCap className="size-4.5" />
              </span>
              {t("academic")}
            </h3>
            <div className="flex flex-col gap-4">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {previewAcademic && <AcademicCard item={previewAcademic} />}
              </motion.div>
              <div className="self-start">
                <CategoryDialog
                  title={t("academic")}
                  icon={<GraduationCap className="w-5 h-5 text-accent" />}
                >
                  {data.academic.map((item) => (
                    <AcademicCard key={item.id} item={item} />
                  ))}
                </CategoryDialog>
              </div>
            </div>
          </motion.div>

          {/* Tech Certificates */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="mb-5 flex items-center gap-3 font-heading text-lg font-semibold text-foreground">
              <span aria-hidden="true" className="grid size-9 place-items-center rounded-lg bg-accent/10 text-accent">
                <Award className="size-4.5" />
              </span>
              {t("tech")}
            </h3>
            <div className="flex flex-col gap-4">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {previewCert && <CertCard cert={previewCert} />}
              </motion.div>
              <div className="self-start">
                <CategoryDialog
                  title={t("tech")}
                  icon={<Award className="w-5 h-5 text-accent" />}
                >
                  {data.certificates.map((cert) => (
                    <CertCard key={cert.id} cert={cert} />
                  ))}
                </CategoryDialog>
              </div>
            </div>
          </motion.div>

          {/* Leadership & Community */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="mb-5 flex items-center gap-3 font-heading text-lg font-semibold text-foreground">
              <span aria-hidden="true" className="grid size-9 place-items-center rounded-lg bg-accent/10 text-accent">
                <Users className="size-4.5" />
              </span>
              {t("leadership")}
            </h3>
            <div className="flex flex-col gap-4">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {previewLeadership && <LeadershipCard item={previewLeadership} />}
              </motion.div>
              <div className="self-start">
                <CategoryDialog
                  title={t("leadership")}
                  icon={<Users className="w-5 h-5 text-accent" />}
                >
                  {data.leadership.map((item) => (
                    <LeadershipCard key={item.id} item={item} />
                  ))}
                </CategoryDialog>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
