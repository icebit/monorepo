"use client";

import { MealSlot } from "@/components/meal-slot";
import { Nav } from "@/components/nav";
import { DayClearButtons } from "@/components/day-clear-buttons";
import { getTodaysPlan } from "@/lib/daily-plan";
import { getTodaysWorkout } from "@/lib/daily-workout";
import { formatDate, isWeekday } from "@/lib/utils";
import { useState } from "react";
import Link from "next/link";

export default function DailyView() {
  const today = new Date();
  const officeDay = isWeekday(today);
  const [seed, setSeed] = useState(0);
  const plan = getTodaysPlan(today, seed);
  const workout = getTodaysWorkout(today, seed);

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

        {/* Workout */}
        {workout ? (
          <Link
            href={`/workout/${workout.id}`}
            className="rounded-xl border border-border bg-surface p-4 mb-4 hover:border-accent transition-colors block"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted uppercase tracking-wide">
                  Workout
                </p>
                <p className="text-sm font-medium mt-1">{workout.name} →</p>
              </div>
              <span className="text-xs text-muted">{workout.durationMinutes} min</span>
            </div>
          </Link>
        ) : (
          <div className="rounded-xl border border-border bg-surface p-4 mb-4">
            <p className="text-xs font-medium text-muted uppercase tracking-wide">
              Workout
            </p>
            <p className="text-sm text-muted mt-1">Rest day</p>
          </div>
        )}

        {/* Meals */}
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
