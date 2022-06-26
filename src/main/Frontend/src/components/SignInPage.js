import React, {useState, useEffect} from 'react';

import axios from 'axios';
import $ from 'jquery';
import MainTop from './MainTop';
import '../styles/SignInStyle.css';
import Cookies from 'universal-cookie';
import { useHistory } from 'react-router';
const SignInPage = ({ tokenManager }) => {

    const cookies = new Cookies();
    const history = useHistory();

    const [inputInfo, setInputInfo] = useState({
        id : '',
        pw : ''
    });

    const onChange = (e) => {
        const { value, name } = e.target;
        setInputInfo({
            ...inputInfo,
            [name]:value
        });
    }

    const test = () => {
        axios.get('/member/me', null).then(response => {
            console.log(response.data)
        })
    }

    const onCheckEnter = (e) => {
        if(e.key === 'Enter') {
            SignInUser();
        }
    }

    // login 후 받은 token 정보는 App.js의 tokenManager로 보냄
    const SignInUser = () => {

        const data = {
            memberId : inputInfo.id,
            password : inputInfo.pw
        }

        if(data.memberId == '' || data.password == '') {
            alert("아이디와 비밀번호를 입력하세요.");
        } else {
            axios.post('/auth/signin', JSON.stringify(data), { headers : {
                "Content-Type": "application/json"
            }}).then((response) => {
                if(response.data.accessToken != null && response.data.refreshToken != null) {
                    tokenManager(response.data.accessToken, response.data.refreshToken, response.data.accessTokenExpiresIn);
                    history.push('/');
                }
            });
        }
    }

    return(
        <div className = 'SignInBox' onKeyPress={onCheckEnter} >

            <h4> Enter Account </h4>
            <hr style = {{ border : '0.5px solid black', marginTop : '-15px' }}/>

            <div className="inputId">
                <input name="id" id = "sign" className={
                    inputInfo.id.length < 1
                        ? `id__input`
                        : `id__input id__input-active`
                }
                       onChange={ onChange }
                       type="text"
                       value={inputInfo.id}
                       maxLength = '15'
                />
                <label htmlfor="name" className="target__label" >ID</label>
            </div>

            <div className="inputPw" >
                <input name="pw" className={
                    inputInfo.pw.length < 1
                        ? `pw__input`
                        : `pw__input pw__input-active`
                }
                       onChange={ onChange }
                       type="password"
                       maxLength = '15'
                       value={inputInfo.pw}
                       id = "pwForPressEnter"
                />
                <label htmlfor="name" className="target__label">PASSWORD</label>
            </div>

            <div className = 'findContainer'>

            </div>

            <div className = 'userCheck' id = "loginButtonEnter">
                <button className = 'checkBtn' onClick = {() => SignInUser()}> Sign In </button>
            </div>

        </div>


    )
}
export default SignInPage;