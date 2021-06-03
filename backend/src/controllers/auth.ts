import { Request, Response } from 'express'
var jwt = require('jsonwebtoken')
import UserModel from './../models/user';
import { sendEmailWithNodemailer } from './../helpers/email';
import generateToken from './../utils/generateToken';


export const signup = (req: Request, res: Response) => {
    const { name, email, password } = req.body
    UserModel.findOne({ email }).exec((err, user) => {
        if (user) {
            return res.status(400).json({
                error: '이미 가입된 이메일 주소입니다'
            })
        }

        const token = jwt.sign({ name, email, password }, `${process.env.JWT_ACCOUNT_ACTIVATION}`, { expiresIn: '10m' })

        const emailData = {
          from: `${process.env.EMAIL_FROM}`, // MAKE SURE THIS EMAIL IS YOUR GMAIL FOR WHICH YOU GENERATED APP PASSWORD
          to: email, // WHO SHOULD BE RECEIVING THIS EMAIL? IT SHOULD BE THE USER EMAIL (VALID EMAIL ADDRESS) WHO IS TRYING TO SIGNUP
          subject: '우아한 노션 계정 활성화',
          html: `
                <h1>계정 활성화를 위해 다음 링크를 클릭해주세요</h1>
                <p>${process.env.CLIENT_URL}/auth/activate/${token}</p>
                <hr />
                <p>본 메일에는 민감한 정보가 포함될 수 있습니다.</p>
                <p>${process.env.CLIENT_URL}</p>
            `,
        }

        sendEmailWithNodemailer(req, res, emailData)
    })
}

interface VerifiedUserType {
  id: number
  iat: number
  exp: number
}

export const accountActivation = (req: Request, res: Response) => {
    const { token } = req.body

    if (token) {
        jwt.verify(token, `${process.env.JWT_ACCOUNT_ACTIVATION}`, function (err: string, decoded: VerifiedUserType) {
          if (err) {
            console.log('JWT VERIFY IN ACCOUNT ACTIVATION ERROR', err)
            return res.status(401).json({
              error: '링크가 만료되었습니다. 다시 회원가입해주세요.',
            })
          }

            const { name, email, password } = jwt.decode(token)
            
            const user = new UserModel({ name, email, password })

            user.save((err, user) => {
                if (err) {
                    console.log('SAVE USER IN ACCOUNT ACTIVATION ERROR', err)
                    return res.status(401).json({
                      error: '데이터베이스에 계정을 저장하지 못했습니다. 회원가입을 다시 시도해주세요.',
                    })
                }
                return res.json({
                    message: '성공적으로 회원가입되었습니다. 로그인해주세요.'
                })
            })
        })
    } else {
        return res.json({
          message: '다시 시도해주세요.',
        })
    }
}

export const signin = async (req: Request, res: Response) => {
    const { email, password } = req.body
    
    const user = await UserModel.findOne({ email })

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        })
    } else {
        if (!user) {
          return res.status(400).json({
            error: '가입하지 않은 이메일 주소입니다',
          })
        }

        if (user && !user.matchPassword(password)) {
          return res.status(400).json({
            error: '이메일 주소와 비밀번호가 일치하지 않습니다',
          })
        }
    }
    
}
