import axios from 'axios'
import { Dispatch } from "redux"

// 사용자에 대한 액션 타입 만들기
// 회원가입
const USER_SIGNUP_REQUEST = "user/SIGNUP_REQUEST" as const;
const USER_SIGNUP_SUCCESS = "user/SIGNUP_SUCCESS" as const;
const USER_SIGNUP_FAIL = "user/SIGNUP_FAIL" as const;

// 액션 생성함수를 선언
// 회원가입
export const signUp = (name: string, email: string, password: string) => async (dispatch: Dispatch) => {
  try {
    dispatch({
      type: USER_SIGNUP_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/api/user/signup',
      { name, email, password },
      config
    )

    dispatch({
      type: USER_SIGNUP_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: USER_SIGNUP_FAIL,
        payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
    })
  }
}

interface signUpAction {
  type: typeof USER_SIGNUP_REQUEST | typeof USER_SIGNUP_SUCCESS | typeof USER_SIGNUP_FAIL
  payload: any
}

interface IMessage {
  error?: string
  message?: string
}

interface signUpState {
    loading?: boolean;
    response?: IMessage;
    error?: string
}


// 사용자에 대한 리듀서 선언
// 회원가입
export const signUpReducer = (state: signUpState = {}, action: signUpAction): signUpState => {
  switch (action.type) {
    case USER_SIGNUP_REQUEST:
      return { loading: true }
    case USER_SIGNUP_SUCCESS:
      return { loading: false, response: action.payload }
    case USER_SIGNUP_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
