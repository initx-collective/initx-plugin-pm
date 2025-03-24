export enum Protocol {
  SSH = 'ssh',
  HTTPS = 'https'
}

export enum HandleType {
  Add = 'add',
  Remove = 'remove',
  Create = 'create'
}

export interface Store {
  protocol: Protocol
  directories: string[]
}
