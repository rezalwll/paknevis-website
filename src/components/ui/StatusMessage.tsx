import { cn } from "@/lib/cn";

type StatusMessageProps = {
  tone: "success" | "error";
  children: string;
};

export function StatusMessage({ tone, children }: StatusMessageProps) {
  return (
    <p
      className={cn(
        "rounded-2xl px-4 py-3 text-sm",
        tone === "success" ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700",
      )}
    >
      {children}
    </p>
  );
}

