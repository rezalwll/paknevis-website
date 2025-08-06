import { redirect } from "next/navigation";
import Image from "next/image";

import { LoginForm } from "@/components/admin/LoginForm";
import { getCurrentAdminUser } from "@/lib/admin-auth";

export default async function AdminLoginPage() {
  const currentUser = await getCurrentAdminUser();

  if (currentUser) {
    redirect("/admin");
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[radial-gradient(circle_at_top,_#dbeafe,_#f8fafc_48%,_#e2e8f0_100%)] px-4 py-10"
    >
      <div className="mx-auto grid min-h-[85vh] max-w-xl items-center gap-8">
        <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-300/30">
          <div className="mb-6 flex items-center justify-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/70 px-4 py-3">
            <Image
              src="/mainlogo.png"
              alt="لوگوی پاک‌نویس"
              width={36}
              height={36}
              className="h-9 w-9 object-contain"
              priority
            />
            <p className="text-base font-semibold text-slate-800">پنل مدیریت پاک‌نویس</p>
          </div>
          <div className="mb-6 text-right">
            <h2 className="text-2xl font-semibold text-slate-900">ورود مدیر</h2>
            <p className="mt-2 text-sm leading-7 text-slate-500">
              برای مشاهده پیام‌های کاربران با حساب ادمین وارد شوید.
            </p>
          </div>
          <LoginForm />
        </section>
      </div>
    </main>
  );
}
