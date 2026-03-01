"use client";

import { Nav } from "@/components/nav";
import { GroceryList } from "@/components/grocery-list";
import { addGroceryTrip } from "@/lib/storage";
import { toDateKey } from "@/lib/utils";
import { useState, useCallback, useRef } from "react";

const WEEKLY_BUY = [
  "Onions",
  "Garlic",
  "Ginger",
  "Lemons/limes",
  "Cilantro",
  "Spinach/kale",
  "Bananas",
  "Seasonal roasting veg",
  "Oat milk",
  "Chicken thighs (skinless)",
  "Salmon or other fish",
  "Firm tofu",
  "Eggs",
];

const PANTRY_STAPLES: Record<string, string[]> = {
  "Dry Goods": [
    "Red lentils",
    "Green/brown lentils",
    "Rolled oats",
    "Brown rice",
    "Quinoa",
    "Whole wheat wraps",
    "Chia seeds",
    "Ground flax seeds",
    "Protein powder",
    "Almonds, walnuts, cashews",
  ],
  "Canned / Jarred": [
    "Chickpeas (several cans)",
    "Black beans",
    "Kidney beans",
    "Canned diced tomatoes",
    "Light coconut milk",
    "Canned tuna",
    "Tahini",
    "Almond butter",
  ],
  Frozen: [
    "Frozen spinach",
    "Frozen mixed berries",
    "Frozen mango chunks",
    "Frozen bananas",
    "Frozen whole wheat naan",
    "Frozen edamame",
    "Frozen mixed vegetables",
  ],
  Spices: [
    "Cumin (ground + whole)",
    "Coriander",
    "Turmeric",
    "Garam masala",
    "Kashmiri chili powder",
    "Mustard seeds",
    "Cardamom",
    "Smoked paprika",
  ],
};

export default function GroceriesPage() {
  const [tripSaved, setTripSaved] = useState(false);
  // Accumulate all checked items across lists
  const checkedItems = useRef<Record<string, string[]>>({});

  const handleCheckedChange = useCallback(
    (key: string) => (items: string[]) => {
      checkedItems.current[key] = items;
    },
    []
  );

  function finishTrip() {
    const allChecked = Object.values(checkedItems.current).flat();
    if (allChecked.length === 0) return;

    addGroceryTrip({
      id: `trip-${Date.now()}`,
      date: toDateKey(new Date()),
      items: allChecked.map((name) => ({
        id: `item-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        name,
        isPantryStaple: !WEEKLY_BUY.includes(name),
        checked: true,
      })),
    });

    // Clear all grocery checklists
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("grocery-")) {
        localStorage.removeItem(key);
      }
    });

    setTripSaved(true);
  }

  if (tripSaved) {
    return (
      <>
        <main className="flex-1 px-4 py-6 flex flex-col items-center justify-center">
          <div className="text-center">
            <p className="text-lg font-semibold">Trip logged</p>
            <p className="text-sm text-muted mt-1">
              Checked items saved. Lists cleared for next trip.
            </p>
            <button
              onClick={() => setTripSaved(false)}
              className="mt-4 rounded-full border border-border px-4 py-2 text-sm hover:border-accent hover:text-accent transition-colors"
            >
              Back to lists
            </button>
          </div>
        </main>
        <Nav />
      </>
    );
  }

  return (
    <>
      <main className="flex-1 px-4 py-6">
        <h1 className="text-2xl font-semibold tracking-tight mb-6">
          Groceries
        </h1>

        <GroceryList
          title="Weekly Buy"
          items={WEEKLY_BUY}
          storageKey="grocery-weekly"
          onCheckedChange={handleCheckedChange("weekly")}
        />

        {Object.entries(PANTRY_STAPLES).map(([category, items]) => (
          <GroceryList
            key={category}
            title={`Pantry: ${category}`}
            items={items}
            storageKey={`grocery-pantry-${category}`}
            onCheckedChange={handleCheckedChange(category)}
          />
        ))}
      </main>

      {/* Sticky finish button at bottom, above nav */}
      <div className="sticky bottom-12 px-4 pb-3">
        <button
          onClick={finishTrip}
          className="w-full rounded-xl bg-accent py-3 text-sm font-medium text-white shadow-lg hover:bg-accent/90 transition-colors"
        >
          Finish trip — save checked items
        </button>
      </div>
      <Nav />
    </>
  );
}
