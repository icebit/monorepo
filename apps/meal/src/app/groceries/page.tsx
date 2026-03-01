import { Nav } from "@/components/nav";
import { GroceryList } from "@/components/grocery-list";

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
        />

        {Object.entries(PANTRY_STAPLES).map(([category, items]) => (
          <GroceryList
            key={category}
            title={`Pantry: ${category}`}
            items={items}
            storageKey={`grocery-pantry-${category}`}
          />
        ))}
      </main>
      <Nav />
    </>
  );
}
