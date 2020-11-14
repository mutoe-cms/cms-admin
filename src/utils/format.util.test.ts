import { formatDateTime } from 'src/utils/format.util'

describe('# format date time', () => {
  it('should format to YYYY-MM-DD HH:mm format', () => {
    const result = formatDateTime(new Date(2020, 0, 1, 0, 0, 0))

    expect(result).toBe('2020-01-01 00:00')
  })
})
