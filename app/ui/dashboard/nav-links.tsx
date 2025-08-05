'use client';

import { 
  HomeIcon,
  ServerStackIcon,
  UserGroupIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';

import Link from 'next/link';
import clsx from 'clsx';

export default function NavLinks({
  isOpen
}: {
  isOpen: boolean
}) {
  const pathname = usePathname();

  const links = [
    {name: "Home", href: "/dashboard", icon: HomeIcon},
    {name: "Add Server", href: "/dashboard/servers", icon: ServerStackIcon, permission: "can_add_server"},
    {name: "Users", href: "/dashboard/users", icon: UsersIcon, permission: "can_manage_users"},
    {name: "Groups", href: "/dashboard/groups", icon: UserGroupIcon}
  ];

  return(
    <div className="grow">
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-lg font-[600] hover:text-blue-600 ",
              {
                "bg-sky-100 text-blue-600": pathname === link.href,
                "flex-none justify-start p-2 px-3": isOpen === true
              }
            )}>
              <LinkIcon className="w-6" />
              <p className={clsx(isOpen ? "block" : "hidden")}>{link.name}</p>
          </Link>
        );
      })}
    </div>
  );
}
