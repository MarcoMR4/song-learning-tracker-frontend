import { 
    describe, 
    it, 
    expect, 
    vi 
} from 'vitest'

vi.mock('quasar', () => ({
  QBtn: { name: 'QBtn' },
  QTable: { name: 'QTable' }
}))

import { loadQuasar } from '../../utils/quasar'

describe('loadQuasar', () => {
  it('Load just existent quasar components', () => {
    const result = loadQuasar(['QBtn', 'QTable', 'QFake', 'randomUnexpectedName'])
    expect(result).toHaveProperty('QBtn')
    expect(result).toHaveProperty('QTable')
    expect(result).not.toHaveProperty('QFake')
    expect(result).not.toHaveProperty('randomUnexpectedName')
    expect(result.QBtn).toEqual({ name: 'QBtn' })
    expect(result.QTable).toEqual({ name: 'QTable' })
  })
})