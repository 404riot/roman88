import React from 'react';
import MainLogo from '../sampleIcons/mainLogo2.jpeg';
import '../styles/MainStyle.css';

const Main = () => {   

    window.scrollTo(0,0);

    return (
        <div>
            <img src = {MainLogo} id = 'mainImg' />
        </div>
    );
}


export default Main;
