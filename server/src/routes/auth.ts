import { Request, Response, Router } from 'express'
import User from '../entity/User'
import { isEmpty, validate } from 'class-validator'
import { Method } from '../types'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import cookie from 'cookie'


export const authRoute = [
  {
    method: Method.GET,
    route: '/api/auth/register',
    handler: (req: Request, res: Response) => {
      res.send('wad')
    }
  },
  // 회원 가입
  {
    method: Method.POST,
    route: '/api/auth/register',
    handler: async (req: Request, res: Response) => {
      const { isEmail, isUsername, isPassword } = req.body
      try {
        let errors: any = {};

        // 중복 이메일, 중복 유저 확인
        const findEmail = await User.findOneBy({ email: isEmail })
        const findUser = await User.findOneBy({ username: isUsername })

        // 중복인 경우 에러 메시지
        if (findEmail) errors.email = '이미 사용된 이메일입니다.'
        if (findUser) errors.user = '이미 사용된 이름입니다.'

        // 중복이 하나라도 있는 경우 에러 메시지 출력 
        if (Object.keys(errors).length > 0) {
          return res.status(400).json(errors)
        }

        // 새로운 유저 생성
        const user = new User();
        user.email = isEmail;
        user.password = isPassword;
        user.username = isUsername;

        // 유저 정보 저장
        await user.save()
        return res.send(user)
      } catch (error) {
        console.error(error)
        return res.status(500).json({ error })
      }
    }
  },
  {// 로그인
    method: Method.POST,
    route: '/api/auth/login',
    handler: async (req: Request, res: Response) => {
      const { isUsername, isPassword } = req.body
      try {

        // 빈 문자열이면 리턴
        if (isEmpty(isUsername)) return
        if (isEmpty(isPassword)) return

        // 유저 찾기
        const findUser = await User.findOneBy({ username: isUsername })
        if (!findUser) return res.status(404).json({ username: '해당 유저가 존재하지 않습니다' })

        const passwordCompare = await bcrypt.compare(isPassword, findUser.password)
        if (!passwordCompare) {
          return res.status(401).json({ password: '비밀번호가 일치하지 않습니다.' })
        }

        const token = jwt.sign({ username: isUsername }, process.env.JWT_SECRET!)
        console.log(token)
        // res.json({ token })
        res.set('Set-Cookie', cookie.serialize('token', token, {
          httpOnly: true, maxAge: 60 * 60 * 24, path: '/'
        }));
        return res.json({ findUser, token })
      } catch (error) {
        console.error('login', error)
        return res.status(500).json({ error })
      }
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
