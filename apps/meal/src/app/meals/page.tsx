import { Nav } from "@/components/nav";
import { meals } from "@/lib/meals";

export default function MealsPage() {
  const grouped = {
    smoothie: meals.filter((m) => m.categories.includes("smoothie")),
    indian: meals.filter(
      (m) =>
        !m.categories.includes("smoothie") &&
        ["red-lentil-dal", "chana-masala", "chicken-rogan-josh", "palak-dal", "rajma", "tofu-tikka-masala"].includes(m.id)
    ),
    mediterranean: meals.filter((m) =>
      ["grain-bowl", "mediterranean-lentil-soup", "shakshuka", "hummus-wrap"].includes(m.id)
    ),
    fish: meals.filter((m) =>
      ["baked-salmon-sheet-pan", "goan-fish-curry", "fish-grain-bowl"].includes(m.id)
    ),
    quick: meals.filter((m) =>
      ["overnight-oats", "bean-grain-scramble", "dal-naan-emergency", "loaded-sweet-potato"].includes(m.id)
    ),
  };

  const sections = [
    { label: "Smoothies", meals: grouped.smoothie },
    { label: "Indian", meals: grouped.indian },
    { label: "Mediterranean", meals: grouped.mediterranean },
    { label: "Fish", meals: grouped.fish },
    { label: "Quick / Emergency", meals: grouped.quick },
  ];

  return (
    <>
      <main className="flex-1 px-4 py-6">
        <h1 className="text-2xl font-semibold tracking-tight mb-6">Meals</h1>
        {sections.map((section) => (
          <section key={section.label} className="mb-6">
            <h2 className="text-xs font-medium text-muted uppercase tracking-wide mb-2">
              {section.label}
            </h2>
            <div className="flex flex-col gap-2">
              {section.meals.map((meal) => (
                <div
                  key={meal.id}
                  className="rounded-xl border border-border bg-surface p-4"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium">{meal.name}</p>
                      <p className="text-xs text-muted mt-0.5">
                        {meal.prepMinutes} min
                        {meal.batchFriendly && " / batch-friendly"}
                        {meal.portable && " / portable"}
                        {meal.onePot && " / one-pot"}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-foreground/60 mt-2">
                    {meal.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>
      <Nav />
    </>
  );
}
