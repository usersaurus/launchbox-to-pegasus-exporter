import express from 'express'
import { getCurrentPlatforms } from './src/back/dirUtils'

const app = express()

app.get('/', (req, res, next) => {
  next()
})

app.get('/getPlatforms', async (req, res, next) => {
  const platforms = await getCurrentPlatforms('D:/LaunchBox')
  res.json(JSON.parse(platforms))

  next()
})

export const handler = app
