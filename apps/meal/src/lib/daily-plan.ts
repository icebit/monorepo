import type { Meal } from "./types";
import { meals } from "./meals";

// Rotate meals deterministically based on date so each day shows different suggestions
function pickByDate(pool: Meal[], date: Date, offset: number = 0): Meal | undefined {
  if (pool.length === 0) return undefined;
  const daysSinceEpoch = Math.floor(date.getTime() / 86400000);
  const index = (daysSinceEpoch + offset) % pool.length;
  return pool[index];
}

const SMOOTHIES = meals.filter((m) => m.categories.includes("smoothie"));
const PORTABLE_LUNCHES = meals.filter(
  (m) =>
    m.portable &&
    !m.categories.includes("smoothie") &&
    (m.categories.includes("lunch") || m.categories.includes("flexible"))
);
const DINNERS = meals.filter(
  (m) =>
    !m.categories.includes("smoothie") &&
    !m.categories.includes("breakfast") &&
    (m.categories.includes("dinner") || m.categories.includes("flexible"))
);

export function getTodaysPlan(date: Date) {
  const smoothie = pickByDate(SMOOTHIES, date);
  const breakfast = meals.find((m) => m.id === "overnight-oats");
  const lunch = pickByDate(PORTABLE_LUNCHES, date, 3);
  const dinner = pickByDate(DINNERS, date, 7);

  return { smoothie, breakfast, lunch, dinner };
}
