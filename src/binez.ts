import { Command } from 'commander'

export const binezCli = new Command()

binezCli
  .name('binez')
  .version('0.0.1', '-v, --version', 'output the current version')
  .description('CLI to calculate or convert binary numbers!')

binezCli
  .command('convert')
  .description('Convert a given number of megabytes to bytes')
  .argument('<string>', 'string to process')
  .option('-l, --locale', 'locale to use for formatting', 'en-US')
  .action(
    (
      str: string,
      options: {
        locale: string
      },
    ) => {
      let result = str
      if (options.locale) {
        result = result.toLowerCase()
      }
      console.log(result)
    },
  )

binezCli
  .command('calc')
  .description('Reverse a string')
  .argument('<string>', 'string to reverse')
  .action((str: string) => {
    console.log(str.split('').reverse().join(''))
  })

/**
 * Convert a given number of megabytes to bytes
 *
 * @param mb number of megabytes to convert to bytes
 */
function convertMBToBytes(mb: number) {
  return mb * 1024 * 1024
}

/**
 * Ca
 * @param dataStorageSize size of data storage in `kilobytes`, `32` means `32kb`
 * @param numberBitSize size in `bits` of the numeric value type
 */
function calculateDataStorageLimit(dataStorageSize: number, bitsSize: number) {
  return (dataStorageSize * 1024) / (bitsSize / 8)
}

/**
 *
 * @param bitsSize size in `bits` of the numeric value type. A positive value means return an `unsigned` range, a negative value means return a `signed` range
 */
function calculateValueRangeFromNumberBitsSize(bitsSize: number) {
  let half = 0
  if (Math.sign(bitsSize) === -1) {
    half = 256 ** (-bitsSize / 8) / 2

    return [-half, half - 1]
  }

  return [0, 256 ** (bitsSize / 8) - 1]
}

/**
 *
 * @param bytes size in `bytes` of the numeric value type. A positive value means return an `unsigned` range, a negative value means return a `signed` range
 */
function calculateValueRangeFromBytes(bytes: number) {
  let half = 0
  if (Math.sign(bytes) === -1) {
    half = 256 ** -bytes / 2

    return [-half, half - 1]
  }

  return [0, 256 ** bytes - 1]
}

/**
 * @param value value to convert
 * @param locale locale to use for formatting
 */
function formatNumber(value: number | bigint, locale = 'en-US') {
  return Intl.NumberFormat(locale).format(value)
}
