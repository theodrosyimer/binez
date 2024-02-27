/**
 * @param mb number of megabytes to convert to bytes
 */
export function convertMBToBytes(mb: number) {
  return mb * 1024 * 1024
}

/**
 * @param size size of data storage in `kilobytes`, `32` means `32kb`
 * @param bits size in `bits` of the numeric value type
 */
export function calculateMemorySize(bits: number, size: number) {
  return (size * 1024) / (bits / 8)
}

/**
 * @param value value to convert
 * @param locale locale to use for formatting
 */
export function formatNumber(value: number | bigint, locale = 'en-US') {
  return Intl.NumberFormat(locale).format(value)
}
