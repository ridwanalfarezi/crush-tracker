import { use } from "react";

export const promiseCache = new Map();

export default function useQuery({ fn, key }) {
  if (!promiseCache.has(key)) {
    promiseCache.set(key, fn());
  }
  const promise = promiseCache.get(key);
  return use(promise);
}
