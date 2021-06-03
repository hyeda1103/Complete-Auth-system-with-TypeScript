import jwt from 'jsonwebtoken'

const generateToken = (_id: string) => {
  return jwt.sign({ _id }, `${process.env.JWT_SECRET}`, {
    expiresIn: '7d',
  })
}

export default generateToken
