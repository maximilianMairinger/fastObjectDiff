import diff from "../../app/src/fastObjectDiff"
// import clone from "fast-copy"

function clone(ob: any) {
  if (ob instanceof Object) {
    const c = new ob.constructor()
    for (const key in ob) {
      c[key] = clone(ob[key])
    }
    return c
  }
  else return ob
}
function cloneKeysButKeepSym(ob: any) {
  if (ob instanceof Object) {
    const c = new ob.constructor()
    for (const key of Object.keys(ob)) c[key] = cloneKeysButKeepSym(ob[key])
    for (const sym of Object.getOwnPropertySymbols(ob)) c[sym] = ob[sym]
    return c
  }
  else return ob
}


const sym = Symbol("test")
const max = {
  name: "max",
  age: 20,
  [sym]: {whaat: 2}
}

let old = cloneKeysButKeepSym(max)

// @ts-ignore
max.likes = max
// @ts-ignore
max.loves = {
  [sym]: {lel: 2},
  some: max
}
// @ts-ignore
max.loves.loves2 = max.loves




const rmSymmWhereNew = (sym: any) => {
  let knownOg: Set<object>
  return function rmSymWhereNew(diff: object, og: object = {}) {
    knownOg = new Set()
    rmSymWhereNewRec(diff, og)
    return diff
  }
  
  function rmSymWhereNewRec(diff: object, og: object = {}) {
    knownOg.add(og[sym])
    if (!knownOg.has(diff[sym])) delete diff[sym]
    else return
    for (const key in diff) {
      if (typeof diff[key] === "object") {
        rmSymWhereNewRec(diff[key], og[key])
      }
    }
  }
}

const rmSymWhereNew = rmSymmWhereNew(sym)



console.log(rmSymWhereNew(diff(old, max), old));



diff


