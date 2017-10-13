import test from 'tape'
import parser from '../'

test('parse elementary hello world app', t => {
  const el = `
  <function name="get" path handler data>
    <js>data.get(path, (req, res) => handler({req, res}))</js>
  </function>

  <function name="listen" data port>
    <js>data.listen(port)</js>
  </function>


  <export default="{get, listen}" />

  `

  parser(el, (err, code) => {
    console.log(code)
    t.equals(
      code,
      'import exec from "./exec"\n\nfunction makegreeting({ text }) {\n  return function greet({ text2 }) {\n    return text + " " + text2\n  }\n}\nexport default makegreeting\n'
    )
    t.end()
  })
})
