export const toEllipsis = (address?: string, head = 6, tail = 4) => {
  if (!address) return ''
  return [address.slice(0, head), '...', address.slice(-tail)].join('')
}

export const addressUtils = {
  toEllipsis
}

export default addressUtils
