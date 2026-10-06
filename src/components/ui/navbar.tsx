"use client";

import React, { useEffect, useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { FiMenu, FiX } from "react-icons/fi";
import { Languages } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { ModeToggle } from "./dark-mode";
import data from "@/lib/constants/navs.json";
import { cn } from "@/lib/utils/cn";
import { Link, usePathname } from "@/lib/utils/i18n/navigation";
import { routing } from "@/lib/utils/i18n/routing";

// Home-page section each nav entry corresponds to: hash entries map to their
// anchor, route entries (`/projects`, `/notes`) to the teaser section of the
// same name, so scrolling past a teaser highlights its route.
const sectionFor = (url: string) => url.replace(/^[#/]/, "");
const sectionIds = data.map((page) => sectionFor(page.url));
type NavKey = "home" | "projects" | "experience" | "about" | "certifications" | "notes" | "contact";

function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<string>("home");

  useEffect(() => {
    if (!enabled) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      // A thin band across the middle of the viewport: whichever section
      // crosses it is the one being read.
      { rootMargin: "-45% 0px -50% 0px" }
    );
    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [enabled]);

  return active;
}

const NavBar = () => {
  const t = useTranslations("Nav");
  const tCommon = useTranslations("Common");
  const locale = useLocale();
  const otherLocale = routing.locales.find((l) => l !== locale) ?? routing.defaultLocale;
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // next-intl's usePathname returns the pathname without the locale prefix.
  // Anchor links should stay on the homepage as bare hashes; on other pages
  // they become root-relative hashes so the locale-aware Link prefixes them.
  const isHome = pathname === "/";
  const activeSection = useActiveSection(isHome);
  const hrefFor = (url: string) => {
    if (url.startsWith("#")) return isHome ? url : `/${url}`;
    return url;
  };
  const isActive = (url: string) =>
    isHome
      ? sectionFor(url) === activeSection
      : !url.startsWith("#") && pathname.startsWith(url);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/75 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
        <Link
          href={hrefFor("#home")}
          className="group flex items-center gap-2.5 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span
            aria-hidden="true"
            className="grid size-8 place-items-center rounded-lg bg-foreground font-heading text-xs font-bold text-background transition-colors group-hover:bg-accent group-hover:text-accent-foreground"
          >
            AA
          </span>
          <span className="font-heading text-base font-bold tracking-tight text-foreground">
            {tCommon("shortName")}
          </span>
        </Link>

        {/* Large screen navigation */}
        <nav className="hidden lg:block" aria-label={t("mainLabel")}>
          <ul className="flex items-center gap-1">
            {data.map((page) => {
              const active = isActive(page.url);
              return (
                <li key={page.id}>
                  <Link
                    href={hrefFor(page.url)}
                    aria-current={active ? (isHome ? "location" : "page") : undefined}
                    className={cn(
                      "relative rounded-full px-3 py-2 text-sm font-medium transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      active
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                    )}
                  >
                    {t(sectionFor(page.url) as NavKey)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          {/* Plain link (works without JS); swaps the locale and keeps the current page. */}
          <Link
            href={pathname}
            locale={otherLocale}
            hrefLang={otherLocale}
            aria-label={t("switchLanguage")}
            className="inline-flex h-10 items-center gap-1.5 rounded-full px-3 text-sm font-medium text-foreground transition-colors hover:bg-muted outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Languages className="size-4" aria-hidden="true" />
            <span lang={otherLocale}>{t("otherLanguage")}</span>
          </Link>
          <ModeToggle />

          {/* Mobile menu: Radix Dialog supplies focus trap, Esc, and scroll lock. */}
          <DialogPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
            <DialogPrimitive.Trigger
              className="lg:hidden inline-flex size-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label={t("openMenu")}
            >
              <FiMenu className="size-5" aria-hidden="true" />
            </DialogPrimitive.Trigger>
            <DialogPrimitive.Portal>
              <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
              <DialogPrimitive.Content
                id="mobile-menu"
                aria-describedby={undefined}
                className="fixed inset-x-0 bottom-0 z-50 flex max-h-[85dvh] flex-col rounded-t-3xl border-t border-border bg-background px-6 pt-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] shadow-2xl outline-none duration-300 data-[state=open]:animate-in data-[state=open]:slide-in-from-bottom data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom"
              >
                <div aria-hidden="true" className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-muted" />
                <div className="flex items-center justify-between">
                  <DialogPrimitive.Title className="font-heading text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                    {t("menu")}
                  </DialogPrimitive.Title>
                  <DialogPrimitive.Close
                    className="inline-flex size-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    aria-label={t("closeMenu")}
                  >
                    <FiX className="size-5" aria-hidden="true" />
                  </DialogPrimitive.Close>
                </div>
                <nav aria-label={t("mobileLabel")} className="mt-4 overflow-y-auto">
                  <ul className="flex flex-col gap-1">
                    {data.map((page) => {
                      const active = isActive(page.url);
                      return (
                        <li key={page.id}>
                          <Link
                            href={hrefFor(page.url)}
                            onClick={() => setIsOpen(false)}
                            aria-current={active ? (isHome ? "location" : "page") : undefined}
                            className={cn(
                              "flex min-h-12 items-center rounded-xl px-4 font-heading text-xl font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring",
                              active
                                ? "bg-muted text-accent"
                                : "text-foreground hover:bg-muted/60"
                            )}
                          >
                            {t(sectionFor(page.url) as NavKey)}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              </DialogPrimitive.Content>
            </DialogPrimitive.Portal>
          </DialogPrimitive.Root>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
