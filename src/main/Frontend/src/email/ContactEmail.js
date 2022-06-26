import React, { useCallback } from 'react'; 
import useInput from '../HamburgerMenu/useInput'; 
import { Form } from "react-bootstrap";

import '../styles/ContactEmailStyle.css';
import axios from 'axios';

var sendTitle = '';
var sendContent = '';

const ContactEmail = ({ history }) => { 

    if(sessionStorage.getItem("sessionInfo") == null) {
        history.push("/signInPage");
    } else if (sessionStorage.getItem("auth") != 'manager') {
        alert("잘못된 접근입니다");
        history.push("/");
    }

    const name = sessionStorage.getItem('name');
    const email = sessionStorage.getItem('email');

    const [title, onChangeTitle] = useInput(''); 
    const [text, onChangeText] = useInput(''); 

    sendTitle = title;
    sendContent = text;

    const onSubmit = useCallback((e) => { 

        e.preventDefault(); 
        const inputNum = e.target.childElementCount - 1; 
        // [D] 버튼한개 제외 
        const data = new FormData(e.target); 
        const entries = data.entries(); 

        let failNum = 0; 
        
        for (let i = 0; i < inputNum; i++) { 

            const next = entries.next(); 
            const key = next.value[0]; 
            const value = next.value[1]; 

            if (!value) { 
                failNum++; 
                alert("제목과 내용은 필수 입력사항입니다."); 
                break; 
            }
        } 

        if (!failNum) { 
            // emailjs.sendForm( 'roman88_store_mail', 'template_24awnyr', e.target, 'user_ArlPzAL9hx2Yt21Pffq8V' )
            // .then((result) => { 
            //     console.log('result.text', result.text); 
            // }, (error) => { 
            //     console.log(error.text); 
            // }); 

            // alert("관리자에게 메일을 발송했습니다.");
            // history.push("/");

            axios.post('/api/Manage/SendMailAllUser', null, { params : {
                sendTitle,
                sendContent,
                name
            }}).then((response) => {
                if(response.data == 'success') {
                    alert("회원들에게 메일을 발송했습니다.");
                    document.location.href = "/profile";
                }
            })
        } 
    }, []); 
    
    return ( 
        <div className = 'ContactEmailContainer'>

            <h4>Send Mail All User</h4>
            <hr style = {{ border : '0.5px solid black', marginTop : '-15px', width : '100%' }}/>

            <Form onSubmit={onSubmit}> 

                <div className = "TextContainer">
                    <h4 id = "TextInContainer"> Name  </h4>
                    <h4 id = "TextInContainer"> Email  </h4>
                    <h4 id = "TextInContainer"> Title </h4>
                    <h4 id = "TextInContainer"> Content </h4>
                </div>

                <div className = "InputContainer">
                    <input className = 'nameArea' type="text" name="name" value={name} readOnly = "true" /> 
                    <br/> 
                    <input className = 'emailArea' type="text" name="email" value={email} readOnly = "true" /> 
                    <br/>
                    <input className = 'titleArea' type="text" name="title" placeholder="Subject" value = {title} onChange = {onChangeTitle} />
                    <br/>
                </div>

                <div className = "MessageContainer">
                    <textarea className = 'contentArea' name="text" placeholder="Message" value={text} onChange={onChangeText} /> 
                </div>

                <button className = "sendButton" type="submit"> Send </button> 

            </Form> 
        </div>
    ); 
}; 

export default ContactEmail;

