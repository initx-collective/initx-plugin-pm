import type { InitxContext, InitxMatcherRules } from '@initx-plugin/core'
import type { Store } from './types'
import { InitxPlugin } from '@initx-plugin/core'
import { log } from '@initx-plugin/utils'
import handleAdd from './handlers/add'
import handleCreate from './handlers/create'
import handleRemove from './handlers/remove'
import { HandleType, Protocol } from './types'

export default class ProjectManagerPlugin extends InitxPlugin<Store> {
  defaultStore: Store = {
    protocol: Protocol.SSH,
    directories: []
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
      case HandleType.Add: {
        const [path] = others

        if (!path) {
          log.error('No path provided')
          return
        }

        handleAdd(context.store, path)
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
