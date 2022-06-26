import React, { useCallback, useEffect } from 'react'; 
import useInput from './useInput'; 
import emailjs from 'emailjs-com'; 
import { Form } from "react-bootstrap";

import '../styles/ContactStyle.css';
import { useHistory } from 'react-router';

const Contact = ({memberInfo, signCheck}) => { 

    const history = useHistory();

    useEffect(() => {
        window.scrollTo(0,0);
        if(!signCheck()) {
            history.push('/signInPage');
        }
    })

    const name = memberInfo.name;
    const email = memberInfo.email;

    const [title, onChangeTitle] = useInput(''); 
    const [text, onChangeText] = useInput(''); 
    const [phone, onChangePhone] = useInput('');
    
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
                console.log(e.target);
                failNum++; 
                alert("제목과 내용은 필수 입력사항입니다."); 
                break; 
            }
        } 

        if (!failNum) { 
            emailjs.sendForm( 'roman88_store_mail', 'template_24awnyr', e.target, 'user_ArlPzAL9hx2Yt21Pffq8V' )
            .then((result) => { 
                console.log('result.text', result.text); 
            }, (error) => { 
                console.log(error.text); 
            }); 

            alert("관리자에게 메일을 발송했습니다.");
            history.push("/");
        } 

    }, []); 

    
    return ( 
        <div className = 'ContactContainer'>

            <h4>Contact</h4>
            <hr style = {{ border : '0.5px solid black', marginTop : '-15px', width : '100%' }}/>

            <Form onSubmit={onSubmit}> 

                <div className = "ContactTextContainer">
                    <h4 id = "ContactTextInContainer"> Name  </h4>
                    <h4 id = "ContactTextInContainer"> Email  </h4>
                    <h4 id = "ContactTextInContainer"> Phone  </h4>
                    <h4 id = "ContactTextInContainer"> Title </h4>
                    <h4 id = "ContactTextInContainer"> Content </h4>
                </div>

                <div className = "ContactInputContainer">
                    <input className = 'nameArea' type="text" name="name" value={name} readOnly = "true" /> 
                    <br/> 
                    <input className = 'emailArea' type="text" name="email" value={email} readOnly = "true" /> 
                    <br/>
                    <input className = 'phoneArea' type="text" name="phoneNumber" placeholder = "전화번호 미표기를 원하는 경우 - 입력" value = {phone} onChange = {onChangePhone}/>
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
export default Contact;