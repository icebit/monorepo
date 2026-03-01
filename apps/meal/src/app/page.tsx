"use client";

import { MealSlot } from "@/components/meal-slot";
import { Nav } from "@/components/nav";
import { DayClearButtons } from "@/components/day-clear-buttons";
import { getTodaysPlan } from "@/lib/daily-plan";
import { formatDate, isWeekday } from "@/lib/utils";
import { useState } from "react";

export default function DailyView() {
  const today = new Date();
  const officeDay = isWeekday(today);
  const [seed, setSeed] = useState(0);
  const plan = getTodaysPlan(today, seed);

  return (
    <>
      <main className="flex-1 px-4 py-6">
        <header className="mb-6 flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              {formatDate(today)}
            </h1>
            {officeDay && (
              <p className="text-sm text-muted mt-1">Office day</p>
            )}
          </div>
          <button
            onClick={() => setSeed((s) => s + 1)}
            className="text-xs text-muted hover:text-accent transition-colors mt-1"
          >
            shuffle
          </button>
        </header>

        <div className="flex flex-col gap-3">
          <MealSlot
            key={`smoothie-${seed}`}
            slot="smoothie"
            plannedMeal={plan.smoothie}
            isOfficeDay={officeDay}
          />
          <MealSlot
            key={`breakfast-${seed}`}
            slot="breakfast"
            plannedMeal={plan.breakfast}
            isOfficeDay={officeDay}
          />
          <MealSlot
            key={`lunch-${seed}`}
            slot="lunch"
            plannedMeal={plan.lunch}
            isOfficeDay={officeDay}
          />
          <MealSlot
            key={`dinner-${seed}`}
            slot="dinner"
            plannedMeal={plan.dinner}
            isOfficeDay={officeDay}
          />
        </div>

        <DayClearButtons />
      </main>
      <Nav />
    </>
  );
}
