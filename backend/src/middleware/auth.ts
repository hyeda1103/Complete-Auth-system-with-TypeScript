import { Request, Response, NextFunction } from 'express'
import asyncHandler from 'express-async-handler'
import UserModel from '../models/user'
var jwt = require('jsonwebtoken')

export const protect = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      req.user = await UserModel.findById(decoded._id).select('-password')

      next()
    } catch (error) {
      res.status(401)
      throw new Error('Not authorized, token failed')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})
