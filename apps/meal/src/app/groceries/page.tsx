import { Nav } from "@/components/nav";

const PANTRY_STAPLES = {
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
} as const;

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

export default function GroceriesPage() {
  return (
    <>
      <main className="flex-1 px-4 py-6">
        <h1 className="text-2xl font-semibold tracking-tight mb-6">
          Groceries
        </h1>

        <section className="mb-8">
          <h2 className="text-xs font-medium text-muted uppercase tracking-wide mb-3">
            Weekly Buy
          </h2>
          <div className="rounded-xl border border-border bg-surface divide-y divide-border">
            {WEEKLY_BUY.map((item) => (
              <label
                key={item}
                className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-background transition-colors"
              >
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-border accent-accent"
                />
                <span className="text-sm">{item}</span>
              </label>
            ))}
          </div>
        </section>

        {Object.entries(PANTRY_STAPLES).map(([category, items]) => (
          <section key={category} className="mb-6">
            <h2 className="text-xs font-medium text-muted uppercase tracking-wide mb-2">
              Pantry: {category}
            </h2>
            <div className="rounded-xl border border-border bg-surface divide-y divide-border">
              {items.map((item) => (
                <label
                  key={item}
                  className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-background transition-colors"
                >
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-border accent-accent"
                  />
                  <span className="text-sm">{item}</span>
                </label>
              ))}
            </div>
          </section>
        ))}
      </main>
      <Nav />
    </>
  );
}
