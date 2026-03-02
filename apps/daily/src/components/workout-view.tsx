"use client";

import type { Workout } from "@/lib/workouts";
import { STRETCH_ROUTINE } from "@/lib/workouts";
import { addWorkoutLog } from "@/lib/storage";
import { toDateKey } from "@/lib/utils";
import { useState, useEffect } from "react";
import Link from "next/link";

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
        // Wake lock failed
      }
    }
  }

  useEffect(() => {
    return () => { wakeLock?.release(); };
  }, [wakeLock]);

  return { active, toggle, supported: typeof navigator !== "undefined" && "wakeLock" in navigator };
}

type WorkoutViewProps = {
  workout: Workout;
};

export function WorkoutView({ workout }: WorkoutViewProps) {
  const { active, toggle, supported } = useWakeLock();
  const [checkedExercises, setCheckedExercises] = useState<Set<number>>(new Set());
  const [showStretch, setShowStretch] = useState(false);
  const [logged, setLogged] = useState(false);

  const allDone = checkedExercises.size === workout.exercises.length;

  function toggleExercise(index: number) {
    setCheckedExercises((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }

  function handleFinish() {
    addWorkoutLog({
      id: `workout-${Date.now()}`,
      date: toDateKey(new Date()),
      workoutId: workout.id,
      completed: true,
    });
    setLogged(true);
  }

  return (
    <main className="flex-1 px-4 py-6 pb-20">
      <Link
        href="/workout"
        className="text-xs text-muted hover:text-foreground mb-4 inline-block"
      >
        Back to workouts
      </Link>

      <div className="flex items-start justify-between gap-2 mb-1">
        <h1 className="text-2xl font-semibold tracking-tight">{workout.name}</h1>
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

      <p className="text-sm text-muted mb-2">{workout.description}</p>
      <p className="text-xs text-muted mb-6">{workout.durationMinutes} min</p>

      {/* Exercises */}
      <div className="flex flex-col gap-2 mb-6">
        {workout.exercises.map((ex, i) => {
          const done = checkedExercises.has(i);
          return (
            <button
              key={i}
              onClick={() => toggleExercise(i)}
              className={`text-left rounded-xl border p-4 transition-colors ${
                done
                  ? "border-accent/30 bg-accent-light/40"
                  : "border-border bg-surface"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className={`text-sm font-medium ${done ? "text-accent" : ""}`}>
                    {ex.name}
                  </p>
                  <p className="text-xs text-foreground/60 mt-1 leading-relaxed">
                    {ex.detail}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs text-muted">{ex.sets} x {ex.reps}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Notes */}
      <div className="rounded-xl border border-border bg-surface p-4 mb-6">
        <p className="text-xs text-foreground/60">{workout.notes}</p>
      </div>

      {/* Finish / Log */}
      {!logged ? (
        <button
          onClick={handleFinish}
          className={`w-full rounded-xl py-3 text-sm font-medium transition-colors ${
            allDone
              ? "bg-accent text-white shadow-lg hover:bg-accent/90"
              : "bg-accent/70 text-white/90"
          }`}
        >
          {allDone ? "Finish workout" : "Finish workout (some exercises unchecked)"}
        </button>
      ) : (
        <div className="rounded-xl border border-accent/30 bg-accent-light/40 p-4 text-center">
          <p className="text-sm font-medium text-accent">Workout logged</p>
        </div>
      )}

      {/* Stretch section */}
      <section className="mt-8">
        <button
          onClick={() => setShowStretch(!showStretch)}
          className="text-xs font-medium text-muted uppercase tracking-wide hover:text-foreground"
        >
          {showStretch ? "Hide stretch routine" : "Show stretch routine"}
        </button>
        {showStretch && (
          <div className="mt-3 rounded-xl border border-border bg-surface divide-y divide-border">
            {STRETCH_ROUTINE.map((ex, i) => (
              <div key={i} className="px-4 py-3">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">{ex.name}</span>
                  <span className="text-xs text-muted">{ex.reps}</span>
                </div>
                <p className="text-xs text-foreground/60 mt-0.5">{ex.detail}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
