"use client";

import { loadData, saveData } from "@/lib/storage";
import { toDateKey } from "@/lib/utils";
import { useState } from "react";

export function DayClearButtons() {
  const [confirm, setConfirm] = useState<"today" | "all" | null>(null);

  function clearToday() {
    const data = loadData();
    const todayKey = toDateKey(new Date());
    data.mealLogs = data.mealLogs.filter((log) => log.date !== todayKey);
    saveData(data);
    window.location.reload();
  }

  function clearAll() {
    localStorage.clear();
    window.location.reload();
  }

  return (
    <section className="mt-8 flex flex-col gap-2">
      {confirm === null && (
        <div className="flex gap-2">
          <button
            onClick={() => setConfirm("today")}
            className="text-xs text-muted hover:text-foreground transition-colors"
          >
            Clear today's logs
          </button>
          <span className="text-xs text-border">|</span>
          <button
            onClick={() => setConfirm("all")}
            className="text-xs text-muted hover:text-foreground transition-colors"
          >
            Clear all data
          </button>
        </div>
      )}

      {confirm === "today" && (
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted">Clear today's meal logs?</span>
          <button
            onClick={clearToday}
            className="text-xs font-medium text-red-600 hover:text-red-700"
          >
            Yes, clear
          </button>
          <button
            onClick={() => setConfirm(null)}
            className="text-xs text-muted hover:text-foreground"
          >
            Cancel
          </button>
        </div>
      )}

      {confirm === "all" && (
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted">
            Clear all data? This can't be undone.
          </span>
          <button
            onClick={clearAll}
            className="text-xs font-medium text-red-600 hover:text-red-700"
          >
            Yes, clear everything
          </button>
          <button
            onClick={() => setConfirm(null)}
            className="text-xs text-muted hover:text-foreground"
          >
            Cancel
          </button>
        </div>
      )}
    </section>
  );
}
