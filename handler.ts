import express from 'express'
import { getCurrentPlatforms, getGames } from './src/back/dirUtils'
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

export const handler = app
