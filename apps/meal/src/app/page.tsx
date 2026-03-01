import { MealSlot } from "@/components/meal-slot";
import { Nav } from "@/components/nav";
import { meals } from "@/lib/meals";
import { formatDate, isWeekday } from "@/lib/utils";

// Temporary: pick some default meals for today to show the UI working.
// This will be replaced by actual plan data from storage.
function getTodaysPlan() {
  const smoothie = meals.find((m) => m.id === "green-power-smoothie");
  const lunch = meals.find((m) => m.id === "grain-bowl");
  const dinner = meals.find((m) => m.id === "red-lentil-dal");

  return { smoothie, breakfast: undefined, lunch, dinner };
}

export default function DailyView() {
  const today = new Date();
  const officeDay = isWeekday(today);
  const plan = getTodaysPlan();

  return (
    <>
      <main className="flex-1 px-4 py-6">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight">
            {formatDate(today)}
          </h1>
          {officeDay && (
            <p className="text-sm text-muted mt-1">Office day</p>
          )}
        </header>

        <div className="flex flex-col gap-3">
          <MealSlot
            slot="smoothie"
            plannedMeal={plan.smoothie}
            isOfficeDay={officeDay}
          />
          <MealSlot
            slot="breakfast"
            plannedMeal={plan.breakfast}
            isOfficeDay={officeDay}
          />
          <MealSlot
            slot="lunch"
            plannedMeal={plan.lunch}
            isOfficeDay={officeDay}
          />
          <MealSlot
            slot="dinner"
            plannedMeal={plan.dinner}
            isOfficeDay={officeDay}
          />
        </div>

        <section className="mt-8">
          <h2 className="text-sm font-medium text-muted mb-3">Prep tonight</h2>
          <div className="rounded-xl border border-border bg-surface p-4">
            <p className="text-sm">
              No prep tasks yet. Plan your week to see prep reminders here.
            </p>
          </div>
        </section>
      </main>
      <Nav />
    </>
  );
}
