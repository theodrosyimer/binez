import { formatNumber } from './utils.js'

export function handleBits(options: { bits: string; locale?: string }) {
  let calculatedValue: number[] | bigint[] = []

  try {
    calculatedValue = calculateValueRangeFromBits(options.bits)
  } catch (error) {
    if (error instanceof Error) {
      return error.message
    }
  }

  if (
    typeof calculatedValue[0] === 'number' &&
    typeof calculatedValue[1] === 'number'
  ) {
    let start = ''
    let end = ''

    try {
      start = formatNumber(calculatedValue[0], options.locale)
      end = formatNumber(calculatedValue[1], options.locale)
    } catch (error) {
      if (error instanceof Error) {
        return error.message
      }
    }

    return `${start} <-> ${end}`
  }
}

export function handleBytes(options: { bytes: string; locale?: string }) {
  let bigCalculatedValue: [number, bigint] | [number, number] = [0, 0]

  try {
    bigCalculatedValue = calculateValueRangeFromBytes(options.bytes)
  } catch (error) {
    if (error instanceof Error) {
      return error.message
    }
  }

  if (
    typeof bigCalculatedValue[0] === 'number' &&
    (typeof bigCalculatedValue[1] === 'bigint' ||
      typeof bigCalculatedValue[1] === 'number')
  ) {
    let start = ''
    let end = ''

    try {
      start = formatNumber(bigCalculatedValue[0], options.locale)
      end = formatNumber(bigCalculatedValue[1], options.locale)
    } catch (error) {
      if (error instanceof Error) {
        return error.message
      }
    }

    return `${start} <-> ${end}`
  }
}

/**
 * @param bits size in `bits` of the numeric value type. A positive value means return an `unsigned` range, a negative value means return a `signed` range
 * @throws if the `bits` argument is not a number
 */
function calculateValueRangeFromBits(input: string) {
  if (Number.isNaN(+input)) {
    throw new Error('input must be a number')
  }

  const bits = +input

  if (bits === 0) {
    return [0, 0]
  }

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
 * @throws if the `bytes` argument is not a number
 */
function calculateValueRangeFromBytes(
  input: string,
): [number, bigint] | [number, number] {
  if (Number.isNaN(+input)) {
    throw new Error('input must be a number')
  }

  const bytes = +input

  if (bytes === 0) {
    return [0, 0]
  }

  let half = 0

  if (Math.sign(bytes) === -1) {
    half = 256 ** -bytes / 2

    return [-half, half - 1]
  }

  return [0, BigInt(256 ** bytes - 1)]
}
