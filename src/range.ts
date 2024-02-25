import {
  calculateValueRangeFromBits,
  formatNumber,
  calculateValueRangeFromBytes,
} from './utils.js'

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
