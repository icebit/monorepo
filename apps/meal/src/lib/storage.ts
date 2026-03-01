import type { MealLog, GroceryTrip } from "./types";

// All app data in one shape for easy export/import
export type AppData = {
  mealLogs: MealLog[];
  groceryTrips: GroceryTrip[];
  version: number;
};

const STORAGE_KEY = "meal-app-data";
const CURRENT_VERSION = 1;

function defaultData(): AppData {
  return { mealLogs: [], groceryTrips: [], version: CURRENT_VERSION };
}

export function loadData(): AppData {
  if (typeof window === "undefined") return defaultData();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultData();
    return JSON.parse(raw) as AppData;
  } catch {
    return defaultData();
  }
}

export function saveData(data: AppData): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
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
