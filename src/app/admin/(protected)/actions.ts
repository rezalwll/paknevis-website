"use server";

import { redirect } from "next/navigation";

import { endAdminSession } from "@/lib/admin-auth";

export async function logoutAdminAction() {
  await endAdminSession();
  redirect("/admin/login");
}
