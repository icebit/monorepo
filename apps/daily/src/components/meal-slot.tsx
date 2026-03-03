"use client";

import type { Meal, MealSource, Satisfaction } from "@/lib/types";
import { meals } from "@/lib/meals";
import { addMealLog } from "@/lib/storage";
import { toDateKey } from "@/lib/utils";
import { useState } from "react";
import Link from "next/link";

type SlotName = "smoothie" | "breakfast" | "lunch" | "dinner";

const SLOT_LABELS: Record<SlotName, string> = {
  smoothie: "Smoothie",
  breakfast: "Breakfast",
  lunch: "Lunch",
  dinner: "Dinner",
};

const SOURCE_OPTIONS: { value: MealSource; label: string }[] = [
  { value: "home-cooked", label: "Home-cooked" },
  { value: "brought-to-office", label: "Brought" },
  { value: "cava", label: "Cava" },
  { value: "dads-cooking", label: "Dad's" },
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
  const [expanded, setExpanded] = useState(true);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(plannedMeal ?? null);
  const [selectedSource, setSelectedSource] = useState<MealSource | null>(null);
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState("");
  const [showMealPicker, setShowMealPicker] = useState(false);

  function handleLog(satisfaction: Satisfaction) {
    const source =
      selectedSource ??
      (isOfficeDay && slot === "lunch" ? "brought-to-office" : "home-cooked");

    addMealLog({
      id: `${toDateKey(new Date())}-${slot}-${Date.now()}`,
      date: toDateKey(new Date()),
      slot,
      mealId: selectedMeal?.id,
      description: !selectedMeal ? description || undefined : undefined,
      source,
      satisfaction,
      notes: notes || undefined,
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
            onClick={() => { setLogged(false); setExpanded(true); }}
            className="text-xs text-muted hover:text-foreground"
          >
            undo
          </button>
        </div>
        {selectedMeal && (
          <p className="mt-1 text-sm text-foreground/70">{selectedMeal.name}</p>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">{SLOT_LABELS[slot]}</span>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs text-muted hover:text-foreground"
        >
          {expanded ? "close" : "log"}
        </button>
      </div>

      {/* Suggestion when collapsed */}
      {!expanded && plannedMeal && (
        <Link
          href={`/meals/${plannedMeal.id}`}
          className="mt-1 text-sm text-foreground/70 hover:text-accent transition-colors block"
        >
          {plannedMeal.name} →
        </Link>
      )}

      {expanded && (
        <div className="mt-3 flex flex-col gap-3 border-t border-border pt-3">
          {/* What did you eat: suggestion + pick from library + freeform */}
          <div>
            <p className="text-xs font-medium text-muted mb-1.5">What did you eat?</p>

            {/* Suggested meal */}
            {plannedMeal && (
              <div className="flex items-center gap-2 mb-2">
                <button
                  onClick={() => { setSelectedMeal(plannedMeal); setShowMealPicker(false); }}
                  className={`rounded-full border px-2.5 py-1 text-xs transition-colors ${
                    selectedMeal?.id === plannedMeal.id
                      ? "border-accent bg-accent-light text-accent"
                      : "border-border hover:border-accent hover:text-accent"
                  }`}
                >
                  {plannedMeal.name}
                </button>
                <Link
                  href={`/meals/${plannedMeal.id}`}
                  className="text-xs text-accent hover:text-accent/80"
                >
                  recipe →
                </Link>
              </div>
            )}

            {/* Pick from library or freeform */}
            <div className="flex gap-1.5 mb-2">
              <button
                onClick={() => { setShowMealPicker(!showMealPicker); setSelectedMeal(null); }}
                className="text-xs text-muted hover:text-accent transition-colors"
              >
                {showMealPicker ? "hide list" : "pick from meals"}
              </button>
              {selectedMeal && (
                <button
                  onClick={() => { setSelectedMeal(null); setShowMealPicker(false); }}
                  className="text-xs text-muted hover:text-foreground transition-colors"
                >
                  | freeform
                </button>
              )}
            </div>

            {/* Meal picker */}
            {showMealPicker && (
              <div className="max-h-48 overflow-y-auto rounded-lg border border-border bg-background mb-2">
                {meals.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => { setSelectedMeal(m); setShowMealPicker(false); }}
                    className={`w-full text-left px-3 py-2 text-xs border-b border-border last:border-0 transition-colors ${
                      selectedMeal?.id === m.id
                        ? "bg-accent-light text-accent"
                        : "hover:bg-background"
                    }`}
                  >
                    <span className="font-medium">{m.name}</span>
                    <span className="text-muted ml-1">{m.prepMinutes}m</span>
                  </button>
                ))}
              </div>
            )}

            {/* Selected meal display */}
            {selectedMeal && !showMealPicker && selectedMeal.id !== plannedMeal?.id && (
              <div className="flex items-center gap-2 mb-2">
                <span className="rounded-full border border-accent bg-accent-light px-2.5 py-1 text-xs text-accent">
                  {selectedMeal.name}
                </span>
                <Link
                  href={`/meals/${selectedMeal.id}`}
                  className="text-xs text-accent hover:text-accent/80"
                >
                  recipe →
                </Link>
              </div>
            )}

            {/* Freeform description when no meal selected */}
            {!selectedMeal && (
              <input
                type="text"
                placeholder="What did you eat?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent"
              />
            )}
          </div>

          {/* Source */}
          <div>
            <p className="text-xs font-medium text-muted mb-1">Source</p>
            <div className="flex flex-wrap gap-1.5">
              {SOURCE_OPTIONS
                .filter((opt) => {
                  if (opt.value === "brought-to-office") return isOfficeDay;
                  return true;
                })
                .map((opt) => (
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

          {/* Notes */}
          <input
            type="text"
            placeholder="Notes (optional)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs outline-none focus:border-accent"
          />

          {/* Rate and log */}
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
