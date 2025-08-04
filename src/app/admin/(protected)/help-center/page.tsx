import HelpCenterManager from "@/components/admin/HelpCenterManager";
import { requireAdminUser } from "@/lib/admin-auth";
import { listHelpCategories } from "@/lib/help-center";

export const dynamic = "force-dynamic";

type HelpCenterPageProps = {
  searchParams: Promise<{
    category?: string;
    error?: string;
    notice?: string;
  }>;
};

function parsePositiveInteger(value: string | undefined): number | null {
  if (!value) {
    return null;
  }

  const parsed = Number.parseInt(value, 10);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
}

function getStateMessage(params: Awaited<HelpCenterPageProps["searchParams"]>) {
  const successMessages: Record<string, string> = {
    "category-created": "دسته‌بندی جدید راهنما ساخته شد.",
    "category-updated": "اطلاعات دسته‌بندی با موفقیت به‌روزرسانی شد.",
    "category-archived": "دسته‌بندی آرشیو شد و از سایت عمومی پنهان شد.",
    "category-restored": "دسته‌بندی دوباره فعال شد.",
    "question-created": "سؤال جدید با موفقیت ثبت شد.",
    "question-updated": "سؤال و پاسخ با موفقیت به‌روزرسانی شد.",
    "question-archived": "سؤال آرشیو شد.",
    "question-restored": "سؤال دوباره فعال شد.",
  };

  const errorMessages: Record<string, string> = {
    "invalid-category": "اطلاعات دسته‌بندی معتبر نیست.",
    "invalid-category-id": "دسته‌بندی موردنظر پیدا نشد.",
    "invalid-question": "اطلاعات سؤال و پاسخ معتبر نیست.",
    "invalid-question-id": "سؤال موردنظر پیدا نشد.",
  };

  if (params.notice && successMessages[params.notice]) {
    return {
      type: "success" as const,
      text: successMessages[params.notice],
    };
  }

  if (params.error && errorMessages[params.error]) {
    return {
      type: "error" as const,
      text: errorMessages[params.error],
    };
  }

  return null;
}

export default async function AdminHelpCenterPage({
  searchParams,
}: HelpCenterPageProps) {
  await requireAdminUser();

  const [params, categories] = await Promise.all([searchParams, listHelpCategories()]);

  return (
    <HelpCenterManager
      categories={categories}
      stateMessage={getStateMessage(params)}
      initialCategoryId={parsePositiveInteger(params.category)}
    />
  );
}
