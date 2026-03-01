import { MealSlot } from "@/components/meal-slot";
import { Nav } from "@/components/nav";
import { DayClearButtons } from "@/components/day-clear-buttons";
import { getTodaysPlan } from "@/lib/daily-plan";
import { formatDate, isWeekday } from "@/lib/utils";

export default function DailyView() {
  const today = new Date();
  const officeDay = isWeekday(today);
  const plan = getTodaysPlan(today);

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

        <DayClearButtons />
      </main>
      <Nav />
    </>
  );
}
