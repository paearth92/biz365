import { AsyncLocalStorage } from "node:async_hooks";

export type Biz365RuntimeEnv = {
  DB: unknown;
  BIZ365_ADMIN_EMAIL?: string;
};

const storageKey = Symbol.for("biz365.runtime-env");
type RuntimeGlobal = typeof globalThis & { [storageKey]?: AsyncLocalStorage<Biz365RuntimeEnv> };
const runtimeGlobal = globalThis as RuntimeGlobal;
const storage = runtimeGlobal[storageKey] ??= new AsyncLocalStorage<Biz365RuntimeEnv>();

export function runWithRuntimeEnv<T>(env: Biz365RuntimeEnv, work: () => T): T {
  return storage.run(env, work);
}

export function getRuntimeEnv() {
  const value = storage.getStore();
  if (!value) throw new Error("Biz365 runtime bindings are unavailable outside a request");
  return value;
}
