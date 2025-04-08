import type { Store } from '../types'
import { c, log } from '@initx-plugin/utils'
import pathe from 'pathe'
import { Protocol } from '../types'

export async function handleCreate(
  store: Store,
  project: string,
  as?: string
) {
  const directory = store.directories[store.current]

  if (!directory) {
    log.error(`No directory found for current: ${store.current}`)
    return
  }

  const [, type, user, projectName]
  = /^(?:(github|gitee)[:/])?(.*?)\/(.*)/.exec(project) || []

  if (!user || !projectName) {
    log.error('Invalid project path')
    return
  }

  let baseUrl: string
  switch (type) {
    case 'gitee':
      baseUrl = 'gitee.com'
      break

    case 'github':
    default:
      baseUrl = 'github.com'
  }

  let cloneType
  switch (store.protocol) {
    case Protocol.HTTPS:
      cloneType = 'https://'
      break

    case Protocol.SSH:
    default:
      cloneType = 'git@'
  }

  const mark = store.protocol === Protocol.HTTPS ? '/' : ':'
  const url = `${cloneType}${baseUrl}${mark}${user}/${projectName}.git`
  const localDirctory = as || projectName
  const localDirctoryPath = pathe.resolve(directory, localDirctory)

  const result = await c(
    'git',
    [
      'clone',
      url,
      localDirctory
    ],
    {
      nodeOptions: {
        cwd: directory,
        stdio: 'inherit'
      }
    }
  )

  if (!result.success) {
    log.error(`Failed to clone ${localDirctoryPath}`)
    return
  }

  log.success(`Cloned ${localDirctoryPath}`)
}
