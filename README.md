# binez

<details close><summary>Table of Contents</summary>

- [Motivation](#motivation)
- [Prerequisites](#prerequisites)
- [Quick start](#quick-start)
  - [Install](#install)
- [Usage](#usage)
  - [Examples](#examples)
- [Documentation](#documentation)
  - [convert](#convert)
  - [range](#range)
  - [mem](#mem)
- [Contribute](#contribute)
  - [Clone the repo](#clone-the-repo)
  - [Install dependencies](#install-dependencies)
  - [Develop](#develop)
  - [Run tests](#run-tests)
  - [Submit a pull request](#submit-a-pull-request)
- [License](#license)

</details>

> pronounce: bin-ee-zee

## Motivation

I was working on a project where I had to calculate the range of a given number of bits and the size limit of a given number of bits in a given memory size in kilobytes for base 2 (binary). I found myself constantly having to do the same calculations over and over again and I was getting frustrated. So,`binez` was born out of that frustration. It's a simple command line tool that can do the following:

- convert a given number in megabytes to bytes (e.g. 1MB to 1_048_576 bytes)
- calculate the range of a given number of bits (e.g. for an unsigned 8 bits, the range is 0-255)
- calculate the range of a given number of bytes (e.g. for 2 unsigned bytes, the range is 0-65535)
- calculate what is the size limit of a given memory size in kilobytes for a given number in bits (e.g. for a 16-bit integer in 32KB of memory, the size/length limit is 16384)

## Prerequisites

- [Node.js](https://nodejs.org/en/download/) (v16.0.0 or higher)

## Quick start

### Install

<!-- ```sh
npm install -g @thyi/binez
``` -->

**TODO**: Publish to npm

```sh
git clone https://github.com/theodrosyimer/binez@latest
cd binez
npm install
npm run build
npm link
```

## Usage

### Examples

Convert 6MB to bytes:

```sh
binez convert 6
```

Calculate the range of a given number of unsigned bits:

```sh
binez range -b 8
```

Calculate the range of a given number of unsigned bytes:

```sh
binez range -B 2
```

Calculate the range of a given number of signed bits:

```sh
binez range -b -8
```

Calculate the range of a given number of signed bytes:

```sh
binez range -B -2
```

Calculate the size limit of a given number in bits in a given memory size in kilobytes:

```sh
binez mem -b 16 -ms 32
```

For both the `range` and `mem` commands, you can use the `-l` or `--locale` flag to specify the locale to use for formatting the output. The default locale is `en-US`. The supported locales are the same as those supported by the `Intl` object in JavaScript and can be found [here as text](https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry) or [here as json](https://github.com/mattcg/language-subtag-registry/blob/master/data/json/registry.json) if you prefer.

For example, to convert a number of bits to bytes in French, you can use the following command:

```sh
binez range -b 16 -l fr
```

<!-- To see the list of supported locales, you can use the following command (**not implemented**, it's not really necessary but it can be added):

```sh
binez locales
``` -->

## Documentation

### convert

`convert` `<number>` [ `-l` `--locale` = 'en-US' ]

Convert a given number of megabytes to bytes:

```sh
binez convert <number>
```

### range

`range` [ [ `-b` `--bits` | `-B` `--bytes` ] `<number>` ][ `-l` `--locale` = 'en-US' ]

Calculate the range of a given unsigned/signed number in bits:

```sh
binez range -b <bits> -l <locale>
```

Calculate the range in a given unsigned/signed number in bytes:

```sh
binez range -B <bytes> -l <locale>
```

> NOTE:
>
> 1. The maximum number of bits for which the range can be calculated is 512 and the maximum number of bytes for which the range can be calculated is 64. This is because the maximum number of bits for which a number can be represented in JavaScript is 2^53 - 1 and the maximum number of bytes for which a number can be represented in JavaScript is 2^53 - 1 / 8.
> 2. The `-l` or `--locale` flag return an error message if the locale is not supported by the `Intl` object in JavaScript and seems to be constraint to be a string of length between 2 and 8. This is because the `Intl` object in JavaScript only supports locales that are between 2 and 8 characters long.

### mem

`mem` `-b`[ `--bits` ] `<number>` `-ms` [ `--memory-size` ] `<number>` [ `-l` `--locale` = 'en-US' ]

Calculate the size limit of a given unsigned number in bits in a given memory size in kilobytes:

```sh
binez mem -b <bits> -ms <memory-size> -l <locale>
```

## Contribute

### Clone the repo

```sh
git clone https://github.com/theodrosyimer/binez@latest
cd binez
```

### Install dependencies

```sh
npm install
```

### Develop

To start developing, you will need to first build the project:

```sh
npm run build
```

Then link the project to the global `@thyi/binez` package and start the development server:

```sh
npm run link-cli
```

```sh
npm run dev
```

To start/reset the development environment in one command, you can use the following command:

  ```sh
  npm run dev:reset
  ```

### Run tests

```sh
npm test
```

### Submit a pull request

If you'd like to contribute code, documentation, or any other improvements, please [fork the project](https://gihub.com/theodrosyimer/binez/fork), make your changes, and submit a pull request.

If you're unsure about adding a feature or fixing a bug, create an issue to discuss it first.

<!-- ## Related -->

## License

MIT © [Theodros Yimer](https://github.com/theodrosyimer)
