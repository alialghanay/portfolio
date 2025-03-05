"use client";

import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import { ModeToggle } from "./dark-mode";
import data from "@/lib/jsons/navs.json";
import Link from "next/link";
import { usePathname } from "next/navigation";

const FloatingNavBar = () => {
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      let previous = scrollYProgress.getPrevious();
      let direction = previous !== undefined ? current - previous : 0;
      if (scrollYProgress.get() < 0.05) {
        setVisible(false);
      } else {
        setVisible(direction < 0);
      }
    }
  });

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <AnimatePresence mode="wait" key={pathname}>
      <motion.header
        initial={{ opacity: 1, y: -100 }}
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="flex fixed top-5 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-full dark:bg-black bg-white shadow-md z-[5000] px-8 py-2 items-center justify-between max-w-[90%]"
      >
        <h1 className="uppercase text-lg font-bold">Ali Alghanay</h1>

        {/* Large screen navigation */}
        <nav className="hidden sm:flex items-center gap-6">
          {data.map((page, index) => (
            <Link
              key={index}
              href={page.url}
              className={
                pathname == page.url ? "text-primary" : "hover:text-secondary"
              }
            >
              {page.name}
            </Link>
          ))}
        </nav>

        {/* Dark mode toggle & mobile menu */}
        <div className="flex items-center gap-4">
          <ModeToggle />
          <button onClick={toggleSidebar} className="sm:hidden">
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile sidebar */}
      <aside
        className={`fixed bottom-0 left-0 w-full rounded-t-2xl bg-sidebar shadow-md transform transition-all duration-500 ease-in-out ${
          isOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        } h-[85dvh] z-40 flex flex-col items-center p-4`}
      >
        <ul className="mt-8 flex flex-col items-center gap-6">
          {data.map((page, index) => (
            <li
              key={index}
              className={
                pathname == page.url
                  ? "text-primary text-xl"
                  : "hover:text-primary hover:text-2xl text-xl"
              }
            >
              <Link href={page.url}>{page.name}</Link>
            </li>
          ))}
        </ul>
      </aside>
    </AnimatePresence>
  );
};

export default FloatingNavBar;
