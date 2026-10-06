"use client";

import { MotionConfig } from "framer-motion";

// The CSS reduced-motion rule in globals.css only covers CSS animations;
// framer-motion drives transforms from JS, so it has to opt in separately.
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
