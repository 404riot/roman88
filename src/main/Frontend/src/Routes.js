import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { getCookie } from './Cookies';
import axios from 'axios';

import MainTop from './components/MainTop';
import Contents from './components/Contents';
import Main from './components/Main';
import SignUpPage from './components/SignUpPage';
import SignInPage from './components/SignInPage';
import MyCart from './components/MyCart';
import Profile from './components/Profile';
import DetailContents from './components/DetailContents';
import Notice from './HamburgerMenu/Notice';
import About from './HamburgerMenu/About';
import Contact from './HamburgerMenu/Contact';
import BuyNow from './components/BuyNow';
import Footer from './components/Footer';
import MembersManage from './managers/MembersManage';
import './styles/FooterStyle.css';
import NoticeManage from './managers/NoticeManage';
import QnA from './HamburgerMenu/QnA';
import AddQuestion from './HamburgerMenu/AddQuestion';
import ContactEmail from './email/ContactEmail';

const Router = ({ tokenManager, isSigned, setIsSigned }) => {

    const [signUserId, setSignUserId] = useState('');
    const [signUserAuth, setSignUserAuth] = useState('');
    const [accessToken, setAccessToken] = useState('');

    const [memberInfo, setMemberInfo] = useState({
        name : '',
        id : '',
        password : '',
        address : '',
        postCode : '',
        phoneNumber : '',
        email : ''
    });
    
    // profile의 회원정보 수정용
    const [memberInfoModify, setMemberInfoModify] = useState({
        name : '',
        id : '',
        pw : '',
        address : '',
        postCode : '',
        phoneNumber : '',
        email : ''
    });

    useEffect(() => {
        if((getCookie('ROMAN88_ACCESS_TOKEN') != null && getCookie('ROMAN88_ACCESS_TOKEN') != '') &&
            getCookie('ROMAN88_SIGN_USER_ID') != null && getCookie('ROMAN88_SIGN_USER_ID') != '') {
                setSignUserId(getCookie('ROMAN88_SIGN_USER_ID'));
                setSignUserAuth(getCookie('ROMAN88_SIGN_USER_AUTH'));
                setAccessToken(getCookie('ROMAN88_ACCESS_TOKEN'));

                axios.get('member/memberInfo', null, { headers : {
                    "Content-Type" : "application/json"
                  }}).then((response) => {
                      const _setMemberInfo = {
                          name : response.data.memberName,
                          id : response.data.memberId,
                          password : response.data.password,
                          address : response.data.address,
                          postCode : response.data.postcode,
                          phoneNumber : response.data.phoneNumber,
                          email : response.data.email
                      };
                      setMemberInfo(_setMemberInfo);
                      setMemberInfoModify(_setMemberInfo);
                  });

        } 
        
    }, [isSigned]);

    const signCheck = () => {
        console.log("called")
        if((getCookie('ROMAN88_ACCESS_TOKEN') != null && getCookie('ROMAN88_ACCESS_TOKEN') != '') &&
            getCookie('ROMAN88_SIGN_USER_ID') != null && getCookie('ROMAN88_SIGN_USER_ID') != '') {
            return true;
        } else {
            return false;
        }
    }


    return (
        <BrowserRouter>
        <MainTop setIsSigned = {setIsSigned}/>
            <Switch >
                <Route path = '/' exact = {true} render={() => <Main />} />
                <Route path = '/contents' exact = {true} render={() => <Contents /> } />
                <Route path = '/detail' exact = {true} render={() => <DetailContents signCheck={signCheck} memberInfo = {memberInfo} /> } />

                <Route path = '/signUpPage' exact = {true} render={() => <SignUpPage /> } />
                <Route path = '/signInPage' exact = {true} render={() => <SignInPage tokenManager = {tokenManager} /> } /> 

                <Route path = '/notice' exact = {true} render={() => <Notice /> } />
                <Route path = '/about' exact = {true} render={() => <About /> } />
                <Route path = '/contact' exact = {true} render={() => <Contact memberInfo={memberInfo} signCheck={signCheck} /> } />
                
                <Route path = '/qna' exact = {true} render={() => <QnA memberInfo={memberInfo} signCheck={signCheck} signUserAuth={signUserAuth} accessToken={accessToken}/> } />
                <Route path = '/addQuestion' exact = {true} render={() => <AddQuestion memberInfo={memberInfo} signUserId={signUserId} signUserAuth={signUserAuth} accessToken={accessToken} signCheck={signCheck} /> } />

                <Route path = '/profile' exact = {true} render={() => <Profile memberInfo={memberInfo} memberInfoModify={memberInfoModify} setMemberInfoModify={setMemberInfoModify} signUserId={signUserId} signUserAuth={signUserAuth} accessToken={accessToken} signCheck={signCheck}/> } />
                <Route path = '/myCart' exact = {true} render={() => <MyCart signUserId={signUserId} signUserAuth={signUserAuth} accessToken={accessToken} signCheck={signCheck}/> } />
                <Route path = '/buyProduct' exact = {true} render={() => <BuyNow signUserId={signUserId} signUserAuth={signUserAuth} accessToken={accessToken} signCheck={signCheck}/> } />

                <Route path = '/membersManage' exact = {true} render={() => <MembersManage /> } />
                <Route path = '/noticeManage' exact = {true} render={() => <NoticeManage /> } />
                <Route path = '/emailSend' exact = {true} render={() => <ContactEmail /> } />
            </Switch>

        <div className = 'Footer-container'>
            <Footer />  
        </div>

        </BrowserRouter>
    )
}

export default Router;