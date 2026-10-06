"use client";

import React from "react";
import { Eye } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface CategoryDialogProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

export default function CategoryDialog({ title, icon, children }: CategoryDialogProps) {
  const t = useTranslations("Certifications");
  const tCommon = useTranslations("Common");
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="mt-4" aria-label={t("viewAllAria", { title })}>
          <Eye aria-hidden="true" />
          {t("viewAll")}
        </Button>
      </DialogTrigger>
      <DialogContent closeLabel={tCommon("close")} className="max-w-[calc(100%-2rem)] sm:max-w-2xl max-h-[80dvh] overflow-y-auto bg-popover text-popover-foreground">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <span aria-hidden="true">{icon}</span>
            {title}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4">{children}</div>
      </DialogContent>
    </Dialog>
  );
}
