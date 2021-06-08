import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import UserModel from './../models/user';
import { sendEmailToActivateAccount, sendEmailToResetPassword } from './../helpers/email'
import generateToken from './../utils/generateToken';
import { OAuth2Client } from 'google-auth-library';
var _ = require('lodash')
var jwt = require('jsonwebtoken')

// @desc    Register a new user
// @route   POST /api/user/signup
// @access  Public
export const signup = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body

  UserModel.findOne({ email }).exec((err, user) => {
    if (user) {
      return res.status(400).json({
        error: '이미 가입되어 있는 이메일 주소입니다',
      })
    }

    const token = jwt.sign({ name, email, password }, process.env.JWT_ACCOUNT_ACTIVATION, { expiresIn: '10m' })

    const emailData = {
      from: `${process.env.EMAIL_FROM}`, // MAKE SURE THIS EMAIL IS YOUR GMAIL FOR WHICH YOU GENERATED APP PASSWORD
      to: email, // WHO SHOULD BE RECEIVING THIS EMAIL? IT SHOULD BE THE USER EMAIL (VALID EMAIL ADDRESS) WHO IS TRYING TO SIGNUP
      subject: '우아한 글쓰기 계정 활성화',
      html: `
          <h1>계정 활성화를 위해 다음 링크를 클릭해주세요.</h1>
          <p>${process.env.CLIENT_URL}/auth/activate/${token}</p>
          <hr />
          <p>본 메일에는 민감한 정보가 포함될 수 있습니다.</p>
          <p>${process.env.CLIENT_URL}</p>
        `,
    }

    sendEmailToActivateAccount(req, res, emailData)
  })
  
})


interface VerifiedUserType {
  id: number
  iat: number
  exp: number
}

// @desc    Activate account
// @route   POST /api/user/account-activation
// @access  Public
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

// @desc    Sign In with Email
// @route   POST /api/user/signin
// @access  Public
export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await UserModel.findByEmail(email);

  if (user && (await user.matchPassword(password))) {
    const { _id, name, email, role } = user
    res.json({
      _id,
      name,
      email,
      role,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({
      error: "이메일 또는 비밀번호가 올바르지 않습니다"
    });
  }
}

// @desc    Login with google
// @route   POST /api/user/google-signin
// @access  Public
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
export const signInWithGoogle = async (req: Request, res: Response) => {
  const { idToken } = req.body
  const ticket = await client.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_CLIENT_ID
  }).then((response) => {
    if (response.getPayload() && response.getPayload()?.email_verified) {
      const email = response.getPayload()?.email
      const name = response.getPayload()?.name

      UserModel.findOne({ email }).exec((err, user) => {
        if (user) {
          const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
          })
          const { _id, email, name, role } = user
          return res.json({
            _id,
            name,
            email,
            role,
            token
          })
        } else {
          const password = `${email}${process.env.JWT_SECRET}`
          user = new UserModel({ name, email, password });
          user.save((err, data) => {
            if (err) {
              console.log("ERROR GOOGLE LOGIN ON USER SAVE", err)
              return res.status(400).json({
                error: "구글 로그인에 실패하였습니다"
              })
            }
            const token = jwt.sign(
              { _id: data._id },
              process.env.JWT_SECRET,
              {
                expiresIn: "7d"
              }
            )
            const { _id, email, name, role } = data
            return res.json({
              _id,
              name,
              email,
              role,
              token
            })
          })
        }
      })
    }
  })
}

// @desc    Forgot password
// @route   PUT /api/user/forgot-password
// @access  Public
export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body
  UserModel.findOne({ email }, (err: any, user: any) => {
    if (err || !user) {
      return res.status(400).json({
        error: '가입하지 않은 이메일입니다',
      })
    }
    const token = jwt.sign({ _id: user._id, name: user.name }, process.env.JWT_RESET_PASSWORD, {
      expiresIn: '10m',
    })
    const emailData = {
      from: `${process.env.EMAIL_FROM}`, // MAKE SURE THIS EMAIL IS YOUR GMAIL FOR WHICH YOU GENERATED APP PASSWORD
      to: email, // WHO SHOULD BE RECEIVING THIS EMAIL? IT SHOULD BE THE USER EMAIL (VALID EMAIL ADDRESS) WHO IS TRYING TO SIGNUP
      subject: '비밀번호 재설정 링크',
      html: `
                <h1>다음 링크를 클릭하여 비밀번호 재설정을 완료하세요.</h1>
                <p>${process.env.CLIENT_URL}/auth/password/reset/${token}</p>
                <hr />
                <p>본 메일에는 민감한 정보가 포함될 수 있습니다.</p>
                <p>${process.env.CLIENT_URL}</p>
            `,
    }

    return user.updateOne({ resetPasswordLink: token }, (err: any, success: any) => {
      if (err) {
        console.log('RESET PASSWORD LINK ERROR', err)
        return res.status(400).json({
          error: '비밀번호 재설정 요청에 대한 데이터베이스 연결이 불안정합니다',
        })
      } else {
        sendEmailToResetPassword(req, res, emailData)
      }
    })
  })
}

// @desc    Reset password
// @route   PUT /api/user/reset-password
// @access  Public
export const resetPassword = (req: Request, res: Response) => {
  const { resetPasswordLink, newPassword } = req.body

  if (resetPasswordLink) {
    jwt.verify(resetPasswordLink, process.env.JWT_RESET_PASSWORD, function (err: any, decoded: VerifiedUserType) {
      if (err) {
        return res.status(400).json({
          error: '만료된 링크입니다. 비밀번호 재설정을 다시 시도해주세요.',
        })
      }

      UserModel.findOne({ resetPasswordLink }, (err: any, user: any) => {
        if (err || !user) {
          return res.status(400).json({
            error: '비밀번호 재설정이 완료되지 않았습니다. 잠시 후에 다시 시도해주세요.',
          })
        }

        const updatedFields = {
          password: newPassword,
          resetPasswordLink: '',
        }

        user = _.extend(user, updatedFields)

        user.save((err: any, result: any) => {
          if (err) {
            return res.status(400).json({
              error: '비밀번호 재설정하는 도중 에러가 발생하였습니다',
            })
          }
          res.json({
            message: '성공적으로 비밀번호 재설정되었습니다. 새로운 비밀번호로 로그인해주세요.',
          })
        })
      })
    })
  }
}

// @desc    Get user profile
// @route   GET /api/user/profile
// @access  Private
export const getProfile = asyncHandler(async (req: any, res: Response) => {
  const user = await UserModel.findById(req.user._id);
  if (user) {
    const {_id, name, email, role} = user
    res.json({
      _id,
      name,
      email,
      role
    });
  } else {
    res.status(404);
    throw new Error("계정이 존재하지 않습니다");
  }
})

// @desc    Update user profile
// @route   PUT /api/user/profile
// @access  Private
export const updateProfile = asyncHandler(async (req: any, res: Response) => {
  const user = await UserModel.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
  
    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("계정이 존재하지 않습니다");
  }
});

// @desc    Close account
// @route   DELETE /api/user/:id
// @access  Private
export const closeAccount = asyncHandler(async (req, res) => {
  const user = await UserModel.findById(req.params.id);
  if (user) {
    await user.remove();
    res.json({ message: "계정이 삭제되었습니다. 다음에 또 만나요." });
  } else {
    res.status(404);
    throw new Error("계정이 존재하지 않습니다");
  }
});
