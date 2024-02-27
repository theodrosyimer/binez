/**
 * @param value value to convert
 * @param locale locale to use for formatting
 */
export function formatNumber(value: number | bigint, locale = 'en-US') {
  return Intl.NumberFormat(locale).format(value)
}
