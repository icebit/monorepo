"use client";

import { useState, useEffect } from "react";

type GroceryListProps = {
  title: string;
  items: string[];
  storageKey: string;
};

export function GroceryList({ title, items, storageKey }: GroceryListProps) {
  const [checked, setChecked] = useState<Set<string>>(new Set());

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      setChecked(new Set(JSON.parse(stored)));
    }
  }, [storageKey]);

  function toggle(item: string) {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(item)) {
        next.delete(item);
      } else {
        next.add(item);
      }
      localStorage.setItem(storageKey, JSON.stringify([...next]));
      return next;
    });
  }

  function clearAll() {
    setChecked(new Set());
    localStorage.removeItem(storageKey);
  }

  const checkedCount = items.filter((i) => checked.has(i)).length;

  return (
    <section className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xs font-medium text-muted uppercase tracking-wide">
          {title}
        </h2>
        {checkedCount > 0 && (
          <button
            onClick={clearAll}
            className="text-xs text-muted hover:text-foreground"
          >
            clear ({checkedCount}/{items.length})
          </button>
        )}
      </div>
      <div className="rounded-xl border border-border bg-surface divide-y divide-border">
        {items.map((item) => {
          const isChecked = checked.has(item);
          return (
            <label
              key={item}
              className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-background transition-colors"
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => toggle(item)}
                className="h-4 w-4 rounded border-border accent-accent"
              />
              <span
                className={`text-sm ${isChecked ? "line-through text-muted" : ""}`}
              >
                {item}
              </span>
            </label>
          );
        })}
      </div>
    </section>
  );
}
