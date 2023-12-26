import { DEFAULT_EVM_DECIMALS } from '../constants/decimals'

export const formatBalance = (
  value?: string | number,
  maximumFractionDigits = 5,
  minimumFractionDigits = 2
) => {
  return Number(value || 0).toLocaleString('en-US', {
    maximumFractionDigits,
    minimumFractionDigits
  })
}

export const slicedDecimals = (
  value: string | number,
  tokenDecimals?: number
) => {
  const [integer, valueDecimals] = String(value).split('.')
  if (!tokenDecimals) return integer

  if (!valueDecimals) return integer
  return `${integer}.${valueDecimals.slice(0, tokenDecimals)}`
}

export const formatBigInt = (
  value: string | number | bigint,
  decimalPlaces = DEFAULT_EVM_DECIMALS
) => {
  if (!value || Number.isNaN(value)) {
    return 0n
  }

  const valueAsString = value.toString()
  const isSplitedByDots = valueAsString.includes('.')
  const isSplitedByCommas = valueAsString.includes(',')
  const splitter = isSplitedByDots ? '.' : isSplitedByCommas ? ',' : undefined

  if (!splitter) {
    return BigInt(`${valueAsString}${'0'.padEnd(decimalPlaces, '0')}`)
  }

  const [integer = '0', valueDecimals = '0'] = valueAsString.split(splitter)
  return BigInt(`${integer}${valueDecimals.padStart(decimalPlaces, '0')}`)
}

export const removeDecimalsFromBigInt = (
  value: bigint,
  decimals = DEFAULT_EVM_DECIMALS
) => {
  return (value / BigInt(10 ** decimals)).toString()
}

export const assetsUtils = {
  formatBalance,
  formatBigInt,
  slicedDecimals,
  removeDecimalsFromBigInt
}

export default assetsUtils
