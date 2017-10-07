function get({ path, handler, data }) {
  return data.get(path, (req, res) => handler({ req, res }))
}

function listen({ data, port }) {
  return data.listen(port)
}
export default { get, listen }
