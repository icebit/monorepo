export type MealCategory =
  | "smoothie"
  | "breakfast"
  | "lunch"
  | "dinner"
  | "flexible";

export type MealSource =
  | "home-cooked"
  | "brought-to-office"
  | "cava"
  | "dads-cooking"
  | "restaurant"
  | "other";

export type Satisfaction = "great" | "fine" | "not-great";

export type PrepFormat =
  | "batch-session"
  | "quick-daily"
  | "smoothie"
  | "assembly-only";

export type DayOfWeek =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export type Ingredient = {
  item: string;
  amount: string;
  note?: string;
};

// The core meal template, seeded from archetypes
export type Meal = {
  id: string;
  name: string;
  description: string;
  ingredients: Ingredient[];
  steps: string[];
  servings: number;
  categories: MealCategory[];
  prepMinutes: number;
  batchFriendly: boolean;
  portable: boolean;
  onePot: boolean;
  notes: string;
};

// A planned meal for a specific day and slot
export type PlannedMeal = {
  id: string;
  date: string; // YYYY-MM-DD
  slot: "smoothie" | "breakfast" | "lunch" | "dinner" | "snack";
  mealId: string;
  prepNotes?: string;
};

// What actually happened
export type MealLog = {
  id: string;
  date: string;
  slot: "smoothie" | "breakfast" | "lunch" | "dinner" | "snack";
  mealId?: string; // linked to a known meal, or null for ad hoc
  description?: string; // free text for ad hoc meals
  source: MealSource;
  satisfaction: Satisfaction;
  notes?: string;
};

// Tracking prep activity
export type PrepLog = {
  id: string;
  date: string;
  mealsPrepped: string[]; // meal IDs
  minutesSpent: number;
  format: PrepFormat;
  notes?: string;
};

// Grocery tracking
export type GroceryItem = {
  id: string;
  name: string;
  isPantryStaple: boolean;
  checked: boolean;
};

export type GroceryTrip = {
  id: string;
  date: string;
  store?: string;
  items: GroceryItem[];
  notes?: string;
};

export type WorkoutLog = {
  id: string;
  date: string;
  workoutId: string;
  completed: boolean;
  notes?: string;
};
