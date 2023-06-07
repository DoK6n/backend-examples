import { Application, Request, Response } from 'express'
import express from 'express'
import bodyParser from 'body-parser'
import 'dotenv/config'

const app: Application = express()
const PORT = process.env.PORT || 8001

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', (req: Request, res: Response) => {
  // console.dir(req, { depth: Infinity });
  // console.dir(req, { showHidden: true, depth: null });

  res.send('ok!')
})

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`)
})
