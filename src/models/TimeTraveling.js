import { observable } from "mobx"
import { useComputed } from "./MobXHooks"

export const overrideDirectory = observable.box(null)
global.ELECT_overrideDirectory = directory => overrideDirectory.set(directory)

export function useDirectoryOverride() {
  return [
    useComputed(() => overrideDirectory.get(), []),
    newDirectory => overrideDirectory.set(newDirectory),
  ]
}
