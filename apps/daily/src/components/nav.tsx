"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/", label: "Today" },
  { href: "/meals", label: "Meals" },
  { href: "/workout", label: "Workout" },
  { href: "/groceries", label: "Grocery" },
  { href: "/history", label: "History" },
  { href: "/data", label: "Data" },
] as const;

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="sticky bottom-0 border-t border-border bg-surface/95 backdrop-blur-sm">
      <div className="flex justify-around py-2">
        {NAV_ITEMS.map((item) => {
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`px-2 py-2 text-xs font-medium rounded-lg transition-colors ${
                active
                  ? "text-accent"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
