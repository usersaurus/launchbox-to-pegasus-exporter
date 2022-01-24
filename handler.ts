import express from 'express'
import {
  getCurrentPlatforms,
  getGames,
  createMetadata,
} from './src/back/dirUtils'
import bodyParser from 'body-parser'

const app = express()
app.use(bodyParser.json()) // body en formato json
app.use(bodyParser.urlencoded({ extended: false })) //body formulario

app.get('/', (_req, _res, next) => {
  next()
})

app.post('/getPlatforms', async (req, res, next) => {
  const platforms = await getCurrentPlatforms(req.body.path)
  res.send(JSON.parse(platforms))

  next()
})

app.post('/getGames', async (req, res, next) => {
  const games = await getGames(req.body.path, req.body.platform)
  res.send(JSON.parse(games))

  next()
})

app.post('/createMetadata', async (req, res, next) => {
  const response = await createMetadata(req.body.path, req.body.platforms)
  res.send(response)

  next()
})

export const handler = app
