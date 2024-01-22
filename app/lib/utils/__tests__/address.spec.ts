import addressUtils from '../address'

describe('Address', () => {
  describe(addressUtils.toEllipsis.name, () => {
    it('should return ellipsis address', () => {
      expect(
        addressUtils.toEllipsis('0x1234567890abcdef1234567890abcdef12345678')
      ).toEqual('0x1234...5678')
    })

    it('should return ellipsis address with custom initial length', () => {
      expect(
        addressUtils.toEllipsis('0x1234567890abcdef1234567890abcdef12345678', 8)
      ).toEqual('0x123456...5678')
    })

    it('should return ellipsis address with custom end length', () => {
      expect(
        addressUtils.toEllipsis(
          '0x1234567890abcdef1234567890abcdef12345678',
          undefined,
          8
        )
      ).toEqual('0x1234...12345678')
    })

    it('should return ellipsis address at the end', () => {
      expect(
        addressUtils.toEllipsis(
          '0x1234567890abcdef1234567890abcdef12345678',
          6,
          0
        )
      ).toEqual('0x1234...')
    })
  })
})
