import express from 'express'
// import controller
import { signup, signin, accountActivation } from '../controllers/auth'
// import validators
import { userSignInValidator, userSignUpValidator } from './../validators/auth';
import { runValidation } from './../validators/index';

const router = express.Router()

router
    .route('/signup')
    .post(userSignUpValidator, runValidation, signup)
router.post('/account-activation', accountActivation)
router.post('/signin', userSignInValidator, runValidation, signin)

export { router }
