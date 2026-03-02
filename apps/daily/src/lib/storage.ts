import type { MealLog, GroceryTrip, WorkoutLog } from "./types";

export type AppData = {
  mealLogs: MealLog[];
  groceryTrips: GroceryTrip[];
  workoutLogs: WorkoutLog[];
  version: number;
};

const STORAGE_KEY = "meal-app-data";
const CURRENT_VERSION = 2;

function defaultData(): AppData {
  return {
    mealLogs: [],
    groceryTrips: [],
    workoutLogs: [],
    version: CURRENT_VERSION,
  };
}

export function loadData(): AppData {
  if (typeof window === "undefined") return defaultData();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultData();
    const data = JSON.parse(raw) as AppData;
    if (!data.workoutLogs) data.workoutLogs = [];
    return data;
  } catch {
    return defaultData();
  }
}

export function saveData(data: AppData): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  syncToBackend(data);
}

export function addMealLog(log: MealLog): void {
  const data = loadData();
  data.mealLogs.push(log);
  saveData(data);
}

export function addGroceryTrip(trip: GroceryTrip): void {
  const data = loadData();
  data.groceryTrips.push(trip);
  saveData(data);
}

export function addWorkoutLog(log: WorkoutLog): void {
  const data = loadData();
  data.workoutLogs.push(log);
  saveData(data);
}

export function exportData(): string {
  return JSON.stringify(loadData(), null, 2);
}

export function importData(json: string): void {
  const data = JSON.parse(json) as AppData;
  if (!data.version || !data.mealLogs) {
    throw new Error("Invalid data format");
  }
  saveData(data);
}

// Sync localStorage to backend (fire-and-forget)
function syncToBackend(data: AppData): void {
  fetch("/api/data", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).catch(() => {
    // Backend unavailable (local dev without KV, offline, etc.)
  });
}

// Pull from backend and merge into localStorage.
// Called once on app load to hydrate.
export async function hydrateFromBackend(): Promise<boolean> {
  try {
    const res = await fetch("/api/data");
    if (res.status === 204 || !res.ok) return false;

    const remote = (await res.json()) as AppData;
    if (!remote || !remote.version) return false;

    const local = loadData();

    const localTotal =
      local.mealLogs.length + local.groceryTrips.length + local.workoutLogs.length;
    const remoteTotal =
      (remote.mealLogs?.length ?? 0) +
      (remote.groceryTrips?.length ?? 0) +
      (remote.workoutLogs?.length ?? 0);

    // Whichever has more data wins (simple single-user merge)
    if (remoteTotal > localTotal) {
      if (!remote.workoutLogs) remote.workoutLogs = [];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(remote));
      return true;
    }

    if (localTotal > remoteTotal) {
      syncToBackend(local);
    }

    return false;
  } catch {
    return false;
  }
}
