"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import { ModeToggle } from "./dark-mode";
import data from "@/lib/constants/navs.json";
import { cn } from "@/lib/utils/cn";
import { Link, usePathname } from "@/lib/utils/i18n/navigation";

const NavBar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // next-intl's usePathname returns the pathname without the locale prefix.
  // Anchor links should stay on the homepage as bare hashes; on other pages
  // they become root-relative hashes so the locale-aware Link prefixes them.
  const isHome = pathname === "/";
  const hrefFor = (url: string) => {
    if (url.startsWith("#")) return isHome ? url : `/${url}`;
    return url;
  };

  const toggleSidebar = () => setIsOpen((open) => !open);
  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href={isHome ? "#home" : "/#home"}
            className="uppercase text-base font-heading font-bold tracking-tight text-foreground"
          >
            Ali Alghanay
          </Link>

          {/* Large screen navigation */}
          <nav
            className="hidden sm:flex items-center gap-1"
            aria-label="Main navigation"
          >
            {data.map((page) => {
              const href = hrefFor(page.url);
              const isActive = page.url.startsWith("#")
                ? isHome
                : pathname === href;
              return (
                <Link
                  key={page.id}
                  href={href}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    isActive
                      ? "text-primary bg-muted"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  {page.name}
                </Link>
              );
            })}
          </nav>

          {/* Dark mode toggle & mobile menu */}
          <div className="flex items-center gap-2">
            <ModeToggle />
            <button
              onClick={toggleSidebar}
              className="sm:hidden p-2 rounded-full text-foreground hover:bg-muted transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            id="mobile-menu"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed bottom-0 left-0 w-full rounded-t-2xl bg-background border-t border-border shadow-lg h-[85dvh] z-40 flex flex-col items-center p-6"
          >
            <button
              onClick={closeSidebar}
              className="absolute top-4 right-4 p-2 rounded-full text-foreground hover:bg-muted transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Close menu"
            >
              <FiX size={24} />
            </button>
            <ul className="mt-12 flex flex-col items-center gap-6">
              {data.map((page) => {
                const href = hrefFor(page.url);
                const isActive = page.url.startsWith("#")
                  ? isHome
                  : pathname === href;
                return (
                  <li key={page.id}>
                    <Link
                      href={href}
                      onClick={closeSidebar}
                      className={cn(
                        "text-2xl font-heading font-medium outline-none focus-visible:ring-2 focus-visible:ring-ring rounded px-2",
                        isActive
                          ? "text-accent"
                          : "text-foreground hover:text-accent"
                      )}
                    >
                      {page.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavBar;
