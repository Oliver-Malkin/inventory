'use client';

/* 
Hide by default when on a smaller screens
Use dropdown menu from header instead
*/

import NavLinks from "./nav-links";
import clsx from "clsx";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <nav className={clsx(
      "flex h-full flex-col px-3 py-4 bg-Blue transition-all duration-300 ease-in-out text-black",
      isOpen ? "w-64" : "w-20")}>
      <div className="relative pb-12">
        <div className="absolute top-1 left-[0.8em] z-50">
          <button className="transition-all duration-1000 ease-in-out" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <XMarkIcon className="w-7 transition-transform duration-200 hover:scale-120 hover:cursor-pointer" />
            ) : (
              <Bars3Icon className="w-7 transition-transform duration-200 hover:scale-120 hover:cursor-pointer" />
            )}
          </button>
        </div>
      </div>

      <div className="flex grow">
        <NavLinks isOpen={isOpen} />
      </div>
    </nav>
  );
}