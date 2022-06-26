import React, {Component, useEffect, useState} from 'react';
import Router from './Routes';
import Watermark from './components/Watermark';
import { setCookie, getCookie, clearCookie } from './Cookies'; 
import axios from 'axios';

const App = () => {
  const [isSigned, setIsSigned] = useState(false);

  axios.defaults.withCredentials = true;
  // 모든 api 요청 헤더에 cookie에 존재하는 accessToken 할당
  const accessTokenFromCookies = getCookie('ROMAN88_ACCESS_TOKEN');
  axios.defaults.headers.common['Authorization'] = `Bearer ${accessTokenFromCookies}`;

  const tokenManager = (accessToken, refreshToken, exp) => {

    clearCookie();
    localStorage.clear();

    if(accessToken != null && refreshToken != null) {

      setCookie('ROMAN88_ACCESS_TOKEN', accessToken, { sameSite: 'lax'});
      setCookie('ROMAN88_ACCESS_TOKEN_EXP', exp, { sameSite: 'lax'});

      // token payload 에서 권한만 가져옴
      let base64Payload = accessToken.split('.')[1]; //value 0 -> header, 1 -> payload, 2 -> VERIFY SIGNATURE
      let payload = Buffer.from(base64Payload, 'base64'); 
      let result = JSON.parse(payload.toString())

      let USER_AUTH = result.auth;
      let USER_ID = result.sub;

      setCookie('ROMAN88_SIGN_USER_AUTH', USER_AUTH, { sameSite : 'lax'});
      setCookie('ROMAN88_SIGN_USER_ID', USER_ID, { sameSite : 'lax'});

      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

      localStorage.setItem("ROMAN88_REFRESH_TOKEN", refreshToken);
      
      // useEffectTrigger
      if(isSigned == false) { setIsSigned(true); } else { setIsSigned(false); } 
    }
  }

  const tokenRefreshManager = () => {

    const jwt = {
      accessToken : getCookie('ROMAN88_ACCESS_TOKEN'),
      refreshToken : localStorage.getItem('ROMAN88_REFRESH_TOKEN')
    }
    axios.post('/auth/reissue', JSON.stringify(jwt), { headers : {
      "Content-Type" : "application/json",
    }}).then((response) => {
          if(response.data.accessToken != null && response.data.refreshToken != null && response.data.accessTokenExpiresIn != 0) {
            tokenManager(response.data.accessToken, response.data.refreshToken, response.data.accessTokenExpiresIn);
          }
    })
  }

  useEffect(() => {
    // 새로고침하는 경우에도 실행
    // accessToken 만료 3분전에 재요청. 새로고침시 exp 초기화 방지를 위해 exp도 cookie에 저장.
    // 아래 코드를 기준으로 tokenManager와 tokenRefreshManager 두 함수가 로그아웃 전까지 순환.
    let signInTime = Date.now();
    let reissueTime = (getCookie('ROMAN88_ACCESS_TOKEN_EXP') - signInTime) - 180000;
    
    if(getCookie('ROMAN88_ACCESS_TOKEN') != null && localStorage.getItem('ROMAN88_REFRESH_TOKEN') != null) {
      console.log('setTimeout is called reissue() in authCtrl before Refresh');
      setTimeout(tokenRefreshManager, reissueTime);
    } else {
      setIsSigned(false);
    }
  }, [isSigned])
  
  return (
    <div className="App">
      <Watermark />
      <Router tokenManager = {tokenManager} isSigned = {isSigned} setIsSigned = {setIsSigned}/>
    </div>
  );
}

export default App;