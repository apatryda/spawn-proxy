import { ChildProcess, spawn, SpawnOptions } from 'child_process';

const _spawnProxy = function spawnProxyHandler(options?: SpawnOptions): ChildProcess {
  const { path } = this;
  const args = [...path];
  const command = args.shift();

  return spawn(command, args, options);
};

const pathHandler = {
  get({ path = [] } = {}, arg) {
    const path_ = [...path, arg];
    const spawnProxy_ = { path: path_ };
    const spawnProxy = Object.assign(_spawnProxy.bind(spawnProxy_), spawnProxy_);

    return new Proxy(spawnProxy, pathHandler);
  },
};

export const spawnProxy: any = new Proxy({},  pathHandler);

export default spawnProxy;
