'use client';

import {
  HomeIcon,
  PlusIcon,
  Cog8ToothIcon,
} from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';

import Link from 'next/link';
import clsx from 'clsx';

export default function NavLinks() {
  const pathname = usePathname();

  const links = [
    { name: "Home", href: "/dashboard", icon: HomeIcon },
    { name: "New", href: "/dashboard/new", icon: PlusIcon },
    { name: "Settings", href: "/dashboard/settings", icon: Cog8ToothIcon }
  ];

  return (
    <div className='flex'>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex h-[35px] items-center justify-center gap-2 rounded-sm px-2 ml-2 text-lg font-[600] text-foregound hover:text-button-selected",
              {
                "text-button-selected bg-button-selected-background": pathname === link.href
              }
            )}>
            <LinkIcon className="w-6" />
            <p>{link.name}</p>
          </Link>
        );
      })}
    </div>
  );
}
