import { cn } from "@/lib/cn";

type TextAreaFieldProps = {
  id: string;
  name: string;
  label: string;
  value: string;
  disabled?: boolean;
  required?: boolean;
  maxLength?: number;
  rows?: number;
  error?: string;
  onChange: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
};

export function TextAreaField({
  id,
  name,
  label,
  value,
  disabled,
  required,
  maxLength,
  rows = 3,
  error,
  onChange,
  onFocus,
  onBlur,
}: TextAreaFieldProps) {
  const isActive = Boolean(value);

  return (
    <div className="relative text-right">
      <label
        htmlFor={id}
        className={cn(
          "absolute right-3 z-10 pointer-events-none transition-all duration-300 ease-out",
          isActive ? "-top-2.5 bg-white px-1 text-[10px] text-blue-600" : "top-3 text-sm text-slate-400",
        )}
      >
        {label}
      </label>
      <div
        className={cn(
          "rounded-2xl border bg-slate-50/60 px-3 py-2.5 transition-all duration-300 focus-within:bg-white focus-within:ring-1",
          error
            ? "border-red-400 focus-within:border-red-500 focus-within:ring-red-500"
            : "border-slate-200 focus-within:border-blue-500 focus-within:ring-blue-500",
        )}
      >
        <textarea
          id={id}
          name={name}
          rows={rows}
          maxLength={maxLength}
          required={required}
          disabled={disabled}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className="w-full resize-none bg-transparent text-sm outline-none disabled:cursor-not-allowed md:text-[0.98rem] lg:text-[1.05rem]"
        />
        {typeof maxLength === "number" ? (
          <div className="mt-1 flex items-center justify-between text-[10px] text-slate-400 md:text-xs">
            <span>حداکثر {maxLength} کاراکتر</span>
            <span>
              {value.length}/{maxLength}
            </span>
          </div>
        ) : null}
      </div>
      {error ? (
        <p id={`${id}-error`} className="mt-1 text-xs text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}

