import assetsUtils from '../assets'

describe('Assets', () => {
  describe(assetsUtils.formatBalance.name, () => {
    it('should return formatted balance', () => {
      expect(assetsUtils.formatBalance(123456789)).toEqual('123,456,789.00')
    })

    it('should return formatted balance with custom max decimals', () => {
      expect(assetsUtils.formatBalance('12456789.123456', 3)).toEqual(
        '12,456,789.123'
      )
    })

    it('should return formatted balance with custom min decimals', () => {
      expect(assetsUtils.formatBalance('12456789.1', 3, 2)).toEqual(
        '12,456,789.10'
      )
    })
  })
})
