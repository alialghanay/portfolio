"use client";

import React from "react";
import { Eye } from "lucide-react";
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
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="mt-4" aria-label={`View all ${title}`}>
          <Eye className="w-4 h-4 mr-1.5" />
          View all
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-2xl max-h-[80dvh] overflow-y-auto">
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
