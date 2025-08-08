import { cn } from "@/lib/cn";

type TextFieldProps = {
  id: string;
  name: string;
  type?: "text" | "email" | "tel";
  label: string;
  value: string;
  disabled?: boolean;
  required?: boolean;
  autoComplete?: string;
  error?: string;
  onChange: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
};

export function TextField({
  id,
  name,
  type = "text",
  label,
  value,
  disabled,
  required,
  autoComplete,
  error,
  onChange,
  onFocus,
  onBlur,
}: TextFieldProps) {
  const isActive = Boolean(value);

  return (
    <div className="relative text-right">
      <label
        htmlFor={id}
        className={cn(
          "absolute right-3 pointer-events-none transition-all duration-300 ease-out",
          isActive ? "-top-2.5 bg-white px-1 text-[10px] text-blue-600" : "top-1/2 -translate-y-1/2 text-sm text-slate-400",
        )}
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        disabled={disabled}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          "w-full rounded-xl border bg-slate-50/60 px-3 py-2.5 text-sm outline-none transition-all duration-300 focus:bg-white focus:ring-1 disabled:cursor-not-allowed disabled:bg-slate-100 md:text-[0.98rem] lg:text-[1.05rem]",
          error
            ? "border-red-400 focus:border-red-500 focus:ring-red-500"
            : "border-slate-200 focus:border-blue-500 focus:ring-blue-500",
        )}
      />
      {error ? (
        <p id={`${id}-error`} className="mt-1 text-xs text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}

