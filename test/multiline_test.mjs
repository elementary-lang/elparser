import test from 'tape'
import parser from '../'

test('multiline test', t => {
  const el = `
<function name="uppercase" value>
  <return><js>value.toUpperCase()</js></return>
</function>

<function name="hello" text>
  <const name="foo">
    <uppercase value="text" />
  </const>
  <return><js>"Hello " + foo</js></return>
</function>

<log>
  <hello text=("World") />
</log>
  `

  parser(el, (err, code) => {
    console.log(code)
    t.equals(
      code,
      'function log({ data }) {\n  return console.log(data)\n}\n\nfunction hello({ text }) {\n  return "Hello " + text\n}\nlog({ data: hello({ text: "World" }) })\n'
    )
    t.end()
  })
})
