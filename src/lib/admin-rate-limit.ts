type AttemptState = {
  count: number;
  resetAt: number;
};

type GlobalRateLimitState = typeof globalThis & {
  __paknevisLoginRateLimit__?: Map<string, AttemptState>;
};

const globalRateLimit = globalThis as GlobalRateLimitState;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 5;

function getStore(): Map<string, AttemptState> {
  if (!globalRateLimit.__paknevisLoginRateLimit__) {
    globalRateLimit.__paknevisLoginRateLimit__ = new Map();
  }

  return globalRateLimit.__paknevisLoginRateLimit__;
}

function getState(key: string): AttemptState | null {
  const state = getStore().get(key);

  if (!state) {
    return null;
  }

  if (Date.now() > state.resetAt) {
    getStore().delete(key);
    return null;
  }

  return state;
}

export function getRemainingLoginCooldownSeconds(key: string): number {
  const state = getState(key);

  if (!state || state.count < MAX_ATTEMPTS) {
    return 0;
  }

  return Math.max(1, Math.ceil((state.resetAt - Date.now()) / 1000));
}

export function registerFailedLoginAttempt(key: string): void {
  const existing = getState(key);

  if (!existing) {
    getStore().set(key, {
      count: 1,
      resetAt: Date.now() + WINDOW_MS,
    });
    return;
  }

  getStore().set(key, {
    count: existing.count + 1,
    resetAt: existing.resetAt,
  });
}

export function clearFailedLoginAttempts(key: string): void {
  getStore().delete(key);
}
