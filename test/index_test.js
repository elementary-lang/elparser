import test from 'tape'
import parser from '../'

test('parse elementary hello world app', t => {
  const el = `
<function name="log" data>
  <js>console.log(data)</js>
</function>

<function name="hello" text>
  <return>
    <js>"Hello " + text</js>
  </return>
</function>

<log>
  <hello text=("World") />
</log>
  `

  parser(el, (err, code) => {
    t.equals(
      code,
      'function log({ data }) {\n  console.log(data)\n}\n\nfunction hello({ text }) {\n  return "Hello " + text\n}\nlog({ data: hello({ text: "World" }) })\n'
    )
    t.end()
  })
})
