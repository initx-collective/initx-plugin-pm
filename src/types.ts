export enum Protocol {
  SSH = 'ssh',
  HTTPS = 'https'
}

export enum HandleType {
  List = 'list',
  Add = 'add',
  Use = 'use',
  Remove = 'remove',
  Create = 'create'
}

export interface Store {
  protocol: Protocol
  current: string
  directories: Record<string, string>
}
