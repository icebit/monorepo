import { meals } from "@/lib/meals";
import { notFound } from "next/navigation";
import { RecipeView } from "@/components/recipe-view";

export function generateStaticParams() {
  return meals.map((meal) => ({ id: meal.id }));
}

type Props = {
  params: Promise<{ id: string }>;
};

export default async function RecipePage({ params }: Props) {
  const { id } = await params;
  const meal = meals.find((m) => m.id === id);
  if (!meal) notFound();

  return <RecipeView meal={meal} />;
}
