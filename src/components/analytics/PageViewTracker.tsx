"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

type TrackerWindow = Window & {
  __paknevisLastTrackedPath__?: string;
  __paknevisLastTrackedAt__?: number;
};

const TRACK_DEDUPE_WINDOW_MS = 1500;

function sendPageView(path: string) {
  const payload = JSON.stringify({ path });

  if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
    const blob = new Blob([payload], { type: "application/json" });
    const queued = navigator.sendBeacon("/api/analytics/page-view", blob);

    if (queued) {
      return;
    }
  }

  void fetch("/api/analytics/page-view", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: payload,
    keepalive: true,
  }).catch(() => undefined);
}

export default function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname || document.visibilityState !== "visible") {
      return;
    }

    const trackerWindow = window as TrackerWindow;
    const now = Date.now();

    if (
      trackerWindow.__paknevisLastTrackedPath__ === pathname &&
      now - (trackerWindow.__paknevisLastTrackedAt__ ?? 0) < TRACK_DEDUPE_WINDOW_MS
    ) {
      return;
    }

    trackerWindow.__paknevisLastTrackedPath__ = pathname;
    trackerWindow.__paknevisLastTrackedAt__ = now;

    sendPageView(pathname);
  }, [pathname]);

  return null;
}
