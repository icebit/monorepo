import { workouts } from "@/lib/workouts";
import { notFound } from "next/navigation";
import { WorkoutView } from "@/components/workout-view";

export function generateStaticParams() {
  return workouts.map((w) => ({ id: w.id }));
}

type Props = {
  params: Promise<{ id: string }>;
};

export default async function WorkoutPage({ params }: Props) {
  const { id } = await params;
  const workout = workouts.find((w) => w.id === id);
  if (!workout) notFound();

  return <WorkoutView workout={workout} />;
}
