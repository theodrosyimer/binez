/**
 * @param mb number of megabytes to convert to bytes
 */
export function convertMBToBytes(mb: number) {
  return mb * 1024 * 1024
}

/**
 * @param bits size in `bits` of the numeric value type. A positive value means return an `unsigned` range, a negative value means return a `signed` range
 */
export function calculateValueRangeFromBits(bits: number) {
  let half = 0
  if (Math.sign(bits) === -1) {
    half = 256 ** (-bits / 8) / 2

    return [-half, half - 1]
  }

  return [0, 256 ** (bits / 8) - 1]
}

/**
 * @param bytes size in `bytes` of the numeric value type. A positive value means return an `unsigned` range, a negative value means return a `signed` range
 */
export function calculateValueRangeFromBytes(
  bytes: number,
): [number, bigint] | [number, number] {
  let half = 0
  if (Math.sign(bytes) === -1) {
    half = 256 ** -bytes / 2

    return [-half, half - 1]
  }

  return [0, BigInt(256 ** bytes - 1)]
}

/**
 * @param dataStorageSize size of data storage in `kilobytes`, `32` means `32kb`
 * @param bits size in `bits` of the numeric value type
 */
export function calculateMemorySize(bits: number, dataStorageSize: number) {
  return (dataStorageSize * 1024) / (bits / 8)
}

/**
 * @param value value to convert
 * @param locale locale to use for formatting
 */
export function formatNumber(value: number | bigint, locale = 'en-US') {
  return Intl.NumberFormat(locale).format(value)
}
