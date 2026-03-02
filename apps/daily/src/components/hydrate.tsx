"use client";

import { hydrateFromBackend } from "@/lib/storage";
import { useEffect } from "react";

// Runs once on app load to pull backend data into localStorage
export function Hydrate() {
  useEffect(() => {
    hydrateFromBackend().then((updated) => {
      if (updated) {
        window.location.reload();
      }
    });
  }, []);

  return null;
}
