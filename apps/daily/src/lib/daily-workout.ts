import { workouts } from "./workouts";

// Simple rotation: strength A, cardio, rest, strength B, cardio, rest, rest
// But the user can always swap via the shuffle button
const WEEKLY_PATTERN = [
  "strength-upper",   // Monday
  "cardio-run",       // Tuesday
  null,               // Wednesday (rest)
  "strength-lower",   // Thursday
  "cardio-bike",      // Friday
  null,               // Saturday (rest)
  null,               // Sunday (rest)
] as const;

export function getTodaysWorkout(date: Date, seed: number = 0) {
  const dayOfWeek = date.getDay(); // 0=Sun, 1=Mon, ...
  // Map JS day (0=Sun) to our pattern (0=Mon)
  const patternIndex = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

  if (seed === 0) {
    const id = WEEKLY_PATTERN[patternIndex];
    if (!id) return null;
    return workouts.find((w) => w.id === id) ?? null;
  }

  // When shuffled, cycle through all workouts
  const allWorkouts = workouts;
  const index = (patternIndex + seed) % allWorkouts.length;
  return allWorkouts[index] ?? null;
}
