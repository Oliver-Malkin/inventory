import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function ProfileLinks({
  closeDropdown
}: {
  closeDropdown: () => void
}) {
  const links = [
    { name: "Profile", href: "/dashboard", hide: true },
    { name: "Settings", href: "/dashboard", hide: true },
  ];

  return (
    <div className="text-[1.2em]">
      {links.map((link, i) => {
        const isFirst = i === 0;
        return (
          <Link
            key={link.name}
            href={link.href}
            onClick={() => {
              if (link.hide) {
                closeDropdown();
              }
            }}
          >
            <p className={`hover:bg-button-selected-background text-sidebar-foreground px-1 py-0.5 
              ${isFirst && 'rounded-t-md'}`}>{link.name}</p>
          </Link>
        );
      })}
      <button className={"hover:bg-button-selected-background text-sidebar-foreground hover:cursor-pointer w-full text-left px-1 py-0.5 rounded-b-md"}
        onClick={async () => await authClient.signOut({
          fetchOptions: {
            onSuccess: () => {
              redirect("/sign-in"); // redirect to login page
            },
          }
        })}>Logout
      </button>
    </div>
  );
}
