export function formatDate(
  dateString: string | undefined,
  locale: string = "ja-JP",
): string {
  if (!dateString) {
    return "N/A";
  }
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "long",
    year: "numeric",
    // hour: "2-digit",
    // minute: "2-digit",
    // hour12: false,
  };
  return new Date(dateString).toLocaleDateString(locale, options);
}
