"use client";

import { Nav } from "@/components/nav";
import { exportData, loadData } from "@/lib/storage";
import { toDateKey } from "@/lib/utils";
import { useState } from "react";

export default function DataPage() {
  const [status, setStatus] = useState<string | null>(null);
  const data = loadData();
  const logCount = data.mealLogs.length;
  const tripCount = data.groceryTrips.length;
  const workoutCount = data.workoutLogs.length;

  async function handleExport() {
    const json = exportData();
    const filename = `meal-data-${toDateKey(new Date())}.json`;

    // Try native share (works on Android/mobile) with file attachment
    if (navigator.share && navigator.canShare) {
      const file = new File([json], filename, { type: "application/json" });
      const shareData = { files: [file] };

      if (navigator.canShare(shareData)) {
        try {
          await navigator.share(shareData);
          setStatus("Shared");
          return;
        } catch {
          // User cancelled or share failed, fall through to download
        }
      }
    }

    // Fallback: download as a file
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    setStatus("Downloaded");
  }

  return (
    <>
      <main className="flex-1 px-4 py-6">
        <h1 className="text-2xl font-semibold tracking-tight mb-6">Data</h1>

        <div className="flex flex-col gap-3">
          <div className="rounded-xl border border-border bg-surface p-4">
            <p className="text-sm font-medium">Meal logs</p>
            <p className="text-xs text-muted mt-0.5">
              {logCount} {logCount === 1 ? "entry" : "entries"}
            </p>
          </div>

          <div className="rounded-xl border border-border bg-surface p-4">
            <p className="text-sm font-medium">Grocery trips</p>
            <p className="text-xs text-muted mt-0.5">
              {tripCount} {tripCount === 1 ? "trip" : "trips"} logged
            </p>
          </div>

          <div className="rounded-xl border border-border bg-surface p-4">
            <p className="text-sm font-medium">Workouts</p>
            <p className="text-xs text-muted mt-0.5">
              {workoutCount} {workoutCount === 1 ? "session" : "sessions"} logged
            </p>
          </div>

          <button
            onClick={handleExport}
            className="rounded-xl border border-border bg-surface p-4 text-left hover:border-accent transition-colors"
          >
            <p className="text-sm font-medium">
              {status ? status : "Export data"}
            </p>
            <p className="text-xs text-muted mt-0.5">
              Share or download all logged data as JSON
            </p>
          </button>
        </div>
      </main>
      <Nav />
    </>
  );
}
