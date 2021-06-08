# Complete Auth System (MERN with TS)

> MERN 스택과 타입스크립트로 쓴 회원 인증 시스템입니다 + 라이트/다크 모드

- [일반 정보](#일반-정보)
- [설정](#설정)
- [주요 기능](#주요-기능)
- [기술](#기술)
- [참고](#참고)
- [라이선스](#라이선스)

### 일반 정보

- 친구들끼리 공유할 수 있는 미니 문서 에디터를 만들어 봅니다.
- 본 프로젝트는 우아한 테크러닝 4기(2021-06-01 ~ 2021-06-30)와 함께 합니다.

### 설정

다음과 같이 `yarn`을 사용하여 프로젝트를 실행할 수 있습니다:

```
$ cd ../complete-auth-system-with-typescript
$ yarn
$ yarn start
```

프로젝트의 백엔드에서 설정해야 하는 환경 변수(`.env`)는 다음과 같습니다:

```
NODE_ENV=development
PORT=서버 포트번호
CLIENT_URL=클라이언트 URL
MONGO_URI=몽고 DB URI 
EMAIL_FROM=Gmail 주소
EMAIL_FROM_PASSWORD=Gmail 앱 비밀번호
JWT_SECRET=토큰 생성을 위한 무작위 일련번호
JWT_ACCOUNT_ACTIVATION=계정 활성화를 위한 무작위 일련번호
JWT_RESET_PASSWORD=비밀번호 재설정을 위한 무작위 일련번호
GOOGLE_CLIENT_ID=구글 로그인을 위해 발급받은 CLIENT_ID
```

프로젝트의 프론트에서 설정해야 하는 환경 변수(`.env`)는 다음과 같습니다:

```
REACT_APP_GOOGLE_CLIENT_ID=구글 로그인을 위해 발급받은 CLIENT_ID
```
### 주요 기능

- [x] 구글 로그인
- [x] 회원 가입
- [x] 로그인
- [x] 회원 탈퇴
- [x] 프로필 업데이트
- [x] 이메일 인증
- [x] 비밀번호 재설정

- [x] + \alpha 라이트/다크 모드

### 기술

- 본 프로젝트는 `TypeScript`로 작성되었습니다. 
- 프론트 개발에 `React`, 백엔드 개발에 `Node.js`와 `Express`, 그리고 `MongoDB`를 데이터베이스로 사용하였습니다.

### 참고
- [How to Create App-Specific Passwords in Gmail](https://www.lifewire.com/get-a-password-to-access-gmail-by-pop-imap-2-1171882)
- [How to build Google login into a React app and Node/Express API](https://blog.prototypr.io/how-to-build-google-login-into-a-react-app-and-node-express-api-821d049ee67)

### 라이선스
