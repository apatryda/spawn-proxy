import { ChildProcess, spawn, SpawnOptions } from 'child_process';

interface IPromiseThen<T> {
  (resolve?: (T) => any, reject?: (any) => any): Promise<any>;
}
interface IThenable<T> {
  then: IPromiseThen<T>;
}

const fSpawnProxy = function spawnProxyFunction(options?: SpawnOptions): ChildProcess & IThenable<ChildProcess> {
  const { path } = this;
  const args = [...path];
  const command = args.shift();
  const spawnee: ChildProcess & {
    then?: IPromiseThen<ChildProcess>;
  } = spawn(command, args, options);

  const spawnPromise: Promise<void> = new Promise((resolve, reject) => {
    spawnee.once('exit', (code, signal) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(Object.assign(new Error('Spawn failed.'), { code, signal }));
    });
  });

  spawnee.then = spawnPromise.then.bind(spawnPromise);

  return <ChildProcess & IThenable<ChildProcess>>spawnee;
};

const pathWalker = {
  get({ path: _path = [] } = {}, arg) {
    const path = [..._path, arg];
    const oSpawnProxy = { path };
    const spawnProxy = Object.assign(fSpawnProxy.bind(oSpawnProxy), oSpawnProxy);

    return new Proxy(spawnProxy, pathWalker);
  },
};

export const spawnProxy: any = new Proxy({},  pathWalker);
export default spawnProxy;
