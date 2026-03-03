"use client";

import { Nav } from "@/components/nav";
import { loadData, saveData } from "@/lib/storage";
import { meals } from "@/lib/meals";
import { workouts } from "@/lib/workouts";
import type { MealLog, WorkoutLog, GroceryTrip } from "@/lib/types";
import { useState } from "react";

type DayEntry = {
  date: string;
  mealLogs: MealLog[];
  workoutLogs: WorkoutLog[];
  groceryTrips: GroceryTrip[];
};

function groupByDate(data: ReturnType<typeof loadData>): DayEntry[] {
  const dateMap = new Map<string, DayEntry>();

  function ensureDay(date: string): DayEntry {
    if (!dateMap.has(date)) {
      dateMap.set(date, { date, mealLogs: [], workoutLogs: [], groceryTrips: [] });
    }
    return dateMap.get(date)!;
  }

  for (const log of data.mealLogs) ensureDay(log.date).mealLogs.push(log);
  for (const log of data.workoutLogs) ensureDay(log.date).workoutLogs.push(log);
  for (const trip of data.groceryTrips) ensureDay(trip.date).groceryTrips.push(trip);

  return [...dateMap.values()].sort((a, b) => b.date.localeCompare(a.date));
}

function formatDateLabel(dateStr: string): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}`;
}

function getMealName(mealId?: string): string {
  if (!mealId) return "Ad hoc meal";
  return meals.find((m) => m.id === mealId)?.name ?? mealId;
}

function getWorkoutName(workoutId: string): string {
  return workouts.find((w) => w.id === workoutId)?.name ?? workoutId;
}

export default function HistoryPage() {
  const [data, setData] = useState(loadData);
  const days = groupByDate(data);

  function deleteMealLog(id: string) {
    const updated = { ...data, mealLogs: data.mealLogs.filter((l) => l.id !== id) };
    saveData(updated);
    setData(updated);
  }

  function deleteWorkoutLog(id: string) {
    const updated = { ...data, workoutLogs: data.workoutLogs.filter((l) => l.id !== id) };
    saveData(updated);
    setData(updated);
  }

  function deleteGroceryTrip(id: string) {
    const updated = { ...data, groceryTrips: data.groceryTrips.filter((t) => t.id !== id) };
    saveData(updated);
    setData(updated);
  }

  function cycleSatisfaction(logId: string) {
    const order = ["great", "fine", "not-great"] as const;
    const updated = {
      ...data,
      mealLogs: data.mealLogs.map((l) => {
        if (l.id !== logId) return l;
        const current = order.indexOf(l.satisfaction);
        const next = order[(current + 1) % order.length];
        return { ...l, satisfaction: next };
      }),
    };
    saveData(updated);
    setData(updated);
  }

  if (days.length === 0) {
    return (
      <>
        <main className="flex-1 px-4 py-6">
          <h1 className="text-2xl font-semibold tracking-tight mb-6">History</h1>
          <p className="text-sm text-muted">No data yet. Start logging meals and workouts.</p>
        </main>
        <Nav />
      </>
    );
  }

  return (
    <>
      <main className="flex-1 px-4 py-6">
        <h1 className="text-2xl font-semibold tracking-tight mb-6">History</h1>

        <div className="flex flex-col gap-6">
          {days.map((day) => (
            <section key={day.date}>
              <h2 className="text-sm font-semibold text-muted mb-2">
                {formatDateLabel(day.date)}
              </h2>
              <div className="flex flex-col gap-2">
                {/* Workout logs */}
                {day.workoutLogs.map((log) => (
                  <div
                    key={log.id}
                    className="rounded-xl border border-border bg-surface p-3"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-xs text-muted uppercase tracking-wide">Workout</p>
                        <p className="text-sm font-medium mt-0.5">
                          {getWorkoutName(log.workoutId)}
                        </p>
                        {log.notes && (
                          <p className="text-xs text-muted mt-1">{log.notes}</p>
                        )}
                      </div>
                      <button
                        onClick={() => deleteWorkoutLog(log.id)}
                        className="text-xs text-muted hover:text-red-600 transition-colors"
                      >
                        delete
                      </button>
                    </div>
                  </div>
                ))}

                {/* Meal logs */}
                {day.mealLogs.map((log) => (
                  <div
                    key={log.id}
                    className="rounded-xl border border-border bg-surface p-3"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-xs text-muted uppercase tracking-wide">
                          {log.slot}
                        </p>
                        <p className="text-sm font-medium mt-0.5">
                          {log.mealId ? getMealName(log.mealId) : log.description ?? "Unspecified"}
                        </p>
                        <div className="flex gap-2 mt-1">
                          <span className="text-xs text-muted">
                            {log.source.replace("-", " ")}
                          </span>
                          <button
                            onClick={() => cycleSatisfaction(log.id)}
                            className="text-xs text-muted hover:text-accent transition-colors"
                          >
                            {log.satisfaction}
                          </button>
                        </div>
                        {log.notes && (
                          <p className="text-xs text-muted mt-1">{log.notes}</p>
                        )}
                      </div>
                      <button
                        onClick={() => deleteMealLog(log.id)}
                        className="text-xs text-muted hover:text-red-600 transition-colors"
                      >
                        delete
                      </button>
                    </div>
                  </div>
                ))}

                {/* Grocery trips */}
                {day.groceryTrips.map((trip) => (
                  <div
                    key={trip.id}
                    className="rounded-xl border border-border bg-surface p-3 flex items-start justify-between"
                  >
                    <div>
                      <p className="text-xs text-muted uppercase tracking-wide">
                        Grocery Trip
                      </p>
                      <p className="text-sm mt-0.5">
                        {trip.items.length} {trip.items.length === 1 ? "item" : "items"}
                        {trip.store && ` at ${trip.store}`}
                      </p>
                      {trip.items.length > 0 && (
                        <p className="text-xs text-muted mt-1">
                          {trip.items.map((i) => i.name).join(", ")}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => deleteGroceryTrip(trip.id)}
                      className="text-xs text-muted hover:text-red-600 transition-colors"
                    >
                      delete
                    </button>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
      <Nav />
    </>
  );
}
