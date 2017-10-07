import express from 'express'
import s from './helpers'

function hello({ req, res }) {
  return res.send('Hello There')
}

function root({ req, res }) {
  return res.send('Hello Express')
}
s.listen({
  port: 3000,
  data: s.get({
    path: '/hello',
    handler: hello,
    data: s.get({ path: '/', handler: root, data: express() })
  })
})
