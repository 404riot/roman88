import React from 'react';
import { withRouter } from 'react-router-dom';
import '../styles/MainTopStyle.css';
import HambergerMenu from './HambergerMenu';
import TopperSignIn from './TopperSignIn';
import TopperDefault from './TopperDefault';
import { useHistory } from 'react-router';
import { getCookie } from '../Cookies';

export const MainTop = ({ setIsSigned }) => {

    const history = useHistory();
    const home = () => { history.push('/'); }
    const contents = () => { history.push('/contents'); }

    const Topper = () => {

        if((getCookie('ROMAN88_ACCESS_TOKEN') != null && getCookie('ROMAN88_ACCESS_TOKEN') != '') &&
            getCookie('ROMAN88_SIGN_USER_ID') != null && getCookie('ROMAN88_SIGN_USER_ID') != '') {
            return <TopperSignIn setIsSigned = {setIsSigned}/>;
        } else {
            return <TopperDefault />;
        }
    }

    return (
        <div>
            <div className = 'topper' >
                {/* <h4 style = {{ marginRight : '15%'}} id = 'topper-text' onClick = {signIn}> &nbsp;&nbsp; sign in </h4>
                <h4 id = 'topper-text' onClick = {signUp}> sign up &nbsp; | </h4>
                <h4 className = 'slogan'> GO TELL IT WE MADE IT </h4> */}
                <Topper />
            </div>

            <div className = 'MainContainer'>
                <div className = 'container'>  
                    <div className = 'container-left'>
                        <div className = 'logo' onClick = { home } >
                            ROMAN88
                        </div>

                        <div className = 'menu' >
                            <h4 id = 'menu-text'  onClick = { contents }> T SHIRTS</h4>
                        </div>
                    </div>

                    <div className = 'container-right'>
                        <HambergerMenu history = {history}/>
                    </div>

                </div>
                
            </div>

        </div>
    );
}

export default withRouter(MainTop);