export type ContactFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
};

export type ContactFieldName = keyof ContactFormData;

export type ContactFieldErrors = Partial<Record<ContactFieldName, string>>;

type ContactValidationResult =
  | {
      success: true;
      data: ContactFormData;
      fieldErrors: ContactFieldErrors;
    }
  | {
      success: false;
      fieldErrors: ContactFieldErrors;
    };

const MAX_LENGTHS = {
  firstName: 100,
  lastName: 100,
  email: 255,
  phone: 30,
  message: 220,
} satisfies Record<ContactFieldName, number>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PERSIAN_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
const ARABIC_DIGITS = "٠١٢٣٤٥٦٧٨٩";

function getStringValue(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeDigits(value: string): string {
  return value
    .replace(/[۰-۹]/g, (digit) => String(PERSIAN_DIGITS.indexOf(digit)))
    .replace(/[٠-٩]/g, (digit) => String(ARABIC_DIGITS.indexOf(digit)));
}

export function normalizePhone(value: string): string {
  const normalized = normalizeDigits(value).replace(/[^\d+]/g, "");

  if (normalized.startsWith("+")) {
    return `+${normalized.slice(1).replace(/[+]/g, "")}`;
  }

  return normalized.replace(/[+]/g, "");
}

export function validateContactPayload(payload: unknown): ContactValidationResult {
  const source =
    typeof payload === "object" && payload !== null
      ? (payload as Partial<Record<ContactFieldName, unknown>>)
      : {};

  const data: ContactFormData = {
    firstName: getStringValue(source.firstName),
    lastName: getStringValue(source.lastName),
    email: getStringValue(source.email),
    phone: normalizePhone(getStringValue(source.phone)),
    message: getStringValue(source.message),
  };

  const fieldErrors: ContactFieldErrors = {};

  if (!data.firstName) {
    fieldErrors.firstName = "نام الزامی است.";
  } else if (data.firstName.length > MAX_LENGTHS.firstName) {
    fieldErrors.firstName = "نام نباید بیشتر از 100 کاراکتر باشد.";
  }

  if (!data.lastName) {
    fieldErrors.lastName = "نام خانوادگی الزامی است.";
  } else if (data.lastName.length > MAX_LENGTHS.lastName) {
    fieldErrors.lastName = "نام خانوادگی نباید بیشتر از 100 کاراکتر باشد.";
  }

  if (!data.email) {
    fieldErrors.email = "ایمیل الزامی است.";
  } else if (data.email.length > MAX_LENGTHS.email) {
    fieldErrors.email = "ایمیل نباید بیشتر از 255 کاراکتر باشد.";
  } else if (!EMAIL_REGEX.test(data.email)) {
    fieldErrors.email = "فرمت ایمیل معتبر نیست.";
  }

  if (!data.phone) {
    fieldErrors.phone = "شماره تماس الزامی است.";
  } else if (data.phone.length > MAX_LENGTHS.phone) {
    fieldErrors.phone = "شماره تماس نباید بیشتر از 30 کاراکتر باشد.";
  } else if (!/^\+?\d{7,15}$/.test(data.phone)) {
    fieldErrors.phone = "شماره تماس معتبر نیست.";
  }

  if (!data.message) {
    fieldErrors.message = "متن پیام الزامی است.";
  } else if (data.message.length > MAX_LENGTHS.message) {
    fieldErrors.message = "متن پیام نباید بیشتر از 220 کاراکتر باشد.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      success: false,
      fieldErrors,
    };
  }

  return {
    success: true,
    data,
    fieldErrors: {},
  };
}
