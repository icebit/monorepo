"use client";

import type { Meal, MealSource, Satisfaction } from "@/lib/types";
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

const ALT_SOURCE_OPTIONS: { value: MealSource; label: string }[] = [
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

// Two distinct flows:
// Planned meal exists: "Did you make this?" -> yes (rate it) / no (what instead?)
// No planned meal: pick source, describe what you ate, rate it

type SlotState =
  | { step: "idle" }
  | { step: "planned-confirm" }
  | { step: "planned-rate" }
  | { step: "ate-something-else" }
  | { step: "unplanned-log" }
  | { step: "done" };

export function MealSlot({ slot, plannedMeal, isOfficeDay }: MealSlotProps) {
  const [state, setState] = useState<SlotState>({ step: "idle" });
  const [selectedSource, setSelectedSource] = useState<MealSource | null>(null);
  const [description, setDescription] = useState("");

  function logPlannedMeal(satisfaction: Satisfaction) {
    const source: MealSource =
      isOfficeDay && slot === "lunch" ? "brought-to-office" : "home-cooked";
    addMealLog({
      id: `${toDateKey(new Date())}-${slot}-${Date.now()}`,
      date: toDateKey(new Date()),
      slot,
      mealId: plannedMeal?.id,
      source,
      satisfaction,
    });
    setState({ step: "done" });
  }

  function logAlternativeMeal(satisfaction: Satisfaction) {
    addMealLog({
      id: `${toDateKey(new Date())}-${slot}-${Date.now()}`,
      date: toDateKey(new Date()),
      slot,
      description: description || undefined,
      source: selectedSource ?? "other",
      satisfaction,
    });
    setState({ step: "done" });
  }

  const hint = getHint(slot, isOfficeDay, plannedMeal);

  if (state.step === "done") {
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
            onClick={() => setState({ step: "idle" })}
            className="text-xs text-muted hover:text-foreground"
          >
            undo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      {/* Header - always visible */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">{SLOT_LABELS[slot]}</span>
        <button
          onClick={() => {
            if (state.step === "idle") {
              setState({
                step: plannedMeal ? "planned-confirm" : "unplanned-log",
              });
            } else {
              setState({ step: "idle" });
            }
          }}
          className="text-xs text-muted hover:text-foreground"
        >
          {state.step === "idle" ? "log" : "close"}
        </button>
      </div>
      {plannedMeal && state.step === "idle" && (
        <Link
          href={`/meals/${plannedMeal.id}`}
          className="mt-1 text-sm text-foreground/70 hover:text-accent transition-colors block"
        >
          {plannedMeal.name} →
        </Link>
      )}
      {!plannedMeal && hint && state.step === "idle" && (
        <p className="mt-1 text-xs text-muted italic">{hint}</p>
      )}

      {/* Planned meal flow: confirm you made it */}
      {state.step === "planned-confirm" && plannedMeal && (
        <div className="mt-3 flex flex-col gap-3 border-t border-border pt-3">
          <div className="flex items-center justify-between">
            <p className="text-sm">
              Did you make <span className="font-medium">{plannedMeal.name}</span>?
            </p>
            <Link
              href={`/meals/${plannedMeal.id}`}
              className="text-xs text-accent hover:text-accent/80"
            >
              recipe →
            </Link>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setState({ step: "planned-rate" })}
              className="rounded-full border border-accent bg-accent-light px-3 py-1.5 text-xs font-medium text-accent"
            >
              Yes
            </button>
            <button
              onClick={() => setState({ step: "ate-something-else" })}
              className="rounded-full border border-border px-3 py-1.5 text-xs text-muted hover:border-foreground hover:text-foreground transition-colors"
            >
              No, something else
            </button>
            <button
              onClick={() => setState({ step: "idle" })}
              className="rounded-full border border-border px-3 py-1.5 text-xs text-muted hover:text-foreground transition-colors"
            >
              Skipped
            </button>
          </div>
        </div>
      )}

      {/* Planned meal flow: rate it */}
      {state.step === "planned-rate" && (
        <div className="mt-3 flex flex-col gap-2 border-t border-border pt-3">
          <p className="text-xs text-muted">How was it?</p>
          <div className="flex gap-1.5">
            {SATISFACTION_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => logPlannedMeal(opt.value)}
                className="rounded-full border border-border px-2.5 py-1 text-xs hover:border-accent hover:text-accent transition-colors"
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Ate something else instead of planned meal */}
      {state.step === "ate-something-else" && (
        <div className="mt-3 flex flex-col gap-3 border-t border-border pt-3">
          <div>
            <p className="text-xs font-medium text-muted mb-1">What instead?</p>
            <div className="flex flex-wrap gap-1.5">
              {ALT_SOURCE_OPTIONS.map((opt) => (
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
          {selectedSource && (
            <>
              <input
                type="text"
                placeholder="What did you eat? (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent"
              />
              <div>
                <p className="text-xs font-medium text-muted mb-1">
                  How was it?
                </p>
                <div className="flex gap-1.5">
                  {SATISFACTION_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => logAlternativeMeal(opt.value)}
                      className="rounded-full border border-border px-2.5 py-1 text-xs hover:border-accent hover:text-accent transition-colors"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* No planned meal: freeform log */}
      {state.step === "unplanned-log" && (
        <div className="mt-3 flex flex-col gap-3 border-t border-border pt-3">
          <div>
            <p className="text-xs font-medium text-muted mb-1">Source</p>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setSelectedSource("home-cooked")}
                className={`rounded-full border px-2.5 py-1 text-xs transition-colors ${
                  selectedSource === "home-cooked"
                    ? "border-accent bg-accent-light text-accent"
                    : "border-border hover:border-accent hover:text-accent"
                }`}
              >
                Home-cooked
              </button>
              {isOfficeDay && slot === "lunch" && (
                <button
                  onClick={() => setSelectedSource("brought-to-office")}
                  className={`rounded-full border px-2.5 py-1 text-xs transition-colors ${
                    selectedSource === "brought-to-office"
                      ? "border-accent bg-accent-light text-accent"
                      : "border-border hover:border-accent hover:text-accent"
                  }`}
                >
                  Brought to office
                </button>
              )}
              {ALT_SOURCE_OPTIONS.map((opt) => (
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
          {selectedSource && (
            <>
              <input
                type="text"
                placeholder="What did you eat? (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent"
              />
              <div>
                <p className="text-xs font-medium text-muted mb-1">
                  How was it?
                </p>
                <div className="flex gap-1.5">
                  {SATISFACTION_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => logAlternativeMeal(opt.value)}
                      className="rounded-full border border-border px-2.5 py-1 text-xs hover:border-accent hover:text-accent transition-colors"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
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
