import { combineReducers } from 'redux'
import sideBar from "./sideBar";
import { signUpReducer, signInReducer, activateReducer, forgotPasswordReducer, resetPasswordReducer, closeAccountReducer } from './user'

const rootReducer = combineReducers({
  sideBar,
  signUp: signUpReducer,
  signIn: signInReducer,
  activate: activateReducer,
  forgotPassword: forgotPasswordReducer,
  resetPassword: resetPasswordReducer,
  closeAccont: closeAccountReducer,
})

// 루트 리듀서를 내보내기
export default rootReducer;

// 루트 리듀서의 반환값 유추
// 추후 이 타입을 컨테이너 컴포넌트에서 불러와서 사용해야 하므로 내보내기
export type RootState = ReturnType<typeof rootReducer>;
