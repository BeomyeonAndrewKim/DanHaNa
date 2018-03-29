# DanHaNa

 'DanHaNa'는 1주일에 단 하나의 미션을 지킬 수 있도록 도와주는 목표 관리 웹 앱이다. 

## About Service

#### 1. 미션

- 미션을 추가한다. 
  - 미션, 미션에 관한 메모, 총 단계를 설정할 수 있다.
- 미션을 수정한다.
  -  수정 제한 횟수가 5회이고 그 이상 수정하면 수정이 불가능하다.
- 미션을 체크, 되돌리기를 한다.
  - 미션 체크 단계별로 파도가 차오르는 애니메이션이 작동된다.
- 미션을 완료 상태로 전환한다.
  - 미션을 완료 상태로 전환시 미션완료 스탬프 애니메이션과 팝업이 발생한다.

#### 2. 프로필

- 로그인 시 SNS로그인 정보를 가져와 프로필 정보로 활용한다.(Facebook/Google/Twitter)
- 프로필 수정(사진, 닉네임)이 가능하다.
  - 사진 업로드시 용량 제한이 있다.

#### 3. 캘린더

- 히스토리를 메인 기능으로 한다.
- 주별로 선택이 가능하고 클릭 시 해당 주의 미션에 대한 정보를 보여준다.

#### 4. 통계

- 기간내 미션에 대한 통계를 보여준다.
- 기간 단위는 주, 월, 년 단위로 선택 가능하다.
- 기간내 목표 달성률 / 기각내 목표 단계별 달성률 / 주별 목표 단계별 달성률을 확인할 수 있다.

#### 4. SNS 공유

- 미션 달성 시 페이스북/트위터 공유를 할 수 있다.
- 각 유저마다 미션 달성 페이지를 만들어 공유한다. (미완성)

#### 5. 스크린샷 

- 메인 화면 우측 하단에 카메라 아이콘 클릭시 캔버스 태그의 이미지가 팝업으로 뜬다.
- 저장 버튼 클릭 시 각 기기의 다운로드 폴더로 다운로드 된다.

## Try Demo

### 1. 프로젝트 클론 후 npm모듈 설치

```shell
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

```shell
$ npm start
$ npm run storybook // 스토리북 테스트 시 
```

## Tech Stack

#### 1. Front-end

- React
- Redux(+thunk)
- React Router
- React Helmet
- Ant Design
- Sass
- Storybook
- Recharts(차트), lodash(throttle), html2canvas(스크린샷), React-dates(달력)


#### 2. Back-end(Serverless)

- Firebase Auth, Database, Storage

#### 3. Progressive Web App

- ServiceWorker(create-react-app)
- manifest.json

## Coding Convention

#### 1. ESlint

- Airbnb/react
- Airbnb/javascript
- [.eslintrc](https://github.com/BeomyeonAndrewKim/DanHaNa/blob/master/.eslintrc)

## Database Architecture

```json
{
  "DanHaNa":{
    "users":{
      "uid":{
        "todos":{
          "2018-W08":{
            "todo":"String",
            "meemo":"String",
            "steps":"Number",
            "curStep":"Number",
            "fixcount":"Number",
            "complete":"Boolean"           
          }
        }, 
        "profileInfo":{
          "displayName":"String",
          "photoURL":"String",
          "providerId":"String",
          "uid":"String"
        }
      }
    }
  }
}
```