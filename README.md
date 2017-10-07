# Elementary Language Parser

WIP

This parser will take `elementary` code and compile into javascript code

## Requires

* Node 8.6 or greater with --experimental-modules enabled

## Usage

```
import parser from 'elang-parser'

parser(`
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
`, (err, code) => {
  console.log(code)
})
```
