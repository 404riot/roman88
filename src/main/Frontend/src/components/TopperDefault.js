import React from 'react';
import { useHistory } from 'react-router';

const TopperDefault = () => {
    
    const history = useHistory();

    return (
        <div>

            <h4 style = {{ marginRight : '15%'}} id = 'topper-text' onClick = {() => history.push('/signInPage')}> &nbsp;&nbsp; sign in </h4>
            <h4 id = 'topper-text' onClick = {() => history.push('/signUpPage')}> sign up &nbsp; | </h4>
            <h4 className = 'slogan'> GO TELL IT WE MADE IT </h4>
        </div>
    );
}

export default TopperDefault;