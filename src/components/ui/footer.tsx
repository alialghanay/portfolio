"use client";

import { FiLinkedin, FiGithub } from "react-icons/fi";
import { Link, usePathname } from "@/lib/utils/i18n/navigation";
import { FaXTwitter } from "react-icons/fa6";
import data from "@/lib/constants/navs.json";

const Footer = () => {
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
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <Link
              href={hrefFor("#home")}
              className="font-heading font-bold text-lg text-foreground hover:text-accent transition-colors"
            >
              Ali Alghanay
            </Link>
            <p className="text-sm text-muted-foreground mt-1">
              Software Developer · Project Lead · Teaching Assistant
            </p>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-4" aria-label="Footer navigation">
            {data.map((page) => (
              <Link
                key={page.id}
                href={hrefFor(page.url)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {page.name}
              </Link>
            ))}
            <Link
              href="/notes"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Notes
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/in/alialghanay"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="LinkedIn"
            >
              <FiLinkedin className="w-5 h-5" />
            </a>
            <a
              href="https://x.com/alialghanay"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="X (Twitter)"
            >
              <FaXTwitter className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/alialghanay"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="GitHub"
            >
              <FiGithub className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border text-center text-sm text-muted-foreground">
          &copy; {currentYear} Ali Alghanay. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
