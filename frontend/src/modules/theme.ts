// 액션 타입을 선언
// 뒤에 as const 를 붙여줌으로써 나중에 액션 객체를 만들게 action.type 의 값을 추론하는 과정에서
// action.type 이 string 으로 추론되지 않고 'counter/INCREASE' 와 같이 실제 문자열 값으로 추론되도록 함
const LIGHT = 'theme/LIGHT' as const
const DARK = 'theme/DARK' as const

// 액션 생성함수를 선언
export const turnOn = () => ({
  type: LIGHT,
})
export const turnOff = () => ({
  type: DARK,
})

interface themeAction {
  type: typeof LIGHT | typeof DARK
}

// 리덕스 모듈에서 관리할 상태의 타입 선언
type themeState = {
  lightOn: boolean
}

// 초기상태를 선언
const initialState: themeState = {
  lightOn: true,
}

// 리듀서 작성
export const switchThemeReducer = (state: themeState = initialState, action: themeAction): themeState => {
  switch (action.type) {
    case LIGHT:
      return {
        lightOn: true,
      }
    case DARK:
      return {
        lightOn: false,
      }
    default:
      return state
  }
}
