import { diff as _diff, addedDiff as _addedDiff, deletedDiff as _deletedDiff, detailedDiff as _detailedDiff, updatedDiff as _updatedDiff } from "deep-object-diff"
import clone from "fast-copy"

const s = Symbol()

function flat(call: any, ...a: object[]) {
  const ls = new Set()
  let aa = []
  for (let e of a) {
    const ee = clone(e)
    aa.push(ee)
    for (let p in ee) {
      if (typeof ee[p] === "object") {
        ee[p] = s
        ls.add(p)
      }
    }
  }

  const res = call(...aa)

  const resKeys = Object.keys(res)

  for (let key of resKeys) {
    if (ls.has(key)) {
      res[key] = a[a.length - 1][key]
    }
  }
  return res
}

(_diff as any).flat = function(a: object, b: object) {
  return flat(this, a, b)
};

(_addedDiff as any).flat = function(a: object, b: object) {
  return flat(this, a, b)
};

(_deletedDiff as any).flat = function(a: object, b: object) {
  return flat(this, a, b)
};

(_updatedDiff as any).flat = function(a: object, b: object) {
  return flat(this, a, b)
};


(_detailedDiff as any).flat = function(a: object, b: object) {
  return {
    added: flat(_addedDiff, a, b),
    deleted: flat(_deletedDiff, a, b),
    updated: flat(_updatedDiff, a, b)
  }
};

export const diff = _diff as typeof _diff & {flat: typeof _diff}
export const addedDiff = _addedDiff as typeof _addedDiff & {flat: typeof _addedDiff}
export const deletedDiff = _deletedDiff as typeof _deletedDiff & {flat: typeof _deletedDiff}
export const updatedDiff = _updatedDiff as typeof _updatedDiff & {flat: typeof _updatedDiff}
export const detailedDiff = _detailedDiff as typeof _detailedDiff & {flat: typeof _detailedDiff}

export default diff