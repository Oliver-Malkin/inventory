'use client';

import { ChevronRightIcon, Bars3Icon, SunIcon, MoonIcon } from "@heroicons/react/24/outline"
import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

import ProfileLinks from "./header-links";

export default function Header() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  //const [isMenuOpen, setIsMenuOpen] = useState(false);
  // finish this later. menu for small screens

  const dropdownRef = useRef<HTMLDivElement>(null);

  const {resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!isProfileOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current && !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    // Clean up the event listener on unmount
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isProfileOpen]);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;
  const isDark = resolvedTheme === "dark";

  return(
    <header className="flex items-center h-14 bg-gray-600 p-2 relative text-Black">
      <div className="flex justify-start p-2 sm:hidden">
        <Bars3Icon className="w-8 h-8" />
      </div>

      <div className="flex justify-end items-center w-full">
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
                  <MoonIcon className="size-7" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        <div className="relative">
          <button
            className="hover:cursor-pointer"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
          >
            <div className="flex">
              <div className="flex justify-center items-center bg-gray-400 rounded-full w-9 h-9">
                <span className="text-2xl">PP</span>
              </div>
              <ChevronRightIcon className={`w-6 m-0.5 transform transition-transform ease-out duration-250 ${isProfileOpen ? 'rotate-90' : ''}`} />
            </div>
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-3 w-40 bg-white dark:bg-Onyx rounded-md shadow-lg z-10" ref={dropdownRef}>
              <ProfileLinks closeDropdown={() => setIsProfileOpen(false)} />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
