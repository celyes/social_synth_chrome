export const CHATGPT_COMMENT_BTN_ID = "chatgpt-comment-btn";
export const CHATGPT_POST_BTN_ID = "chatgpt-post-btn";

export const TOAST_CLASSNAME = "social-comments-toast";

export const ERROR_MESSAGE =
  "ChatGPT failed. Follow the instructions & try again.";

export enum Domains {
  LinkedIn = "linkedin.com",
  // Facebook = "facebook.com",
  Instagram = "instagram.com",
  Twitter = "twitter.com",
}

export const ALLOWED_DOMAINS: Domains[] = [
  Domains.LinkedIn,
  // Domains.Facebook,
  Domains.Instagram,
  Domains.Twitter,
];

export const ANNOUNCEMENTS_API =
  "https://social-comments-gpt-site.vercel.app/api/announcements";

export const WELCOME_PAGE = "https://social-comments-gpt.com/extension/welcome";
export const UNINSTALL_PAGE =
  "https://social-comments-gpt.com/extension/uninstall";
