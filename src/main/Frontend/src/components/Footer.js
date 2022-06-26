import React from 'react';
import '../styles/FooterStyle.css';
import '../styles/IconStyle.css';

import Icon_kakao from '../Icons/kakaotalk.svg';
import Icon_insta from '../Icons/instagram.svg';

function Footer() {
    return (
        <div className = 'footer'>

            <div className = 'footerForLogo'>
               <h2 id = 'footerForLogo-text'> ROMAN88</h2> 
            </div>

            <div className = 'footer-left'>
                <h5> 대표자 : 정재환 </h5>
                <h5 > 사업자등록번호 : 413-19-01231 </h5>
                <h5 > 통신판매업 신고번호 : 2021 충남천안 1019 </h5>
            </div>
            
            <div className = 'footer-right'>
                <a href = 'http://pf.kakao.com/_seZMs' target = 'blank' > <img src = {Icon_kakao} id = 'Icon-size' style = {{ marginLeft : '80px'}} onClick/> </a>
                <a href = 'https://www.instagram.com/romanpalpal/' target = 'blank' > <img src = {Icon_insta} id = 'Icon-size' style = {{}} /> </a>
                <h5> Email : high0064@gmail.com </h5>
                <h5> COPYRIGHT © ROMAN88 </h5>
            </div>

        </div>
    );
}

export default Footer;

