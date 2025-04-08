import type { Store } from '../types'
import { log } from '@initx-plugin/utils'

export function handleUse(store: Store, name: string) {
  if (!store.directories[name]) {
    log.error(`No directory found for ${name}`)
    return
  }

  store.current = name
  log.success(`Switched to ${name}`)
}
