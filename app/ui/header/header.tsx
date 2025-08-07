'use client';

import NavBar from "./nav-bar";
import ProfileButton from "./profile-button";
import ThemeButton from "./theme-button";

export default function Header() {
  return(
    <header className="flex items-center h-14 p-2 relative bg-sidebar">
      <div className="flex justify-start ml-5 p-2">
        <NavBar />
      </div>

      <div className="flex justify-end items-center w-full mr-5">
        <ThemeButton />
        <ProfileButton />
      </div>
    </header>
  );
}
