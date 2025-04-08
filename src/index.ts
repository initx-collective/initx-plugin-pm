import type { InitxContext, InitxMatcherRules } from '@initx-plugin/core'
import type { Store } from './types'
import { InitxPlugin } from '@initx-plugin/core'
import { log } from '@initx-plugin/utils'
import { handleAdd } from './handlers/add'
import { handleCreate } from './handlers/create'
import { handleList } from './handlers/list'
import { handleRemove } from './handlers/remove'
import { handleUse } from './handlers/use'
import { HandleType, Protocol } from './types'

export default class ProjectManagerPlugin extends InitxPlugin<Store> {
  defaultStore: Store = {
    protocol: Protocol.SSH,
    current: 'default',
    directories: {}
  }

  rules: InitxMatcherRules = [
    {
      matching: 'pm',
      description: 'Project manager',
      optional: Object.values(HandleType)
    }
  ]

  async handle(context: InitxContext<Store>, type: HandleType, ...others: string[]) {
    switch (type) {
      case HandleType.List: {
        handleList(context.store)
        break
      }

      case HandleType.Add: {
        const [nameOrPath, path] = others

        if (!nameOrPath) {
          log.error('No path provided')
          return
        }

        handleAdd(context.store, nameOrPath, path)
        break
      }

      case HandleType.Use: {
        const [name = 'default'] = others
        handleUse(context.store, name)
        break
      }

      case HandleType.Remove: {
        const [path] = others

        if (!path) {
          log.error('No path provided')
          return
        }

        handleRemove(context.store, path)
        break
      }

      case HandleType.Create: {
        const [project, as] = others

        if (!project) {
          log.error('No project provided')
          return
        }

        await handleCreate(context.store, project, as)
        break
      }
    }
  }
}
