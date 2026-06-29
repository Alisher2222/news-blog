"use client";

import { useEffect, useRef } from "react";
import { registerView } from "../actions";

// Fires a single view increment per mount. The ref guard prevents a double
// count from React Strict Mode's double-invoked effects in development.
export function ViewTracker({ id }: { id: string }) {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    registerView(id).catch(() => {});
  }, [id]);

  return null;
}
