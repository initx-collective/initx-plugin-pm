import type { Store } from '../types'
import { log } from '@initx-plugin/utils'

export function handleRemove(store: Store, name: string) {
  if (!store.directories[name]) {
    log.warn('No project found')
    return
  }

  if (store.current === name) {
    store.current = 'default'
  }

  const path = store.directories[name]
  delete store.directories[name]

  log.success(`Removed ${name}: ${path}`)
}
