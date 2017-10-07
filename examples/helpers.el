<function name="get" path handler data>
  <js>data.get(path, (req, res) => handler({req, res}))</js>
</function>

<function name="listen" data port>
  <js>data.listen(port)</js>
</function>


<export default="{get, listen}" />
