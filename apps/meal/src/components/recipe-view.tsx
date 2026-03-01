"use client";

import type { Meal } from "@/lib/types";
import { useEffect, useState } from "react";
import Link from "next/link";

// Keeps the screen on while cooking
function useWakeLock() {
  const [active, setActive] = useState(false);
  const [wakeLock, setWakeLock] = useState<WakeLockSentinel | null>(null);

  async function toggle() {
    if (active && wakeLock) {
      await wakeLock.release();
      setWakeLock(null);
      setActive(false);
    } else if ("wakeLock" in navigator) {
      try {
        const lock = await navigator.wakeLock.request("screen");
        setWakeLock(lock);
        setActive(true);
        lock.addEventListener("release", () => {
          setActive(false);
          setWakeLock(null);
        });
      } catch {
        // Wake lock request failed (low battery, etc.)
      }
    }
  }

  useEffect(() => {
    return () => {
      wakeLock?.release();
    };
  }, [wakeLock]);

  return { active, toggle, supported: typeof navigator !== "undefined" && "wakeLock" in navigator };
}

type RecipeViewProps = {
  meal: Meal;
};

export function RecipeView({ meal }: RecipeViewProps) {
  const { active, toggle, supported } = useWakeLock();
  const [checkedSteps, setCheckedSteps] = useState<Set<number>>(new Set());

  function toggleStep(index: number) {
    setCheckedSteps((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }

  return (
    <main className="flex-1 px-4 py-6 pb-20">
      <Link
        href="/meals"
        className="text-xs text-muted hover:text-foreground mb-4 inline-block"
      >
        Back to meals
      </Link>

      <div className="flex items-start justify-between gap-2 mb-1">
        <h1 className="text-2xl font-semibold tracking-tight">{meal.name}</h1>
        {supported && (
          <button
            onClick={toggle}
            className={`shrink-0 mt-1 rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
              active
                ? "border-accent bg-accent-light text-accent"
                : "border-border text-muted hover:border-accent hover:text-accent"
            }`}
          >
            {active ? "Screen on" : "Keep screen on"}
          </button>
        )}
      </div>

      <p className="text-sm text-muted mb-6">{meal.description}</p>

      {/* Quick info bar */}
      <div className="flex gap-3 mb-6 text-xs text-muted">
        <span>{meal.prepMinutes} min</span>
        <span>{meal.servings} {meal.servings === 1 ? "serving" : "servings"}</span>
        {meal.onePot && <span>one-pot</span>}
        {meal.batchFriendly && <span>batch-friendly</span>}
      </div>

      {/* Ingredients */}
      <section className="mb-8">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted mb-3">
          Ingredients
        </h2>
        <div className="rounded-xl border border-border bg-surface divide-y divide-border">
          {meal.ingredients.map((ing, i) => (
            <div key={i} className="px-4 py-3 flex justify-between gap-2">
              <span className="text-sm">
                {ing.item}
                {ing.note && (
                  <span className="text-muted"> — {ing.note}</span>
                )}
              </span>
              <span className="text-sm text-muted whitespace-nowrap">
                {ing.amount}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Steps — tappable to mark done */}
      <section className="mb-8">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted mb-3">
          Steps
        </h2>
        <div className="flex flex-col gap-2">
          {meal.steps.map((step, i) => {
            const done = checkedSteps.has(i);
            return (
              <button
                key={i}
                onClick={() => toggleStep(i)}
                className={`text-left rounded-xl border p-4 transition-colors ${
                  done
                    ? "border-accent/30 bg-accent-light/40"
                    : "border-border bg-surface"
                }`}
              >
                <div className="flex gap-3">
                  <span
                    className={`shrink-0 text-sm font-medium ${
                      done ? "text-accent" : "text-muted"
                    }`}
                  >
                    {i + 1}.
                  </span>
                  <span
                    className={`text-sm leading-relaxed ${
                      done ? "text-muted" : ""
                    }`}
                  >
                    {step}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Notes */}
      {meal.notes && (
        <section className="mb-8">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted mb-3">
            Notes
          </h2>
          <div className="rounded-xl border border-border bg-surface p-4">
            <p className="text-sm leading-relaxed text-foreground/70">
              {meal.notes}
            </p>
          </div>
        </section>
      )}
    </main>
  );
}
