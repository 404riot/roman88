# roman88

tech
- spring boot 2.5.2
- spring security
- java 8
- jpa / jpql

- gradle 7 (7.1.1)

- mysql 8 (8.0.29)

- react 8 (8.6.0)
- axios

로그인 방식
- spring security / jwt
  - spring security를 통해 access token과 refresh token을 발급받음.  - A
  - refresh token은 db에 user id와 함께 저장 후 localstorge에 저장
  - access token은 cookie에 저장.
  - access token의 payload에서 token의 expired time을 가져와 cookie에 저장.
  - refresh되는 경우에도 cookie의 expired time을 가져와 현재시간과 비교.
  - access token만료 3분 전에 reissue 실행.
    - access token과 refresh token을 security로 전송.
    - db에 저장된 refresh token과 요청받은 refresh token이 일치하면 - A 를 재실행.
    - refresh token이 만료될 때까지 반복.
  - 권한이 필요한 모든 요청에 대해서는 cookie의 access token을 헤더로 요청.

사용자 정보
- 최초 로그인 시 user data를 가져와 React의 useState로 관리.
- 유저 정보의 수정은
  - setState로 변경된 내용 사용자에게 표시 및 jqpl update
    - db update후 사용자 정보를 다시 가져오지 않음.
    - 사용자는 본인이 변경한 내용을 확인만 하면 되므로 이는 useState만을 이용해서 보여줌.
    - 따라서 db에 update된 내용과 이 때 useState에 존재하는 내용은 동일함. - 중복되는 데이터 요청 방지.

Email
- email code
  - java main sender 사용

- contact email
  - mail js 사용

Address
- Daum postcode API 사용

Refresh
- React와 spring boot를 함께 build 후 생성되는 war 파일 실행시 새로고침에서 404에러 발생.
- spring boot에 react 라우터의 주소와 매핑되는 주소가 없기 때문.
- ctrl의 CustomErrorController에서 404error 발생 시 frontend/src/index.html를 리턴.

Run
root 디렉토리에서
  - src/main/Frontend npm start : 3000번 포트에서 리액트 확인
  - spring boot run : 8000번 포트에서 spring boot 확인

Build
- gradle build 시 react도 동시에 자동 빌드되어 war파일로 빌드됨.
  - build.gradle 하단의 코드 확인.
