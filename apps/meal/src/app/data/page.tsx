"use client";

import { Nav } from "@/components/nav";
import { exportData, loadData, addGroceryTrip } from "@/lib/storage";
import { toDateKey } from "@/lib/utils";
import { useState } from "react";

export default function DataPage() {
  const [copied, setCopied] = useState(false);
  const [loggedTrip, setLoggedTrip] = useState(false);

  function handleExport() {
    const json = exportData();
    navigator.clipboard.writeText(json).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function handleLogTrip() {
    addGroceryTrip({
      id: `trip-${Date.now()}`,
      date: toDateKey(new Date()),
      items: [],
    });
    setLoggedTrip(true);
  }

  const data = loadData();
  const logCount = data.mealLogs.length;
  const tripCount = data.groceryTrips.length;

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

          <button
            onClick={handleLogTrip}
            disabled={loggedTrip}
            className={`rounded-xl border p-4 text-left transition-colors ${
              loggedTrip
                ? "border-accent/30 bg-accent-light/40"
                : "border-border bg-surface hover:border-accent"
            }`}
          >
            <p className="text-sm font-medium">
              {loggedTrip ? "Grocery trip logged" : "I shopped today"}
            </p>
            <p className="text-xs text-muted mt-0.5">
              Tap to record a grocery trip timestamp
            </p>
          </button>

          <button
            onClick={handleExport}
            className="rounded-xl border border-border bg-surface p-4 text-left hover:border-accent transition-colors"
          >
            <p className="text-sm font-medium">
              {copied ? "Copied to clipboard" : "Export all data"}
            </p>
            <p className="text-xs text-muted mt-0.5">
              Copies JSON to clipboard for analysis sessions
            </p>
          </button>
        </div>
      </main>
      <Nav />
    </>
  );
}
