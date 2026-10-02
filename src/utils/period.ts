/**
 * Formats a start/end date pair (from <input type="date">, "YYYY-MM-DD")
 * into the site's exhibition period convention, e.g. "2026.4.22.-6.20."
 * (same year) or "2026.12.1.-2027.1.31." (different years).
 */
export function formatPeriod(startDate: string, endDate: string): string {
  const [sy, sm, sd] = startDate.split("-").map(Number);
  const [ey, em, ed] = endDate.split("-").map(Number);

  if (sy === ey) {
    return `${sy}.${sm}.${sd}.-${em}.${ed}.`;
  }
  return `${sy}.${sm}.${sd}.-${ey}.${em}.${ed}.`;
}
