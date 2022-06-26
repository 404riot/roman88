import React, { Fragment } from 'react';

import '../styles/SelectorStyle.css';

const ColorSelector = ({modelColor, props}) => {

    return (
        <div className = 'colorSelectorContainer' >
            <h4 id = 'colorTitle'> Color </h4>
            
            {modelColor.map(value => (
                <>
                    <input  type="radio" name="color" id={value} value={value} onChange = {props} />
                    <label  className = 'colorCheck' for = {value}><span class={value}></span></label>
                </>
            ))}    
        </div>
    );
}

export default ColorSelector;