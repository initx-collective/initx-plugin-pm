import type { Store } from '../types'
import { log } from '@initx-plugin/utils'
import columnify from 'columnify'

export function handleList({ current, directories }: Store) {
  if (Object.keys(directories).length === 0) {
    log.info('No directories found')
    return
  }

  const list = Object.keys(directories).map((name) => {
    const value = directories[name]
    return {
      name: name === current ? `* ${name}` : name,
      value
    }
  })

  // eslint-disable-next-line no-console
  console.log(columnify(list))
}
