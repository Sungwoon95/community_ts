import express, { Request, Response } from 'express';
import morgan from 'morgan';
import { AppDataSource } from "./data-source"
import { authRoute } from './routes/auth'
import cors from 'cors'
import { subsRoute } from './routes/subs';
import { CustomRoute } from './types';
import dotenv from 'dotenv'

const app = express();

app.use(express.json())
// Request에서 json 형식의 데이터를 받으면 undefined가 출력됨. express.json()을 사용하면 Request에서 json 형식의 데이터를 제대로 받을 수 있음
app.use(morgan('dev'))

const origin = 'http://localhost:3000'
app.use(cors({ origin, credentials: true }))
// CORS 에러 해결

dotenv.config()

app.get('/', (_, res) => {
  res.send('hit')
})

// const routes = [authRoute]
// routes.forEach(() => {
//   console.log(routes)
// })



const customRoutes: CustomRoute[] = [...authRoute, ...subsRoute]

customRoutes.forEach(({ method, route, handler }) => {
  app[method](route, handler)
})

const PORT = 4000;

app.listen(PORT, async () => {
  console.log(`on ${PORT}`)
  AppDataSource.initialize().then(async () => {
    console.log(customRoutes)
  }).catch(error => console.log(error))

})