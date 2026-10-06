"use client";

import { ArrowUp } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/lib/utils/i18n/navigation";
import data from "@/lib/constants/navs.json";
import SocialLinks from "./social-links";

type NavKey = "home" | "projects" | "experience" | "about" | "certifications" | "notes" | "contact";

const Footer = () => {
  const t = useTranslations("Footer");
  const tNav = useTranslations("Nav");
  const tCommon = useTranslations("Common");
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  // next-intl's usePathname returns the pathname without the locale prefix.
  const isHome = pathname === "/";
  const hrefFor = (url: string) => {
    if (url.startsWith("#")) return isHome ? url : `/${url}`;
    return url;
  };

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="text-center lg:text-start">
            <Link
              href={hrefFor("#home")}
              className="inline-flex items-center gap-2.5 rounded-md font-heading text-lg font-bold text-foreground outline-none transition-colors hover:text-accent focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span
                aria-hidden="true"
                className="grid size-8 place-items-center rounded-lg bg-foreground text-xs text-background"
              >
                AA
              </span>
              {tCommon("shortName")}
            </Link>
            <p className="mt-2 max-w-xs text-sm text-muted-foreground">
              {tCommon("roles")}
            </p>
          </div>

          <nav aria-label={tNav("footerLabel")}>
            <ul className="flex flex-wrap items-center justify-center gap-x-1 gap-y-1">
              {data.map((page) => (
                <li key={page.id}>
                  <Link
                    href={hrefFor(page.url)}
                    className="inline-flex min-h-11 items-center rounded-md px-3 text-sm text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {tNav(page.url.replace(/^[#/]/, "") as NavKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <SocialLinks />
        </div>

        <div className="mt-10 flex flex-col-reverse items-center justify-between gap-4 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row">
          <p>{t("rights", { year: currentYear })}</p>
          <Link
            href={hrefFor("#home")}
            className="inline-flex min-h-11 items-center gap-1.5 rounded-md px-2 outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
          >
            {t("backToTop")}
            <ArrowUp className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
