import test from 'tape'
import parser from '../'

test('parse elementary hello world app', t => {
  const el = `
<function name="exec" text2 data>
  <js>data({text2})</js>
</function>

<function name="makegreeting" text>
  <function name="greet" text2>
    <js>text + " " + text2</js>
  </function>
</function>

<exec text2=("World")>
  <makegreeting text=("Hello") />
</exec>
  `

  parser(el, (err, code) => {
    console.log(code)
    // t.equals(
    //   code,
    //   'function log({ data }) {\n  return console.log(data)\n}\n\nfunction hello({ text }) {\n  return "Hello " + text\n}\n\nlog({ data: hello({ text: "World" }) })\n'
    // )
    t.end()
  })
})
