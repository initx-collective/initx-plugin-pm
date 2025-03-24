import type { Store } from '../types'
import { log } from '@initx-plugin/utils'
import { getBasePath } from '../utils/path'

export default function handleAdd(store: Store, path: string) {
  const basePath = getBasePath(path)

  if (store.directories.includes(basePath)) {
    log.warn('Path already exists')
    return
  }

  store.directories.push(basePath)
  log.success(`Added ${basePath}`)
}
