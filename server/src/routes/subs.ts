import { Request, Response, Router } from 'express'
import { Method } from '../types'

export const subsRoute = [
  {
    method: Method.GET,
    route: '/api/subs/register',
    handler: (req: Request, res: Response) => {
      console.log('회원가입')
    }
  },
  {
    method: Method.POST,
    route: '/api/auth/register',
    handler: (req: Request, res: Response) => {
      console.log('회원가입 포스트')
    }
  }
]

// const register = async (req: Request, res: Response) => {
//   const { isEmail, isUsername, isPassword } = req.body
//   console.log(Object.values(req.body))
// }

// const router = Router()
// router.post('/register', register).get('/register', (req: Request, res: Response) => {
//   res.send('/')
// });

// export default router
