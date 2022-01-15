import type { Attrs } from "./types";

const nameMap = new Map([["值", "value"]]);

export function generateAttrs(nodeAttrs: Attrs) {
  const res = Object.create(null)

  for (let attr of nodeAttrs) {

    const { name, value } = attr;

    const domAttrName = nameMap.get(name)!;

    res[domAttrName] = value
  }
  
  return res
}

export function registName (zhName: string, domProps: string) {
  if (nameMap.has(zhName)) {
    throw Error(`${zhName} has already registered`)
  }

  nameMap.set(zhName, domProps)
}
