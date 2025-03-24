import type { Store } from '../types'
import { c, inquirer, log } from '@initx-plugin/utils'
import pathe from 'pathe'
import { Protocol } from '../types'

export default async function handleCreate(
  store: Store,
  project: string,
  as?: string
) {
  if (store.directories.length === 0) {
    log.error('No project directory available, use `pm add` to add one')
    return
  }

  const [, type, user, projectName]
  = /^(?:(github|gitee)[:/])?(.*?)\/(.*)/.exec(project) || []

  if (!user || !projectName) {
    log.error('Invalid project path')
    return
  }

  let index = 0
  if (store.directories.length > 1) {
    index = await inquirer.select(
      'Select a project directory',
      store.directories
    )
  }

  const projectDirctory = store.directories[index]

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
  const localDirctoryPath = pathe.resolve(projectDirctory, localDirctory)

  const result = await c(
    'git',
    [
      'clone',
      url,
      localDirctory
    ],
    {
      nodeOptions: {
        cwd: projectDirctory,
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
