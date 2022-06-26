import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';

import '../styles/MainContentsStyle.css';
import sample_1 from '../contentsSample/LogoTshirts-1.jpeg';
import sample_3 from '../contentsSample/LogoTshirts-2.jpeg';
import sample_4 from '../contentsSample/LogoTshirts-3.jpeg';
import sample_5 from '../contentsSample/LogoTshirts-14.jpeg';

const Contents = () => {    

    const history = useHistory();
    window.scrollTo(0,0);

    const [models, setModels] = useState([{
        modelName : '',
        modelNo : '',
        modelColor : '',
        modelPrice : 0,
        modelSize : '',
        modelSizeSummary : ''
    }]);

    useEffect(() => {
        axios.get('contents/modelsInfo').then((response) => {
            
            const _setModels = response.data.map((tempData) => ({
                modelName : tempData.modelName,
                modelNo : tempData.modelNo,
                modelColor : tempData.modelColor,
                modelPrice : tempData.modelPrice,
                modelSize : tempData.modelSize,
                modelSizeSummary : tempData.modelSizeSummary
            }));

            setModels(_setModels);
        });
    },[]);

    return (
        <div className = 'MainContentsContainer'>

            {
                models.map((model) => (
                    <div className = 'Contents'>
                        <img id = 'Contents-size' style = {{cursor : 'pointer'}} src = {sample_1} onClick = { 
                            () => {history.push({ 
                                    pathname : '/detail', 
                                    state : { info : {model}}
                                })
                                }   
                            } 
                        />
                        <h4> {model.modelName} </h4>
                        <h5> KRW {model.modelPrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")} </h5>
                    </div>
                ))
            }
            
            

            <div className = 'Contents-right'>
                <img id = 'Contents-size' src = {sample_3} />
                <h4  > SAMPLE-A </h4>
                <h5 > KRW 32,000 </h5>
            </div>

            <div className = 'Contents'>
                <img id = 'Contents-size' src = {sample_4} />
                <h4> SAMPLE-B </h4>
                <h5> KRW 32,000 </h5>
            </div>

            <div className = 'Contents-right'>
                <img id = 'Contents-size' src = {sample_5}/>
                <h4  > SAMPLE-C </h4>
                <h5  > KRW 32,000 </h5>
            </div>
           
        </div>
    );
}


export default Contents;
