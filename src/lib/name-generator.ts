import faker from 'faker'

const nameGenerator = (): (id: string) => string => {
  const nameMap = new Map()
  return (id: string): string => {
    if (!nameMap.has(id)) {
      nameMap.set(id, faker.fake('{{name.firstName}} {{name.lastName}}'))
    }
    return nameMap.get(id)
  }
}

export default nameGenerator
