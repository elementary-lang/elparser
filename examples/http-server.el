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
