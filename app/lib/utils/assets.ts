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

export const assetsUtils = {
  formatBalance
}

export default assetsUtils
