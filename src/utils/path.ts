import pathe from 'pathe'

export function getBasePath(path: string) {
  const isAbsolute = pathe.isAbsolute(path)
  const basePath = isAbsolute ? path : pathe.resolve(path)

  return basePath
}
