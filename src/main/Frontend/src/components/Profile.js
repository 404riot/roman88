import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { RegexOnlyString, RegexOnlyNumber, RegexOnlyEngNumber, RegexOnlyEmailName, RegexOnlyEmailDomain, RegexOnluEmailAddress } from '../InputRegex';
import '../styles/ProfileStyle.css';
import { useHistory } from 'react-router';
import { getCookie } from '../Cookies';

const Profile = ({signUserId, signUserAuth, accessToken, signCheck, memberInfo, memberInfoModify, setMemberInfoModify}) => {

    const history = useHistory();

    useEffect(() => {

        window.scrollTo(0,0);

        if(!signCheck()) { history.push('/'); } 
    }, []);

    const onChange = (e) => {

        const {value, name} = e.target;

        setMemberInfoModify({
            ...memberInfoModify,
            [name]:value
        });

    }

    const AccountModify = () => {
        if(
           memberInfo.name == memberInfoModify.name &&
           memberInfo.pw == memberInfoModify.pw &&
           memberInfo.address == memberInfoModify.address &&
           memberInfo.postCode == memberInfoModify.postCode &&
           memberInfo.phoneNumber == memberInfoModify.phoneNumber &&
           memberInfo.email == memberInfoModify.email
        ) {
            alert("변경된 사항이 없습니다. 기존 정보를 유지합니다.");
        } else {

            const modifyData = {
                memberId : memberInfoModify.id,
                memberName : memberInfoModify.name,
                address : memberInfoModify.address,
                postcode : memberInfoModify.postCode,
                phoneNumber : memberInfoModify.phoneNumber,
                email : memberInfoModify.email
            }

            if(RegexOnluEmailAddress(modifyData.email) == null) {
                alert('잘못된 이메일 형식입니다.');
            } else {

                if(window.confirm("수정한 정보로 변경합니다.")) {

                    axios.post('member/memberInfoModify', JSON.stringify(modifyData), { headers : {
                        "Content-Type": "application/json"
                    }}).then((response) => {
    
                        if(response.data == "modify completed") {
                            // alert("입력한 내용으로 수정되었습니다.");
                        } else if(response.data == "modify failed") {
                            alert("failed");
                        } else if(response.data == 'unmatched sign id') {
                            alert("유효하지 않은 요청입니다.");
                            console.log("id of the token and the id of the requester do not match");
                        }
                    });
    
                } else {
                    // deny
                } 
            }
        }
    }

    const RegexName = () => {
        memberInfoModify.name = RegexOnlyString(memberInfoModify.name);
    }

    const RegexPhoneNumber = () => {
        memberInfoModify.phoneNumber = RegexOnlyNumber(memberInfoModify.phoneNumber);
    }

    const manageMenuMembers = () => {
        history.push("/membersManage");
    }

    const manageMenuNotice = () => {
        history.push("/noticeManage");
    }

    const manageMenuContact = () => {
        history.push("/emailSend");
    }

    const manageMenuPopUp = () => {
        history.push("/popUpManage");
    }

    const ManagerContents = () => {

        if(getCookie('userAuth') == "ROLE_ADMIN") {
            return (
                <div className = "managersContainer">
                    <h4> For Managers </h4>
                    <hr style = {{ border : '0.5px solid black', marginTop : '-15px' }}/>

                    <div className = "membersButton" onClick = {manageMenuMembers}>
                        <p id = "membersButtonText"> MEMBERS </p>
                    </div>

                    <div className = "noticeButton" onClick = {manageMenuNotice}>
                        <p id = "noticeButtonText"> NOTICE </p>
                    </div>

                    <div className = "contactButton" onClick  = {manageMenuContact}>
                        <p id = "contactButtonText"> SEND MAIL </p>
                    </div>

                    <div className = "popUpButton">
                        <p id = "popUpButtonText"> POP UP </p>
                    </div>
                </div>
            );
        } else {
            // empty container
            return(
                <Fragment>
    
                </Fragment>            
            )
        }

    }

    const MyCart = () => {
        history.push("/MyCart");
    }

    return (
        <div>
            <div className = "profileContainer">
                <h4>Account Profile</h4>
                <hr style = {{ border : '0.5px solid black', marginTop : '-15px' }}/>

                <div className = "profileInfoColummContainer">

                    <p id = "profileInfoContainersText"> NAME </p>
                    <p id = "profileInfoContainersText"> ID </p>
                    {/* <p id = "profileInfoContainersText"> PASSWORD </p> */}
                    <p id = "profileInfoContainersText_textArea"> ADDRESS </p>
                    <p id = "profileInfoContainersText_underTextArea"> POSTCODE </p>
                    <p id = "profileInfoContainersText"> PHONE </p>
                    <p id = "profileInfoContainersText"> EMAIL </p>
                  
                </div>

                <div className = "profileInfoValueContainer" >
                    <input className = "infoValuesInput" maxLength = '15' name = "name" type = "text"  onKeyUp={RegexName(this)} onKeyDown={RegexName(this)} value = {memberInfoModify.name} onChange = {onChange}/>
                    <input className = "infoValuesInput" readOnly = "true" name = "id" type = "text" value = {memberInfoModify.id}/>
                    {/* <input className = "infoValuesInput" name = "pw" type = "password" value = {memberInfo.pw} onChange = {onChange}/> */}
                    <textarea className = "infoValuesInputArea" name = "address" type = "text" value = {memberInfoModify.address} onChange = {onChange}/>
                    <input className = "infoValuesInput" name = "postCode" type = "text" value = {memberInfoModify.postCode} onChange = {onChange}/>
                    <input className = "infoValuesInput" maxLength = '11' name = "phoneNumber" type = "text" onKeyUp={RegexPhoneNumber(this)} onKeyDown={RegexPhoneNumber(this)} value = {memberInfoModify.phoneNumber} onChange = {onChange}/>
                    <input className = "infoValuesInput" name = "email" type = "text" value = {memberInfoModify.email} onChange = {onChange}/>
                </div>

                <div className = "buttonContainer">

                    <div className = "cartButton" onClick = {MyCart}> 
                        <p id = "cartButtonText" > MY CART </p> 
                    </div>

                    <div className = "modifyButton" onClick = {AccountModify}>
                        <p id = "modifyButtonText"> MODIFY</p>
                    </div>

                    <div className = "historyButton">
                        <p id = "historyButtonText" > PURCHASE HISTORY </p>
                    </div>
                </div>

                
                <ManagerContents />
        

            </div>

        </div>
    );

}

export default Profile;