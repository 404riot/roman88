import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { qs } from 'url-parse';

import '../styles/NoticeManageStyle.css';

const NoticeManage = () => {

    const [noticeInfo, setNoticeInfo] = useState({
        title : '',
        contents : ''
    });

    const [trigger, setTrigger] = useState('');
    const [notice, setNotice] = useState([{
        title : '',
        registerDate : '',
        writer : '',
        seq : 0
    }])

    const writer = sessionStorage.getItem('id');

    const onChange = (e) => {
        const { value, name } = e.target;

        setNoticeInfo({
            ...noticeInfo,
            [name]:value
        });
    }

    useEffect(async() => {

        axios.post('/api/Manage/RetrieveNotice').then((response) => {

            if(response.data.length > 0) {

                setTrigger('items');
                const _notice = response.data.map((notice) => ({
                    title : notice.title,
                    registerDate : notice.registerDate,
                    writer : notice.writer,
                    seq : notice.seq
                }));

                setNotice(_notice);

            } else {
                setTrigger('none');
            }

        })
    
    }, []);

    const addNotice = () => {

        const {title, contents} = noticeInfo;
        var text = contents.replace(/(?:\r\n|\r|\n)/g,'<br/>');

        axios.post('/api/Manage/AddNotice', null, { params : {
            title,
            text,
            writer
        }}).then((response) => {
            if(response.data == "addNotice") {
                alert("공지사항 등록함.");
                document.location.href = "/Profile";
            } else if(response.data == "failed") {
                alert("ㄴㄴ 공지등록 안됨");
            }   
        })
    }

    const removeNotice = () => {

        const selected = [];

        for(var i = 0; i < document.getElementsByClassName('checkInput').length; i++){

            if(document.getElementById('checking' + notice[i].seq).checked){
                selected.push(notice[i].seq);
            }

        }
        if(window.confirm("선택한 공지사항을 Notice에서 삭제합니다.")) {

            axios.post('/api/Manage/RemoveNotice', null, { params : {
                selected : selected,
                writer
            },
            paramsSerializer : params => {
                return qs.stringify(params);
            }
        
            }).then((response) => {
                if(response.data == "removed") {
                    alert("삭제되었습니다.");
                    document.location.href = "/noticeManage";
                } else if(response.data == "failed") {
                    alert("selected data not found in table");
                }   
            })

        } else {
            
        }
    }

    return (
        <div className = "noticeManageContainer">
            <h4>Add Notice</h4>
            <hr style = {{ border : '0.5px solid black', marginTop : '-15px', width : '100%' }}/>

            <div className = "titleContainer">
                <h4 style = {{ float : 'left'}}> Title </h4>
                <input name = 'title' type = 'text' className = "titleInput" onChange = {onChange}/>
                <button className = "noticeAddButton" onClick = {addNotice}> Enroll Notice</button>
            </div>

            <div className = "contentsContainer">
                <h4 style = {{ float : "left"}} > Contents </h4>
                <textarea name = 'contents' type = 'text' className = 'contentsInput' cols="20" wrap="hard" onChange = {onChange}/>
            </div>

            <div>
                <h4> Registered Notice</h4>
                <hr style = {{ border : '0.5px solid black', marginTop : '-15px', width : '100%' }}/>

                <table>

                {
                    notice.map((notice, index) => {

                        if(trigger =='none') {
                            return (
                                <h4> 등록한 공지가 없습니다.</h4>
                            )
                        } else if(trigger == 'items') {
                            return (
                                <tr>
                                    <td key = {index} className = 'dateText'>
                                        <h5 style = {{ float : 'left'}}> {notice.registerDate} </h5>
                                    </td>
                                    <td key = {index} className = 'titleText'>
                                        <h5 style = {{ float : 'left'}}> {notice.title}</h5>
                                    </td>
                                    <td key = {index} className = 'writerText'>
                                        <h5 style = {{ float : 'left'}}> {notice.writer}</h5>
                                    </td>
                                    <td>
                                        <label className = 'checker' for = {"checking" + notice.seq} >
                                            <input type="checkbox" id = {"checking" + notice.seq} className = 'checkInput' />
                                            <span class="checkmark"></span>
                                        </label>
                                    </td>
                                </tr>
                            )
                        }
                    })
                }
                </table>

                <div>
                    <button className = "removeButton" onClick = {removeNotice}> Remove Notice </button>
                </div>

            </div>
            
        </div>
    );
}

export default NoticeManage;