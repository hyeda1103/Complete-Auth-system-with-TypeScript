import axios from 'axios'
import { Action, Dispatch } from "redux"
import { ThunkAction } from 'redux-thunk';
import { RootState } from '.';


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

// 구글 로그인 액션 타입
const USER_GOOGLE_SIGNIN_REQUEST = 'user/GOOGLE_SIGNIN_REQUEST' as const;
const USER_GOOGLE_SIGNIN_SUCCESS = 'user/GOOGLE_SIGNIN_SUCCESS' as const
const USER_GOOGLE_SIGNIN_FAIL = 'user/GOOGLE_SIGNIN_FAIL' as const

// 구글 로그인 액션 생성함수 선언
export const signInWithGoogle = (idToken: string) => async (dispatch: Dispatch) => {
  try {
    dispatch({
      type: USER_GOOGLE_SIGNIN_REQUEST,
    })

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/user/google-signin",
      { idToken },
      config
    );

    dispatch({
      type: USER_GOOGLE_SIGNIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_GOOGLE_SIGNIN_FAIL,
      payload: error.response.data.error,
    })
  }
};

interface googleSignInAction {
  type: typeof USER_GOOGLE_SIGNIN_REQUEST | typeof USER_GOOGLE_SIGNIN_SUCCESS | typeof USER_GOOGLE_SIGNIN_FAIL | typeof USER_SIGNOUT
  payload: any
}

interface googleSignInState {
  loading?: boolean;
  userInfo?: any;
  error?: string;
}


// 구글 로그인
export const googleSignInReducer = (state: googleSignInState = {}, action: googleSignInAction): googleSignInState => {
  switch (action.type) {
    case USER_GOOGLE_SIGNIN_REQUEST:
      return { loading: true }
    case USER_GOOGLE_SIGNIN_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case USER_GOOGLE_SIGNIN_FAIL:
      return { loading: false, error: action.payload }
    case USER_SIGNOUT:
      return {}
    default:
      return state
  }
};


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

// 비밀번호 재설정 요청
const USER_PASSWORD_FORGOT_REQUEST = "user/PASSWORD_FORGOT_REQUEST" as const;
const USER_PASSWORD_FORGOT_SUCCESS = "user/PASSWORD_FORGOT_SUCCESS" as const;
const USER_PASSWORD_FORGOT_FAIL = "user/PASSWORD_FORGOT_FAIL" as const;

// 비밀번호 재설정 요청에 대한 액션 생성함수 만들기
export const forgotPassword = (email: any) => async (dispatch: Dispatch) => {
  try {
    dispatch({
      type: USER_PASSWORD_FORGOT_REQUEST,
    });

    const { data } = await axios.put(`/api/user/forgot-password`, email);

    dispatch({
      type: USER_PASSWORD_FORGOT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_PASSWORD_FORGOT_FAIL,
      payload: error.response.data.error,
    })
  }
};

interface forgotPasswordAction {
  type: typeof USER_PASSWORD_FORGOT_REQUEST | typeof USER_PASSWORD_FORGOT_SUCCESS | typeof USER_PASSWORD_FORGOT_FAIL
  payload: any
}

interface forgotPasswordState {
  loading?: boolean
  success?: boolean
  email?: any
  error?: string
}

// 비밀번호 재설정에 대한 리듀서 선언
export const forgotPasswordReducer = (state: forgotPasswordState = {}, action: forgotPasswordAction): forgotPasswordState => {
  switch (action.type) {
    case USER_PASSWORD_FORGOT_REQUEST:
      return { loading: true }
    case USER_PASSWORD_FORGOT_SUCCESS:
      return { loading: false, success: true, email: action.payload }
    case USER_PASSWORD_FORGOT_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

// 액션 타입
// 비밀번호 재설정
const USER_PASSWORD_RESET_REQUEST = "user/PASSWORD_RESET_REQUEST" as const;
const USER_PASSWORD_RESET_SUCCESS = "user/PASSWORD_RESET_SUCCESS" as const;
const USER_PASSWORD_RESET_FAIL = "user/PASSWORD_RESET_FAIL" as const;

interface IResetInfo {
  newPassword: string
  resetPasswordLink: string
}
// 액션 생성함수 선언
// 비밀번호 재설정
// 새로운 비밀번호 설정에 대한 액션 생성함수 만들기
export const resetPassword = (resetInfo: IResetInfo) => async (dispatch: Dispatch) => {
  try {
    dispatch({
      type: USER_PASSWORD_RESET_REQUEST,
    })

    const { data } = await axios.put(`/api/user/reset-password`, resetInfo)

    dispatch({
      type: USER_PASSWORD_RESET_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: USER_PASSWORD_RESET_FAIL,
      payload: error.response.data.error,
    })
  }
}

interface resetPasswordAction {
  type: typeof USER_PASSWORD_RESET_REQUEST | typeof USER_PASSWORD_RESET_SUCCESS | typeof USER_PASSWORD_RESET_FAIL
  payload: any
}

interface resetPasswordState {
  loading?: boolean;
  success?: boolean;
  resetInfo?: any;
  error?: string;
}

// 비밀번호 재설정에 대한 리듀서 선언
export const resetPasswordReducer = (state: resetPasswordState = {}, action: resetPasswordAction): resetPasswordState => {
  switch (action.type) {
    case USER_PASSWORD_RESET_REQUEST:
      return { loading: true }
    case USER_PASSWORD_RESET_SUCCESS:
      return { loading: false, success: true, resetInfo: action.payload }
    case USER_PASSWORD_RESET_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

// 액션 타입
// 회원 탈퇴
const USER_CLOSE_ACCOUNT_REQUEST = 'user/CLOSE_ACCOUNT_REQUEST' as const
const USER_CLOSE_ACCOUNT_SUCCESS = 'user/CLOSE_ACCOUNT_SUCCESS' as const
const USER_CLOSE_ACCOUNT_FAIL = 'user/CLOSE_ACCOUNT_FAIL' as const

// 회원탈퇴
export const closeAccount =
  (id: string): ThunkAction<void, RootState, unknown, Action<string>> =>
  async (dispatch: Dispatch, getState) => {
    try {
      dispatch({
        type: USER_CLOSE_ACCOUNT_REQUEST,
      })

      const {
        signIn: { userInfo: userInfoWithEmail },
        googleSignIn: { userInfo: userInfoWithGoogle }
      } = getState()

      const userInfo = userInfoWithEmail || userInfoWithGoogle 

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      const { data } = await axios.delete(`/api/user/${id}`, config)

      dispatch({
        type: USER_CLOSE_ACCOUNT_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: USER_CLOSE_ACCOUNT_FAIL,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message,
      })
    }
  }

interface closeAccountAction {
  type: typeof USER_CLOSE_ACCOUNT_REQUEST | typeof USER_CLOSE_ACCOUNT_SUCCESS | typeof USER_CLOSE_ACCOUNT_FAIL,
  payload: any
}

interface closeAccountState {
  loading?: boolean
  success?: boolean
  error?: string
}

// 회원탈퇴
export const closeAccountReducer = (state: closeAccountState = {}, action: closeAccountAction): closeAccountState => {
  switch (action.type) {
    case USER_CLOSE_ACCOUNT_REQUEST:
      return { loading: true }
    case USER_CLOSE_ACCOUNT_SUCCESS:
      return { loading: false, success: true }
    case USER_CLOSE_ACCOUNT_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
