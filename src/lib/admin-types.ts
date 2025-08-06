export const ADMIN_ROLES = [
  "super_admin",
  "support_manager",
  "support_agent",
] as const;

export type AdminRole = (typeof ADMIN_ROLES)[number];

export const MESSAGE_STATUSES = [
  "new",
  "in_progress",
  "resolved",
  "archived",
] as const;

export type MessageStatus = (typeof MESSAGE_STATUSES)[number];

export const HELP_ICON_KEYS = [
  "user",
  "credit_card",
  "file_warning",
  "laptop",
  "help_circle",
  "building",
] as const;

export type HelpIconKey = (typeof HELP_ICON_KEYS)[number];

export const ADMIN_ROLE_LABELS: Record<AdminRole, string> = {
  super_admin: "مدیر سایت",
  support_manager: "مدیر پشتیبانی",
  support_agent: "کارشناس پشتیبانی",
};

export const MESSAGE_STATUS_LABELS: Record<MessageStatus, string> = {
  new: "جدید",
  in_progress: "در حال پیگیری",
  resolved: "پاسخ داده شده",
  archived: "بایگانی",
};

export const MESSAGE_STATUS_STYLES: Record<MessageStatus, string> = {
  new: "bg-sky-100 text-sky-700",
  in_progress: "bg-amber-100 text-amber-800",
  resolved: "bg-emerald-100 text-emerald-700",
  archived: "bg-slate-200 text-slate-700",
};

export const HELP_ICON_LABELS: Record<HelpIconKey, string> = {
  user: "کاربر",
  credit_card: "پرداخت",
  file_warning: "هشدار فایل",
  laptop: "دستگاه",
  help_circle: "راهنما",
  building: "سازمان",
};

export type AuthenticatedAdminUser = {
  id: number;
  email: string;
  username: string;
  fullName: string;
  role: AdminRole;
};

export type AdminUserSummary = {
  id: number;
  email: string;
  username: string;
  fullName: string;
  role: AdminRole;
  isActive: boolean;
  lastLoginAt: string | null;
  createdAt: string;
};

export type ContactMessageListItem = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  status: MessageStatus;
  assignedTo: number | null;
  assignedToName: string | null;
  readAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type ContactMessageDetails = ContactMessageListItem;

export type ContactMessageListFilters = {
  page: number;
  pageSize: number;
  search: string;
  status: string;
  assignedTo: string;
};

export type ContactMessageListResult = {
  items: ContactMessageListItem[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
};

export type MessageDashboardCounts = {
  totalCount: number;
  newCount: number;
  inProgressCount: number;
  resolvedCount: number;
};

export type DashboardTopPage = {
  path: string;
  views: number;
};

export type DashboardDailyTrendItem = {
  date: string;
  views: number;
};

export type DashboardAnalyticsSummary = {
  todayViews: number;
  last7DaysViews: number;
  topPages: DashboardTopPage[];
  dailyTrend: DashboardDailyTrendItem[];
};

export type AdminDashboardSummary = {
  messages: MessageDashboardCounts;
  analytics: DashboardAnalyticsSummary;
};

export type EnterprisePlan = {
  id: number;
  title: string;
  priceMillion: number;
  userCount: number;
  description: string;
  isPopular: boolean;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
};

export type PublicEnterprisePlan = Pick<
  EnterprisePlan,
  "id" | "title" | "priceMillion" | "userCount" | "description" | "isPopular" | "sortOrder"
>;

export type HelpQuestion = {
  id: number;
  categoryId: number;
  question: string;
  answer: string;
  sortOrder: number;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
};

export type HelpCategory = {
  id: number;
  title: string;
  iconKey: HelpIconKey;
  sortOrder: number;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
  questions: HelpQuestion[];
};

export type PublicHelpQuestion = Pick<
  HelpQuestion,
  "id" | "question" | "answer" | "sortOrder"
>;

export type PublicHelpCategory = {
  id: number;
  title: string;
  iconKey: HelpIconKey;
  sortOrder: number;
  questions: PublicHelpQuestion[];
};

export function isAdminRole(value: string): value is AdminRole {
  return ADMIN_ROLES.includes(value as AdminRole);
}

export function isMessageStatus(value: string): value is MessageStatus {
  return MESSAGE_STATUSES.includes(value as MessageStatus);
}

export function isHelpIconKey(value: string): value is HelpIconKey {
  return HELP_ICON_KEYS.includes(value as HelpIconKey);
}

export function canManageUsers(role: AdminRole): boolean {
  return role === "super_admin";
}

export function canManageAssignments(role: AdminRole): boolean {
  return role === "super_admin" || role === "support_manager";
}

export function canManageEnterprisePlans(role: AdminRole): boolean {
  return role === "super_admin" || role === "support_manager";
}

export function canManageHelpCenter(role: AdminRole): boolean {
  return ADMIN_ROLES.includes(role);
}

export function formatAdminDateTime(value: string | null): string {
  if (!value) {
    return "—";
  }

  return new Intl.DateTimeFormat("fa-IR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}
