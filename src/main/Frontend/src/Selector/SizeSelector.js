import React, {useState, Component, Fragment} from 'react';
import '../styles/SelectorStyle.css';

const SizeSelector = ({modelSizeList, props }) => {

    return (
        
            <div className = 'sizeSelectorContainer'>
                <h4  id = 'sizeTitle'> Size </h4>
                <div className = 'sizeSelector'>
                    {modelSizeList.map(value => (
                    <Fragment>
                        <input type="radio" name="size" id={value.size} value={value.size} onClick = {props}/>
                        <label className = 'sizeCheck' for = {value.size} ><span class={value.size}>{value.sizeSummary}</span></label>
                    </Fragment>
                    ))}
                </div>      
            </div>
        
        
    );
};

export default React.memo(SizeSelector);