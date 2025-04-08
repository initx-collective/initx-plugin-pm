import type { Store } from '../types'
import { log } from '@initx-plugin/utils'
import { getBasePath } from '../utils/path'

export function handleAdd(
  store: Store,
  nameOrPath: string,
  path?: string
) {
  let certainedName
  let certainedPath

  if (path) {
    certainedName = nameOrPath
    certainedPath = path
  }
  else {
    certainedName = 'default'
    certainedPath = nameOrPath
  }

  const basePath = getBasePath(certainedPath)

  const directory = store.directories?.[certainedName]

  if (basePath === directory) {
    log.warn('Path already exists')
    return
  }

  store.directories[certainedName] = basePath
  log.success(`Added ${basePath}`)
}
