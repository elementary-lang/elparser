import test from 'tape'
import parser from '../'

test('parse elementary hello world app', t => {
  const el = `
<import as="http" from="http" />
<function name="server" data>
  <js>http.createServer(function (req, res) { data({req, res}) })</js>
</function>

<function name="listen" port data>
  <js>data.listen(port)</js>
</function>

<listen port="3000">
  <server>
    <function name="handler" req res>
      <js>res.end('Hello World')</js>
    </function>
  </server>
</listen>
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
