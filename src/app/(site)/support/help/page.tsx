import HelpCenterClient from "@/components/HelpCenterClient";
import { listPublicHelpCategories } from "@/lib/help-center";

export const dynamic = "force-dynamic";

export default async function HelpCenterPage() {
  const categories = await listPublicHelpCategories();

  return <HelpCenterClient categories={categories} />;
}
