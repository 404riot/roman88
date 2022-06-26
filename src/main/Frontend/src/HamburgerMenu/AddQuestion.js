import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { Fragment } from 'react-is';

import '../styles/AddQuestionStyle.css';
import { useHistory } from 'react-router';

const AddQuestion = ({ memberInfo, signCheck }) => {

    const history = useHistory();

    useEffect(() => {
        if(!signCheck()) {
            history.push('/signInPage');
        }
    })

    const [question, setQuestion] = useState({
        questionTitle : '',
        questionContent : ''
    });

    const onChange = (e) => {
        const { value, name } = e.target;

        setQuestion({
            ...question,
            [name]:value
        });

        console.log(question.questionContent);
    }

    const EnrollQuestion = () => {

        const questionInfo = {
            memberId : memberInfo.id,
            memberName : memberInfo.name,
            questionTitle : question.questionTitle,
            questionContents : question.questionContent
        };

        if(questionInfo.questionTitle == '' || questionInfo.questionContent == '') {
            alert('제목과 내용은 필수 입력사항 입니다.')
        } else {
            axios.post('contents/addQuestion', JSON.stringify(questionInfo), { headers : {
                "Content-Type": "application/json"
            }}).then((response) => {
                if(response.data == "save") {
                    alert("QnA에 질문이 등록되었습니다.");
                    history.push('/qna')
                } else if(response.data == "failed") {
                    alert("ㄴㄴ  안됨");
                }   
            })
        }
    }

    return (

        <div className = 'questionContainer'>
            <h4>AddQuestion</h4>
            <hr style = {{ border : '0.5px solid black', marginTop : '-15px', width : '100%' }}/>

            <div className='innerContainer'>

                <div className = "titleContainer">
                    <h4 style = {{ float : 'left'}}> Title </h4>
                    <input name = 'questionTitle' type = 'text' className = "titleInput" onChange = {onChange} />
                    
                </div>

                <div className = "contentsContainer">
                    <h4 style = {{ float : "left"}} > Contents </h4>
                    <textarea name = 'questionContent' type = 'text' className = 'contentsInput' cols="20" wrap="hard" onChange = {onChange}/>
                </div>

                <button className = "noticeAddButton" onClick = {EnrollQuestion}> OK</button>
            </div>

        </div>

    );
}

export default AddQuestion;