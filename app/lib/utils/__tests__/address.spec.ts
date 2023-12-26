import { toEllipsis } from '../address'

describe('Address', () => {
  describe('toEllipsis', () => {
    it('should return ellipsis address', () => {
      expect(toEllipsis('0x1234567890abcdef1234567890abcdef12345678')).toEqual(
        '0x1234...5678'
      )
    })
  })
})
