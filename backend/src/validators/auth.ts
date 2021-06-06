import { check } from 'express-validator'

export const userSignUpValidator = [
    check('name')
        .not()
        .isEmpty()
        .withMessage('이름을 입력해주세요'),
    check('email')
        .isEmail()
        .withMessage('이메일 주소가 유효하지 않습니다'),
    check('password')
        .isLength({ min: 6 })
        .withMessage('비밀번호는 최소 6자 이상이어야 합니다')]

export const userSignInValidator = [
    check('email')
        .isEmail()
        .withMessage('이메일 주소가 유효하지 않습니다'),
    check('password')
        .isLength({ min: 6 })
        .withMessage('비밀번호는 최소 6자 이상이어야 합니다')]

export const forgotPasswordValidator = [
    check('email')
        .not()
        .isEmpty()
        .isEmail()
        .withMessage('이메일 주소가 유효하지 않습니다')
]

export const resetPasswordValidator = [
    check('newPassword')
        .not()
        .isEmpty()
        .isLength({ min: 6 })
        .withMessage('비밀번호는 최소 6자 이상이어야 합니다')
]
