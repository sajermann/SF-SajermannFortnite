/**
 * ### FormatDateAndHour
 * Format Date to string friendly
 * @example
 * ```js
 * formatDateAndHour("2021-01-01T00:00:00Z") // returns: "01/01/2021 00:00:00"
 * formatDateAndHour(null as unknown as Date) // returns: ""
 * ```
 */
export function formatDateAndHour(date?: Date | null | string): string {
  const internalDate = typeof date === 'string' ? new Date(date) : date;
  if (!internalDate) {
    return '';
  }
  try {
    if (internalDate.toISOString().indexOf('0001-01-01') === 0) {
      return '';
    }
    const result = new Intl.DateTimeFormat('pt-BR', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    }).format(new Date(internalDate));
    return result;
  } catch {
    return '';
  }
}
