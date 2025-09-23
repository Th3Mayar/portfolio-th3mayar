export function getClientLang(): string | null {
  if (typeof document === "undefined") return null;
  const m = document.cookie.match(/(^| )lang=([^;]+)/);
  return m ? decodeURIComponent(m[2]) : null;
}