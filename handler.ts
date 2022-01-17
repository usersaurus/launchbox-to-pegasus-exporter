import express from 'express'
const app = express()

app.get('/', (req, res, next) => {
  console.log('asdasdasd')
  next()
})

export const handler = app
