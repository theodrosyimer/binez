import { Command } from 'commander'

import { handleBits, handleBytes } from './range.js'
import { convertMBToBytes } from './convert.js'
import { calculateMemorySize } from './mem.js'
import { formatNumber } from './utils.js'

export const binezCli = new Command()

binezCli
  .name('binez')
  .version('0.0.1', '-v, --version', 'output the current version')
  .description('CLI to help with various binary calculations and conversions.')

binezCli
  .command('range')
  .description('Calculate the range of a given number of bits')
  .option('-b, --bits <bits>', 'bits to calculate the range of')
  .option('-B, --bytes <bytes>', 'bytes to calculate the range of')
  .option(
    '-l, --locale <locale>',
    'locale to use for formatting, default to `en-US`',
    'en-US',
  )
  .action(
    (options: {
      bytes: string
      bits: string
      // signed: boolean
      locale: string
    }) => {
      let result: string | undefined

      if (options.bits) {
        result = handleBits(options)
      }

      if (options.bytes) {
        result = handleBytes(options)
      }

      console.log(result)
    },
  )

binezCli
  .command('convert')
  .description('Convert a given number of megabytes to bytes')
  .argument('<number>', 'number in megabytes to convert to bytes')
  .option(
    '-l, --locale <locale>',
    'locale to use for formatting, default to `en-US`',
    'en-US',
  )
  .action(
    (
      mb: number,
      options: {
        locale: string
      },
    ) => {
      let result = ''
      if (options.locale) {
        result = formatNumber(convertMBToBytes(mb), options.locale)
      }
      console.log(result)
    },
  )

binezCli
  .command('mem')
  .description(
    'Calculate the size limit of a given memory size in kilobytes for a given number in bits',
  )
  .option('-b, --bits <bits>', 'size number in bits')
  .option('-s, -size <memory-size>', 'memory size in kilobytes', '32')
  .option(
    '-l, --locale <locale>',
    'locale to use for formatting, default to `en-US`',
    'en-US',
  )
  .action((options: { bits: number; size: number; locale: string }) => {
    const calculatedValue = calculateMemorySize(options.bits, options.size)

    console.log(formatNumber(calculatedValue, options.locale))
  })
