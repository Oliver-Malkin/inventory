'use client'

import { ChevronRightIcon } from "@heroicons/react/24/outline"
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import ProfileLinks from "./profile-links";

export default function ProfileButton() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
  return (
    <div className="relative">
      <button
        className="hover:cursor-pointer"
        onClick={() => setIsProfileOpen(!isProfileOpen)}
      >
        <div className="flex items-center">
          <div className="flex justify-center items-center bg-grey rounded-full w-9 h-9">
            <span className="text-2xl text-sidebar-foreground">PP</span>
          </div>
          <div className="pl-2">
            <motion.div
              animate={{ rotate: isProfileOpen ? 90 : 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 18
              }}
            >
              <ChevronRightIcon className="w-6 m-0.5 text-sidebar-foreground" />
            </motion.div>
          </div>
        </div>
      </button>

      {isProfileOpen && (
        <div className="absolute right-0 mt-3 w-40 bg-sidebar rounded-md shadow-lg z-10" ref={dropdownRef}>
          <ProfileLinks closeDropdown={() => setIsProfileOpen(false)} />
        </div>
      )}
    </div>
  )
}