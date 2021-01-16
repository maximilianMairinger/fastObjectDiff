import diff from "../../app/src/fastObjectDiff"

console.log(diff.flat(
  undefined,
  {
    a: "qwe",
    b: 22,
    aw: {qwe: "qwe"}
  }
))

