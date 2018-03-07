# DanHaNa

 'DanHaNa'는 1주일에 단 하나의 미션을 지킬 수 있도록 도와주는 목표 관리 웹 앱이다. 

## Try Demo

### 1. 프로젝트 클론 후 npm모듈 설치

```t
# install node and npm.
$ git clone https://github.com/BeomyeonAndrewKim/DanHaNa.git && cd DanHaNa
$ npm install
```

### 2. Firebase 작동을 위한 환경변수 설정

Firebase에서 테스트용 프로젝트를 생성한다. 그 후 루트 디렉토리에 ```.env.local``` 파일을 생성 후 아래의 형식에 맞추어 설정값을 입력한다.

```
REACT_APP_API_KEY=apiKey
REACT_APP_AUTH_DOMAIN=authDomain
REACT_APP_DATABASE_URL=databaseURL
REACT_APP_PROJECT_ID=projectId
REACT_APP_STORAGE_BUCKET=storageBucket
REACT_APP_MESSAGING_SENDER_ID=messagingSenderId
NODE_ENV="production"//ServiceWorker 테스트시 
```

### 3. npm 개발서버 구동

```javascript
$ npm start
```

## Tech Stack

- React
- Redux(+thunk)
- React Router
- React Helmet
- Firebase Auth, Database, Storage
- Ant Design
- Styled Components
- Storybook
- Recharts(차트), lodash(throttle), html2canvas(스크린샷), React-dates(달력)







