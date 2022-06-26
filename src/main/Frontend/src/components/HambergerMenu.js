import React from 'react';
import { BrowserRouter as Router, Route, Swtich, Link, withRouter} from 'react-router-dom';
import { useHistory } from 'react-router';

import '../styles/HambergerStyle.css';
import '../styles/IconStyle.css';

import watermark4 from '../sampleIcons/watermark4.svg';

export const HambergerMenu = () => {

    const history = useHistory();

    const pushHome = () => { history.push('/'); }
    const pushNotice = () => { history.push('/notice'); }
    const pushGoods = () => { alert('서비스 준비중입니다.') }
    const pushQnA = () => { history.push('/qna') }
    const pushAbout = () => { history.push('/about'); }
    const pushContact = () => { history.push('/contact'); }

    return (
        <div class="menu-wrapper">
            <div class="menuHam">
                <label>MORE</label>
                <ul class="nav-links">
                    <li onClick={pushHome}>Home</li>
                    <li onClick={pushNotice}>Notice</li>
                    <li onClick={pushGoods}>Goods</li>
                    <li onClick={pushQnA}>QnA</li>
                    <li onClick={pushAbout}>About</li>
                    <li onClick={pushContact}>Contact</li>
                </ul>
            </div>
        </div>
    );
}

export default withRouter(HambergerMenu);
