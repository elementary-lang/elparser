import test from 'tape'
import parser from '../'

test('parse elementary hello world app', t => {
  const el = `
<function name="exec" text2 data>
  <js>console.log(data({text2}))</js>
</function>

<function name="makegreeting" text>
  <return>
    <function name="greet" text2>
      <return>
        <js>text + " " + text2</js>
      </return>
    </function>
  </return>
</function>

<exec text2=("World")>
  <makegreeting text=("Hello") />
</exec>
  `

  parser(el, (err, code) => {
    console.log(code)
    t.equals(
      code,
      'function exec({ text2, data }) {\n  console.log(data({ text2 }))\n}\n\nfunction makegreeting({ text }) {\n  return function greet({ text2 }) {\n    return text + " " + text2\n  }\n}\nexec({ text2: "World", data: makegreeting({ text: "Hello" }) })\n'
    )
    t.end()
  })
})
