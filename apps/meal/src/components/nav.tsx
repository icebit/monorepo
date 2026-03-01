"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/", label: "Today" },
  { href: "/meals", label: "Meals" },
  { href: "/groceries", label: "Groceries" },
] as const;

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="sticky bottom-0 border-t border-border bg-surface/95 backdrop-blur-sm">
      <div className="flex justify-around py-2">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
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
