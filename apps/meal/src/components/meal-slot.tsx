"use client";

import type { Meal, MealSource, Satisfaction } from "@/lib/types";
import { addMealLog } from "@/lib/storage";
import { toDateKey } from "@/lib/utils";
import { useState } from "react";

type SlotName = "smoothie" | "breakfast" | "lunch" | "dinner";

const SLOT_LABELS: Record<SlotName, string> = {
  smoothie: "Smoothie",
  breakfast: "Breakfast",
  lunch: "Lunch",
  dinner: "Dinner",
};

const SOURCE_OPTIONS: { value: MealSource; label: string }[] = [
  { value: "home-cooked", label: "Home-cooked" },
  { value: "brought-to-office", label: "Brought to office" },
  { value: "cava", label: "Cava" },
  { value: "dads-cooking", label: "Dad's cooking" },
  { value: "restaurant", label: "Restaurant" },
  { value: "other", label: "Other" },
];

const SATISFACTION_OPTIONS: { value: Satisfaction; label: string }[] = [
  { value: "great", label: "Great" },
  { value: "fine", label: "Fine" },
  { value: "not-great", label: "Not great" },
];

type MealSlotProps = {
  slot: SlotName;
  plannedMeal?: Meal;
  isOfficeDay: boolean;
};

export function MealSlot({ slot, plannedMeal, isOfficeDay }: MealSlotProps) {
  const [logged, setLogged] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [selectedSource, setSelectedSource] = useState<MealSource | null>(null);

  const hint = getHint(slot, isOfficeDay, plannedMeal);

  function handleLog(satisfaction: Satisfaction) {
    addMealLog({
      id: `${toDateKey(new Date())}-${slot}-${Date.now()}`,
      date: toDateKey(new Date()),
      slot,
      mealId: plannedMeal?.id,
      source: selectedSource ?? "home-cooked",
      satisfaction,
    });
    setLogged(true);
    setExpanded(false);
  }

  if (logged) {
    return (
      <div className="rounded-xl border border-accent/30 bg-accent-light/40 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-accent text-sm font-medium">
              {SLOT_LABELS[slot]}
            </span>
            <span className="text-xs text-muted">logged</span>
          </div>
          <button
            onClick={() => setLogged(false)}
            className="text-xs text-muted hover:text-foreground"
          >
            undo
          </button>
        </div>
        {plannedMeal && (
          <p className="mt-1 text-sm text-foreground/70">{plannedMeal.name}</p>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left"
      >
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">{SLOT_LABELS[slot]}</span>
          <span className="text-xs text-muted">
            {expanded ? "close" : "log"}
          </span>
        </div>
        {plannedMeal && (
          <p className="mt-1 text-sm text-foreground/70">{plannedMeal.name}</p>
        )}
        {!plannedMeal && hint && (
          <p className="mt-1 text-xs text-muted italic">{hint}</p>
        )}
      </button>

      {expanded && (
        <div className="mt-3 flex flex-col gap-3 border-t border-border pt-3">
          {plannedMeal && (
            <div className="text-xs text-muted">
              <p>{plannedMeal.description}</p>
              <p className="mt-1">{plannedMeal.prepMinutes} min prep</p>
            </div>
          )}

          <div>
            <p className="text-xs font-medium text-muted mb-1">Source</p>
            <div className="flex flex-wrap gap-1.5">
              {SOURCE_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setSelectedSource(opt.value)}
                  className={`rounded-full border px-2.5 py-1 text-xs transition-colors ${
                    selectedSource === opt.value
                      ? "border-accent bg-accent-light text-accent"
                      : "border-border hover:border-accent hover:text-accent"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-medium text-muted mb-1">How was it?</p>
            <div className="flex gap-1.5">
              {SATISFACTION_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => handleLog(opt.value)}
                  className="rounded-full border border-border px-2.5 py-1 text-xs hover:border-accent hover:text-accent transition-colors"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function getHint(
  slot: SlotName,
  isOfficeDay: boolean,
  plannedMeal?: Meal
): string | null {
  if (plannedMeal) return null;
  if (slot === "smoothie") return "5 min -- blend and go";
  if (slot === "lunch" && isOfficeDay) return "Bring something or Cava?";
  return null;
}
