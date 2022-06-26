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
  - axxess token만료 3분 전에 reissue 실행.
    - access token과 refresh token을 security로 전송.
    - db에 저장된 refresh token과 요청받은 refresh token이 일치하면 - A 를 재실행.
    - refresh token이 만료될 때까지 반복.
  - 권한이 필요한 모든 요청에 대해서는 cookie의 access token을 헤더로 요청.
