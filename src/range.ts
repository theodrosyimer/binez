import { formatNumber } from './utils.js'

export function bitsHandler(options: {
  bits: number
  signed: boolean
  locale: string
}) {
  const calculatedValue = calculateValueRangeFromBits(
    options.signed ? -options.bits : options.bits,
  )

  if (
    typeof calculatedValue[0] === 'number' &&
    typeof calculatedValue[1] === 'number'
  ) {
    return `${formatNumber(calculatedValue[0], options.locale)} <-> ${formatNumber(
      calculatedValue[1],
      options.locale,
    )}`
  }
}

export function bytesHandler(options: {
  bytes: number
  signed: boolean
  locale: string
}) {
  const bigCalculatedValue = calculateValueRangeFromBytes(
    options.signed ? options.bytes : options.bytes,
  )

  if (
    typeof bigCalculatedValue[0] === 'number' &&
    (typeof bigCalculatedValue[1] === 'bigint' ||
      typeof bigCalculatedValue[1] === 'number')
  ) {
    return `${formatNumber(bigCalculatedValue[0], options.locale)} <-> ${formatNumber(
      bigCalculatedValue[1],
      options.locale,
    )}`
  }
}

/**
 * @param bits size in `bits` of the numeric value type. A positive value means return an `unsigned` range, a negative value means return a `signed` range
 */
function calculateValueRangeFromBits(bits: number) {
  let half = 0
  if (Math.sign(bits) === -1) {
    if (Math.abs(bits) < 8) {
      half = 256 / (8 / -bits)
      return [-half, half - 1]
    }
    half = 256 ** (-bits / 8) / 2

    return [-half, half - 1]
  }

  if (Math.abs(bits) < 8) {
    half = 256 / (8 / bits)
    return [0, half - 1]
  }

  return [0, 256 ** (bits / 8) - 1]
}

/**
 * @param bytes size in `bytes` of the numeric value type. A positive value means return an `unsigned` range, a negative value means return a `signed` range
 */
function calculateValueRangeFromBytes(
  bytes: number,
): [number, bigint] | [number, number] {
  let half = 0
  if (Math.sign(bytes) === -1) {
    half = 256 ** -bytes / 2

    return [-half, half - 1]
  }

  return [0, BigInt(256 ** bytes - 1)]
}
