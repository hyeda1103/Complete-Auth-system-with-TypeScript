import express from 'express'
// import controller
import { signup, signin, signInWithGoogle, accountActivation, forgotPassword, resetPassword, closeAccount } from '../controllers/auth'
// import validators
import { userSignInValidator, userSignUpValidator, forgotPasswordValidator, resetPasswordValidator } from './../validators/auth'
import { runValidation } from './../validators/index';
import { protect } from './../middleware/auth'

const router = express.Router()

router
    .route('/signup')
    .post(userSignUpValidator, runValidation, signup)
router.post('/google-signin', signInWithGoogle)
router.post('/account-activation', accountActivation)
router.post('/signin', userSignInValidator, runValidation, signin)
router.put('/forgot-password', forgotPasswordValidator, runValidation, forgotPassword)
router.put('/reset-password', resetPasswordValidator, runValidation, resetPassword)
router.route('/:id').delete(protect, closeAccount)

export { router }
