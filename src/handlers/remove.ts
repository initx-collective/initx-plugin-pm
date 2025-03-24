import type { Store } from '../types'
import { log } from '@initx-plugin/utils'
import { getBasePath } from '../utils/path'

export default function handleRemove(store: Store, path: string) {
  const basePath = getBasePath(path)

  const dirctory = new Set(store.directories)

  if (!dirctory.has(basePath)) {
    log.warn('Path does not exist')
    return
  }

  dirctory.delete(basePath)
  store.directories = Array.from(dirctory)

  log.success(`Removed ${basePath}`)
}
