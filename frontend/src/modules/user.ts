import axios from 'axios'
import { Dispatch } from "redux"

// 사용자에 대한 액션 타입 만들기
// 회원가입
const USER_SIGNUP_REQUEST = "user/SIGNUP_REQUEST" as const;
const USER_SIGNUP_SUCCESS = "user/SIGNUP_SUCCESS" as const;
const USER_SIGNUP_FAIL = "user/SIGNUP_FAIL" as const;
const USER_SIGNOUT = "user/SIGNOUT" as const;

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
        payload: error.response.data.error,
    })
  }
}

// 로그아웃
export const signout = () => (dispatch: Dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_SIGNOUT });
};

interface signUpAction {
  type: 
    typeof USER_SIGNUP_REQUEST | 
    typeof USER_SIGNUP_SUCCESS | 
    typeof USER_SIGNUP_FAIL |
    typeof USER_SIGNOUT
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
    case USER_SIGNOUT:
      return {};
    default:
      return state
  }
}

// 사용자에 대한 액션 타입 만들기
// 로그인
const USER_SIGNIN_REQUEST = 'user/SIGNIN_REQUEST' as const
const USER_SIGNIN_SUCCESS = 'user/SIGNIN_SUCCESS' as const
const USER_SIGNIN_FAIL = 'user/SIGNIN_FAIL' as const

// 액션 생성함수를 선언
// 로그인
export const signIn = (email: string, password: string) => async (dispatch: Dispatch) => {
  try {
    dispatch({
      type: USER_SIGNIN_REQUEST
    })

    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }

    const { data } = await axios.post(
      "/api/user/signin",
      { email, password },
      config
    )

    dispatch({
      type: USER_SIGNIN_SUCCESS,
      payload: data
    })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload: error.response.data.error
    })
  }
}

interface signInAction {
  type: typeof USER_SIGNIN_REQUEST | typeof USER_SIGNIN_SUCCESS | typeof USER_SIGNIN_FAIL,
  payload: any
}

interface signInState {
  loading?: boolean;
  userInfo?: any;
  error?: string;
}

export const signInReducer = (state: signInState = {}, action: signInAction):signInState => {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return { loading: true }
    case USER_SIGNIN_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case USER_SIGNIN_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

// 사용자에 대한 액션 타입 만들기
// 계정 활성화
const USER_ACTIVATE_REQUEST = "user/ACTIVATE_REQUEST" as const;
const USER_ACTIVATE_SUCCESS = "user/ACTIVATE_SUCCESS" as const;
const USER_ACTIVATE_FAIL = "user/ACTIVATE_FAIL" as const;

export const activate = (token: string) => async (dispatch: Dispatch) => {
  try {
    dispatch({
      type: USER_ACTIVATE_REQUEST
    })

    const config = {
      headers: {
        "Content-Type": "application/json",
      }
    }

    const { data } = await axios.post(
      '/api/user/account-activation',
      { token },
      config
    )

    dispatch({
      type: USER_ACTIVATE_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: USER_ACTIVATE_FAIL,
      payload: error.response.data.error
    })
  }
} 

interface activateAction {
  type: typeof USER_ACTIVATE_REQUEST | typeof USER_ACTIVATE_SUCCESS | typeof USER_ACTIVATE_FAIL,
  payload: any
}

interface activateState {
  loading?: boolean;
  response?: any;
  error?: string; 
}

export const activateReducer = (state: activateState = {}, action: activateAction): activateState => {
  switch (action.type) {
    case USER_ACTIVATE_REQUEST:
      return { loading: true };
    case USER_ACTIVATE_SUCCESS:
      return { loading: false, response: action.payload };
    case USER_ACTIVATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}
