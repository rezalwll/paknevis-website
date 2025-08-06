import { ensureAppSchema, getDb } from "@/lib/db";
import type { DashboardAnalyticsSummary } from "@/lib/admin-types";

const TRACKED_DAYS = 7;
const BOT_USER_AGENT_PATTERN =
  /bot|crawler|spider|lighthouse|headlesschrome|slurp|bingpreview|facebookexternalhit|telegrambot/i;

type PageViewSummaryRow = {
  today_views: number | null;
  last_7_days_views: number | null;
};

type TopPageRow = {
  path: string;
  views: number;
};

type TrendRow = {
  date: string;
  views: number;
};

export function normalizeTrackedPath(value: string): string | null {
  const trimmed = value.trim();

  if (!trimmed.startsWith("/")) {
    return null;
  }

  const normalizedPath = trimmed.split(/[?#]/, 1)[0] || "/";

  if (normalizedPath.startsWith("/admin") || normalizedPath.startsWith("/api")) {
    return null;
  }

  return normalizedPath;
}

export function isLikelyBotUserAgent(userAgent: string | null): boolean {
  if (!userAgent) {
    return false;
  }

  return BOT_USER_AGENT_PATTERN.test(userAgent);
}

export async function recordPageView(path: string): Promise<void> {
  await ensureAppSchema();

  await getDb().query(
    `
      INSERT INTO page_views (path, view_date, count)
      VALUES ($1, CURRENT_DATE, 1)
      ON CONFLICT (path, view_date)
      DO UPDATE SET count = page_views.count + 1
    `,
    [path],
  );
}

export async function getDashboardAnalyticsSummary(): Promise<DashboardAnalyticsSummary> {
  await ensureAppSchema();

  const [summaryResult, topPagesResult, trendResult] = await Promise.all([
    getDb().query<PageViewSummaryRow>(
      `
        SELECT
          COALESCE(SUM(count) FILTER (WHERE view_date = CURRENT_DATE), 0)::int AS today_views,
          COALESCE(
            SUM(count) FILTER (
              WHERE view_date BETWEEN CURRENT_DATE - INTERVAL '6 days' AND CURRENT_DATE
            ),
            0
          )::int AS last_7_days_views
        FROM page_views
      `,
    ),
    getDb().query<TopPageRow>(
      `
        SELECT path, SUM(count)::int AS views
        FROM page_views
        WHERE view_date BETWEEN CURRENT_DATE - INTERVAL '6 days' AND CURRENT_DATE
        GROUP BY path
        ORDER BY views DESC, path ASC
        LIMIT 5
      `,
    ),
    getDb().query<TrendRow>(
      `
        SELECT
          series.day::date::text AS date,
          COALESCE(SUM(page_views.count), 0)::int AS views
        FROM generate_series(
          CURRENT_DATE - INTERVAL '6 days',
          CURRENT_DATE,
          INTERVAL '1 day'
        ) AS series(day)
        LEFT JOIN page_views
          ON page_views.view_date = series.day::date
        GROUP BY series.day
        ORDER BY series.day ASC
      `,
    ),
  ]);

  const summaryRow = summaryResult.rows[0];
  const dailyTrend = trendResult.rows.map((row) => ({
    date: row.date,
    views: row.views,
  }));

  if (dailyTrend.length < TRACKED_DAYS) {
    return {
      todayViews: summaryRow?.today_views ?? 0,
      last7DaysViews: summaryRow?.last_7_days_views ?? 0,
      topPages: topPagesResult.rows,
      dailyTrend,
    };
  }

  return {
    todayViews: summaryRow?.today_views ?? 0,
    last7DaysViews: summaryRow?.last_7_days_views ?? 0,
    topPages: topPagesResult.rows,
    dailyTrend,
  };
}
