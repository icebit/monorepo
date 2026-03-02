import { Nav } from "@/components/nav";
import { workouts, STRETCH_ROUTINE } from "@/lib/workouts";
import Link from "next/link";

export default function WorkoutListPage() {
  const strength = workouts.filter((w) => w.id.startsWith("strength"));
  const cardio = workouts.filter((w) => w.id.startsWith("cardio"));

  return (
    <>
      <main className="flex-1 px-4 py-6">
        <h1 className="text-2xl font-semibold tracking-tight mb-6">Workouts</h1>

        <section className="mb-6">
          <h2 className="text-xs font-medium text-muted uppercase tracking-wide mb-2">
            Strength
          </h2>
          <div className="flex flex-col gap-2">
            {strength.map((w) => (
              <Link
                key={w.id}
                href={`/workout/${w.id}`}
                className="rounded-xl border border-border bg-surface p-4 hover:border-accent transition-colors block"
              >
                <div className="flex items-start justify-between">
                  <p className="text-sm font-medium">{w.name}</p>
                  <span className="text-xs text-muted">{w.durationMinutes} min</span>
                </div>
                <p className="text-xs text-foreground/60 mt-1">{w.description}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-xs font-medium text-muted uppercase tracking-wide mb-2">
            Cardio
          </h2>
          <div className="flex flex-col gap-2">
            {cardio.map((w) => (
              <Link
                key={w.id}
                href={`/workout/${w.id}`}
                className="rounded-xl border border-border bg-surface p-4 hover:border-accent transition-colors block"
              >
                <div className="flex items-start justify-between">
                  <p className="text-sm font-medium">{w.name}</p>
                  <span className="text-xs text-muted">{w.durationMinutes} min</span>
                </div>
                <p className="text-xs text-foreground/60 mt-1">{w.description}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-xs font-medium text-muted uppercase tracking-wide mb-2">
            Post-Workout Stretch
          </h2>
          <div className="rounded-xl border border-border bg-surface divide-y divide-border">
            {STRETCH_ROUTINE.map((ex, i) => (
              <div key={i} className="px-4 py-3">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">{ex.name}</span>
                  <span className="text-xs text-muted">{ex.reps}</span>
                </div>
                <p className="text-xs text-foreground/60 mt-0.5">{ex.detail}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Nav />
    </>
  );
}
