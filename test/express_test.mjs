import test from 'tape'
import parser from '../'

test('parse elementary hello world app', t => {
  const el = `
  <import from="express" />
  <import as="s" from="./helpers" />

  <function name="hello" req res>
    <js>res.send('Hello There')</js>
  </function>

  <function name="root" req res>
    <js>res.send('Hello Express')</js>
  </function>

  <s.listen port="3000">
    <s.get path=("/hello") handler=(hello) />
    <s.get path=("/") handler=(root) />
    <js>express()</js>
  </helpers.listen>


`

  parser(el, (err, code) => {
    console.log(code)
    // t.equals(
    //   code,
    //   'import exec from "./exec"\n\nfunction makegreeting({ text }) {\n  return function greet({ text2 }) {\n    return text + " " + text2\n  }\n}\nexport default makegreeting\n'
    // )
    t.end()
  })
})
