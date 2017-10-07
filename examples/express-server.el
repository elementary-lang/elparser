<import from="express" />
<import as="app" from="./helpers" />

<function name="hello" req res>
  <js>res.send('Hello There')</js>
</function>

<function name="root" req res>
  <js>res.send('Hello Express')</js>
</function>

<app.listen port="3000">
  <app.get path=("/hello") handler=(hello) />
  <app.get path=("/") handler=(root) />
  <js>express()</js>
</app.listen>
