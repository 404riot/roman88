import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
import { clearCookie } from '../Cookies';

const TopperSignIn = ({ setIsSigned }) => {

    const history = useHistory();

    const signOut = () => {
        clearCookie();
        localStorage.removeItem('ROMAN88_REFRESH_TOKEN');
        setIsSigned(false);
        history.push('/');
    }
  
    return (

        <div>
            <h4 style = {{ marginRight : '15%'}} id = 'topper-text' onClick = {signOut} > &nbsp;&nbsp; sign out </h4>
            <h4 id = 'topper-text' onClick = {() => history.push('/profile')} > profile &nbsp; | </h4>
            <h4 className = 'slogan'> GO TELL IT WE MADE IT </h4>
        </div>
    );
}

export default TopperSignIn;