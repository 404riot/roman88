import React, {useState, useRef, useEffect} from 'react';
import axios from 'axios';
import PopupDom from './PopupDom';
import PopupPostCode from './PopupPostCode';
import { RegexOnlyString, RegexOnlyNumber, RegexOnlyEngNumber, RegexOnlyEmailName, RegexOnlyEmailDomain, RegexOnluEmailAddress } from '../InputRegex';
import $ from 'jquery';
import '../styles/SignUpStyle.css';
import { useHistory } from 'react-router';

const SignUpPage = () => {

    const history = useHistory();
    window.scrollTo(0,0);

    // Email 직접입력시 input 접근용 ref
    const emailInput = useRef();

    // 사용자가 입력할 인증번호
    const [emailCertNumber, setEmailCertNumber] = useState({
        certNumber : ''
    });
    // spring boot에서 받아온 인증번호
    const [certNumberFromEmail, setCertNumberFromEmail] = useState('');

    // 회원가입 정보
    const [inputValue, setValue] = useState({
        name : '',
        id : '',
        pw : '',
        pwcheck : '',
        inputAddr : '',
        address : '',
        postCode : '',
        phoneNumber : '',
        email : '',
        emailSelector : '',
        emailAddress : '',
        fullEmail : ''
    });

    // id 중복검사 플래그
    const [overlap, setOverlap] = useState('overlap');

    // 각 input의 onChange
    const onChange = (e) => {

        const { value, name } = e.target;
        if(value == 'self') {
            emailInput.current.value = '';
            emailInput.current.readOnly = false;
            emailInput.current.focus();
        } else if(value == 'gmail.com' || value == 'naver.com' || value == 'daum.com' || value == 'outlook.com' || value == 'nate.com') {
            emailInput.current.readOnly = true;
            setValue({
                ...inputValue,
                [name]:value
            });
        } else {
            setValue({
                ...inputValue,
                [name]:value
            });
        }
    }

    // 인증번호 입력 onChange는 별도 처리
    const emailCert = (e) => {

        const { value, name } = e.target;

        setEmailCertNumber({
            ...emailCertNumber,
            [name]:value
        });
    }

    // daum-kakao post api에서 우편번호랑 주소 받아올 state
    const [address, setAddress] = useState('');
    const [postCode, setPostCode] = useState('');

    const addressAdd = (address, zonecode) => {
        setAddress(address);
        setPostCode(zonecode);
    }

    // api popup
    const [isPopupOpen, setIsPopupOpen] = useState(false)

    const openPostCode = () => {
        setIsPopupOpen(true)
    }

    const closePostCode = () => {
        setIsPopupOpen(false)
    }


    // Regular Expression
    const RegexName = () => {
        inputValue.name = RegexOnlyString(inputValue.name);;
    }

    const RegexId = () => {
        let regexId = RegexOnlyEngNumber(inputValue.id);
        if(regexId.length <  6) {
            $(".id__input-active").css({"borderBottom":"1px solid red"});
        } else if(overlap == "overlap") {
            $(".id__input-active").css({"borderBottom":"1px solid red"});
        } else {
            $(".id__input-active").css({"borderBottom":"1px solid black"});
        }
        inputValue.id = regexId;
    }

    const RegexPassword = () => {
        let regexPassword = RegexOnlyEngNumber(inputValue.pw);

        if(regexPassword.length <  6) {
            $(".pw__input-active").css({"borderBottom":"1px solid red"});
        } else {
            $(".pw__input-active").css({"borderBottom":"1px solid black"});
        }
        inputValue.pw = regexPassword;
    }

    const RegexPasswordCheck = () => {
        let regexPasswordCheck = RegexOnlyEngNumber(inputValue.pwcheck);

        if(regexPasswordCheck.length <  6 || inputValue.pw != regexPasswordCheck) {
            $(".pw__input-active").css({"borderBottom":"1px solid red"});
        } else {
            $(".pw__input-active").css({"borderBottom":"1px solid black"});
        }
        inputValue.pwcheck = regexPasswordCheck;
    }

    const RegexPhoneNumber = () => {
        inputValue.phoneNumber = RegexOnlyNumber(inputValue.phoneNumber);
    }

    const RegexEmail = () => {
        let regexEmail = RegexOnlyEmailName(inputValue.email);

        if(inputValue.email.match(regexEmail) != null) {
            $(".email__input-active").css({"borderBottom":"1px solid black"});
        } else {
            $(".email__input-active").css({"borderBottom":"1px solid red"});
        }
        inputValue.email = regexEmail;
    }

    const RegexEmailInput = () => {
        let regexEmailInput = RegexOnlyEmailDomain(inputValue.emailSelector);
        if(inputValue.emailSelector.match(regexEmailInput) != null ) {
            var emailAddress = inputValue.email + '@' + inputValue.emailSelector;

            if(RegexOnluEmailAddress(emailAddress) != null) {
                $(".emailInput").css({"borderBottom":"1px solid black"});
                $(".email__input-active").css({"borderBottom":"1px solid black"});
            } else {
                $(".emailInput").css({"borderBottom":"1px solid red"});
                $(".email__input-active").css({"borderBottom":"1px solid red"});
            }
        }
    }

    const RegexCertNumber = () => {
        emailCertNumber.certNumber = RegexOnlyNumber(emailCertNumber.certNumber);
    }

    // id 중복검사
    const OverLapCheck = () => {

        const overlapCheckId = {
            memberId : inputValue.id
        }
        
        axios.post('/auth/overlapCheck', JSON.stringify(overlapCheckId), { headers : {
            "Content-Type" : "application/json",
        }}).then((response) => {
            if(response.data == 'available') {
                alert("사용 가능한 ID입니다.");
                setOverlap('Notoverlap');
            } else if(response.data == 'this id is overlap') {
                alert("이미 사용중인 ID입니다.");
                setOverlap('overlap');
            }
        });

    }

    // 이메일로 인증번호 전송
    const sendSertNumber = () => {

        let email = inputValue.email + '@' + inputValue.emailSelector
        inputValue.fullEmail = email;

        alert("입력하신 이메일로 인증번호를 발송했습니다.");

        const inputAccount = {
            memberName : inputValue.name,
            email : inputValue.fullEmail,
            address : inputValue.address,
            phoneNumber : inputValue.phoneNumber
        };

        axios.post('/auth/sendCertNumber', JSON.stringify(inputAccount), { headers : {
            "Content-Type" : "application/json",
        }}).then((response) => {
            setCertNumberFromEmail(response.data);
        });
    }

    // 유저객체 넘기기 전 공백 검사
    const createUser = () => {
        if(inputValue.name == '') {
            alert('이름을 입력해주세요.');
            return false;
        } else if(inputValue.id.length < 6) {
            alert('ID를 입력하지 않았거나 유효하지 않은 ID입니다.');
            return false;
        } else if(overlap == 'overlap') {
            alert('ID중복검사를 완료해주세요.');
        } else if(inputValue.pw.length < 6) {
            alert('PASSWORD를 입력하지 않았거나 유효하지 않은 PASSWORD입니다.');
            return false;
        } else if(inputValue.pw != inputValue.pwcheck) {
            alert('PASSWORD가 일치하지 않습니다.')
            return false;
        } else if(address == '' || postCode == '') {
            alert('주소를 입력해주세요.');
            return false;
        } else if(inputValue.inputAddr == '') {
            alert('상세주소를 입력해주세요.');
            return false;
        } else if(inputValue.phoneNumber == '') {
            alert('전화번호를 입력해주세요');
            return false;
        } else if(inputValue.email == '') {
            alert('이메일 입력좀');
            return false;
        } else {
            let email = inputValue.email + '@' + inputValue.emailSelector
            inputValue.fullEmail = email;
            inputValue.address = address + " " +  inputValue.inputAddr;
            inputValue.postCode = postCode;
            SubmitAccount();
        }
    }

    // createUser에서 이상 없으면 회원가입
    const SubmitAccount = () => {

        if(emailCertNumber.certNumber == '') {
            alert("인증번호를 입력해주세요.")
        } else if(certNumberFromEmail == '') {
            alert("인증번호를 발급받지 않았습니다.")
        } else if(certNumberFromEmail != emailCertNumber.certNumber) {
            alert("인증번호가 일치하지 않습니다.");
        } else {
            const inputAccount = {
                memberName : inputValue.name,
                memberId : inputValue.id,
                password : inputValue.pw,
                email : inputValue.fullEmail,
                address : inputValue.address,
                postcode : inputValue.postCode,
                phoneNumber : inputValue.phoneNumber
            };
        
            axios.post('/auth/signup', JSON.stringify(inputAccount), { headers : {
                    "Content-Type" : "application/json",
                }}).then((response) => {
                if(response.data == 'signUp memberAccount') {
                    alert("로망단이 되신걸 환영합니다!");
                    history.push('/')
                } else {
                    alert("회원가입에 실패하였습니다. 왜 실패했는지는 저도 잘 모르겠습니다.");
                }
            });
        }
    }

    return (

        <div className = "group">
            <script src="https://ssl.daumcdn.net/dmaps/map_js_init/postcode.v2.js"></script>
            <h4> Create Account </h4>

            <hr style = {{ border : '0.5px solid black', marginTop : '-15px' }}/>
            <div className="nameField" >
                <input name="name" className={
                    inputValue.name.length < 1
                        ? `name__input`
                        : `name__input name__input-active`
                }
                       onKeyUp = {RegexName(this)}
                       onChange={ onChange }
                       type="text"
                       value={inputValue.name}
                       maxLength = '15'
                />
                <label htmlfor="name" className="target__label"> NAME </label>
            </div>

            <div className="idField">
                <input name="id" className={
                    inputValue.id.length < 1
                        ? `id__input`
                        : `id__input id__input-active`
                }
                       onChange={ onChange }
                       onKeyUp = {RegexId(this)}
                       type="text"
                       value={inputValue.id}
                       maxLength = '15'
                />
                <label htmlfor="name" className="target__label" >ID (6-15자, 영문 / 영문+숫자)</label>
            </div>

            <div className = "overlapCheckField">
                <button className = "overlapCheckBtn" onClick = {OverLapCheck} > ID중복체크 </button>
            </div>

            <div className="pwField" >
                <input name="pw" className={
                    inputValue.pw.length < 1
                        ? `pw__input`
                        : `pw__input pw__input-active`
                }
                       onKeyUp = {RegexPassword(this)}
                       onChange={ onChange }
                       type="password"
                       maxLength = '15'
                       value={inputValue.pw}
                />
                <label htmnlfor="name" className="target__label">PASSWORD (6-15자, 영문 / 영문+숫자)</label>
            </div>

            <div className="pwCheckField">
                <input name="pwcheck" className={
                    inputValue.pwcheck.length < 1
                        ? `pw__input`
                        : `pw__input pw__input-active`
                }
                       onKeyUp = {RegexPasswordCheck(this)}
                       onChange={ onChange }
                       type="password"
                       value={inputValue.pwcheck}
                />
                <label htmlfor="name" className="target__label">PASSWORD CHECK</label>
            </div>

            <div className = "addressField">
                <p style = {{ fontSize : '13px', marginLeft : '10px', }}> ADDRESS </p>
                <button type='button'  className = "addressSearch" onClick={openPostCode}>우편번호 검색</button>
                <input type = 'text' className = "postCode" value = {postCode} name = 'postCode' placeholder = '우편번호'/>
                <input type = 'text' className = "addr" value = {address} name = 'selectAddr' placeholder = '주소'/>
                <input type = 'text' className = "addrInput" name = 'inputAddr' placeholder = '상세주소 / 상세주소가 없는 경우 공백으로 입력'
                       onChange={ onChange }
                       value={inputValue.inputAddr}
                />

                <div className = "popupContainer">
                    <div id='popupDom'>
                        {isPopupOpen && (
                            <PopupDom>
                                <PopupPostCode onClose={closePostCode} addrFn = {addressAdd} />
                            </PopupDom>
                        )}
                    </div>
                </div>
            </div>

            <div className="phoneNumberField" >
                <input name="phoneNumber" className={
                    inputValue.phoneNumber.length < 1
                        ? `target__input`
                        : `target__input target__input-active`
                }
                       onKeyUp = {RegexPhoneNumber(this)}
                       maxLength = '11'
                       onChange={ onChange }
                       type="text"
                       value={inputValue.phoneNumber}
                />
                <label htmlfor="name" className="target__label">PHONE NUMBER</label>
            </div>

            <div className="emailField" >
                <input name="email" className={
                    inputValue.email.length < 1
                        ? `email__input`
                        : `email__input email__input-active`
                }
                       onKeyUp = {RegexEmail(this)}
                       onChange={ onChange }
                       type="text"
                       value={inputValue.email}
                />
                <label htmlfor="name" className="target__label" >EMAIL</label>
            </div>

            <div className = "emailInputField">
                @ &nbsp;&nbsp;
                <input className = 'emailInput'
                       onKeyUp = {RegexEmailInput(this)}
                       name = "emailSelector"
                       onChange={ onChange }
                       ref = {emailInput}
                       value = {inputValue.emailSelector}
                />
            </div>

            <div className = 'selectField'>
                <form name = 'form' >
                    <select name = 'emailSelector' className = "emailSelector" onChange = {onChange}>
                        <option value = 'self'> 직접입력 </option>
                        <option value = 'gmail.com'> gmail.com </option>
                        <option value = 'naver.com'> naver.com </option>
                        <option value = 'daum.com'> daum.com </option>
                        <option value = 'nate.com'> nate.com </option>
                        <option value = 'outlook.com'> outlook.com </option>

                    </select>
                </form>
            </div>

            <button type='button'  className = "sendCertButton" onClick={sendSertNumber} >인증번호 전송</button>
            <div className="certNumberField" >
            
                <input name="certNumber" className={
                    emailCertNumber.certNumber.length < 1
                        ? `cert__input`
                        : `cert__input cert__input-active`
                    }
                       onKeyUp = {RegexCertNumber(this)}
                       maxLength='6'
                       onChange={ emailCert }
                       type="text"
                       value={emailCertNumber.certNumber}
                />
                <label htmlfor="name" className="target__label" >CERT NUMBER</label>
            </div>

            <div className = "joinBtnContainer">
                <button className = "joinButton" onClick = {createUser}> JOIN </button>
            </div>

        </div>


    );
}

export default SignUpPage;