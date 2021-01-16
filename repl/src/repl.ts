import diff from "../../app/src/fastObjectDiff"

console.log(diff.flat({
  a: "qwe", 
  nested: 22
}, {
  a: "qwe",
  nested: {e: 123},
  b: 2
}))

