'use client'

import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";


export default function ThemeButton() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;
  const isDark = resolvedTheme === "dark";

  return (
    <div className="flex items-center mx-4">
      <button
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className="hover:cursor-pointer p-2 rounded-full transition duration-300"
        aria-label="Toggle Theme"
      >
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.div
              key="sun"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.175, 0.885, 0.32, 1.3] }}
            >
              <SunIcon className="size-7 text-yellow-500" />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.175, 0.885, 0.32, 1.3] }}
            >
              <MoonIcon className="size-7 text-sidebar-foreground" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </div>
  )
}
