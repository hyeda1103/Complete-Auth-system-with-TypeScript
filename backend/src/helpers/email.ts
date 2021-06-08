import { Request, Response } from 'express'
import nodeMailer from "nodemailer"

export const sendEmailToActivateAccount = (req: Request, res: Response, emailData: object) => {
  const transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: `${process.env.EMAIL_FROM}`, // MAKE SURE THIS EMAIL IS YOUR GMAIL FOR WHICH YOU GENERATED APP PASSWORD
      pass: `${process.env.EMAIL_FROM_PASSWORD}`, // MAKE SURE THIS PASSWORD IS YOUR GMAIL APP PASSWORD WHICH YOU GENERATED EARLIER
    },
    tls: {
      ciphers: 'SSLv3',
    },
  })

  return transporter
    .sendMail(emailData)
    .then((info) => {
      console.log(`Message sent: ${info}`)
      return res.json({
        message: `회원가입한 이메일 주소로 이메일이 발신되었습니다. 계정을 활성화해주세요.`,
      })
    })
    .catch((err) => console.log(`Problem sending email: ${err}`))
}

export const sendEmailToResetPassword = (req: Request, res: Response, emailData: object) => {
  const transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: `${process.env.EMAIL_FROM}`, // MAKE SURE THIS EMAIL IS YOUR GMAIL FOR WHICH YOU GENERATED APP PASSWORD
      pass: `${process.env.EMAIL_FROM_PASSWORD}`, // MAKE SURE THIS PASSWORD IS YOUR GMAIL APP PASSWORD WHICH YOU GENERATED EARLIER
    },
    tls: {
      ciphers: 'SSLv3',
    },
  })

  return transporter
    .sendMail(emailData)
    .then((info) => {
      console.log(`Message sent: ${info}`)
      return res.json({
        message: `입력한 이메일 주소로 비밀번호 재설정을 위한 링크가 발신되었습니다.`,
      })
    })
    .catch((err) => console.log(`Problem sending email: ${err}`))
}
