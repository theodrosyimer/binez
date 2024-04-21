/**
 * @param size size of data storage in `kilobytes`, `32` means `32kb`
 * @param bits size in `bits` of the numeric value type
 */
export function calculateMemorySize(bits: number, size: number) {
  return (size * 1024) / (bits / 8)
}
