interface server {
  name: string;
  key: string;
  cpu: number;
  memory: number;
  disk: number;
  group: string;
  active: boolean;
  publicIp: string;
}

interface serverExt extends server {
  idx: number;
}

export { server, serverExt };