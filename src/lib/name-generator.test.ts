import faker from 'faker'

import nameGenerator from './name-generator'

jest.mock('faker')

describe('nameGenerator', () => {
  let testGenerator
  beforeEach(() => {
    faker.fake.mockReturnValueOnce('John McClane').mockReturnValueOnce('Hans Gruber')
    testGenerator = nameGenerator()
  })

  afterEach(() => {
    faker.fake.mockReset()
  })

  it('returns a faked name', () => {
    expect(testGenerator('foo')).toEqual('John McClane')
  })

  it('returns same name when called twice with same id', () => {
    expect(testGenerator('foo')).toEqual('John McClane')
    expect(testGenerator('foo')).toEqual('John McClane')
  })

  it('returns different name when called twice with different ids', () => {
    expect(testGenerator('foo')).toEqual('John McClane')
    expect(testGenerator('bar')).toEqual('Hans Gruber')
  })
})
