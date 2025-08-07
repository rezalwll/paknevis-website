import type { ContactFormData } from "@/lib/contact";

const USER_COMMENTS_CHROME_URL = "https://paknevis.ir/api/user-comments-chrome/";
const USER_COMMENTS_CHROME_USER = "chrome_user";
const USER_COMMENTS_CHROME_SUBJECT = "پیام جدید فرم تماس با ما";
const REQUEST_TIMEOUT_MS = 10000;

type UserCommentsChromePayload = {
  user: string;
  subject: string;
  email: string;
  comment: string;
};

function buildComment(data: ContactFormData): string {
  const fullName = `${data.firstName} ${data.lastName}`.trim();
  const messageText = data.message.trim();

  return [
    `نام و نام خانوادگی: ${fullName}`,
    `شماره تماس: ${data.phone}`,
    "متن پیام:",
    messageText,
  ].join("<br/><br/>");
}

function buildPayload(data: ContactFormData): UserCommentsChromePayload {
  return {
    user: USER_COMMENTS_CHROME_USER,
    subject: USER_COMMENTS_CHROME_SUBJECT,
    email: data.email,
    comment: buildComment(data),
  };
}

export async function sendUserCommentChrome(data: ContactFormData): Promise<void> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(USER_COMMENTS_CHROME_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(buildPayload(data)),
      signal: controller.signal,
    });

    if (!response.ok) {
      const responseBody = await response.text().catch(() => "");
      throw new Error(
        `USER_COMMENTS_CHROME_REQUEST_FAILED status=${response.status} body=${responseBody}`,
      );
    }
  } finally {
    clearTimeout(timeoutId);
  }
}
