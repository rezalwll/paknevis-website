"use client";

import { useActionState } from "react";

import { loginAdminAction } from "@/app/admin/login/actions";

type LoginActionState = {
  error: string;
};

const initialLoginActionState: LoginActionState = {
  error: "",
};

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(
    loginAdminAction,
    initialLoginActionState,
  );

  return (
    <form action={formAction} className="space-y-5">
      <div className="space-y-2">
        <label htmlFor="admin-identifier" className="block text-sm font-medium text-slate-700">
          ایمیل یا یوزرنیم
        </label>
        <input
          id="admin-identifier"
          name="identifier"
          type="text"
          autoComplete="username"
          required
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-right text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="admin-password" className="block text-sm font-medium text-slate-700">
          رمز عبور
        </label>
        <input
          id="admin-password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-right text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
        />
      </div>

      {state.error ? (
        <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{state.error}</p>
      ) : null}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-2xl bg-sky-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500"
      >
        {isPending ? "در حال ورود..." : "ورود به پنل"}
      </button>
    </form>
  );
}
