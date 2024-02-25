import { Command } from 'commander'

import { bitsHandler, bytesHandler } from './range.js'
import { formatNumber, convertMBToBytes, calculateMemorySize } from './utils.js'

export const binezCli = new Command()

binezCli
  .name('binez')
  .version('0.0.1', '-v, --version', 'output the current version')
  .description('CLI to calculate or convert binary numbers!')

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
  .command('range')
  .description('Calculate the range of a given number of bits')
  .option('-b, --bits <bits>', 'bits to calculate the range of')
  .option('-B, --bytes <bytes>', 'bytes to calculate the range of')
  .option('-s, --signed', 'return a signed range')
  .option(
    '-l, --locale <locale>',
    'locale to use for formatting, default to `en-US`',
    'en-US',
  )
  .action(
    (options: {
      bytes: number
      bits: number
      signed: boolean
      locale: string
    }) => {
      let result: string | undefined

      if (options.bits) {
        result = bitsHandler(options)
      }

      if (options.bytes) {
        result = bytesHandler(options)
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
  .option('-ms, --memory-size <memory-size>', 'memory size in kilobytes', '32')
  .option(
    '-l, --locale <locale>',
    'locale to use for formatting, default to `en-US`',
    'en-US',
  )
  .action((options: { bits: number; memorySize: number; locale: string }) => {
    const calculatedValue = calculateMemorySize(
      options.bits,
      options.memorySize,
    )

    console.log(formatNumber(calculatedValue, options.locale))
  })
