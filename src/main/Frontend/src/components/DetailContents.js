import React, { useEffect, useState } from 'react';

import '../styles/DetailContentsStyle.css';
import Selector from './Selector';

import sample_1 from '../contentsSample/LogoTshirts-1.jpeg';
import sample_2 from '../contentsSample/LogoTshirts-2.jpeg';
import sample_3 from '../contentsSample/LogoTshirts-3.jpeg';
import sample_4 from '../contentsSample/LogoTshirts-4.jpeg';
import sample_5 from '../contentsSample/LogoTshirts-5.jpeg';
import sample_6 from '../contentsSample/LogoTshirts-6.jpeg';
import sample_7 from '../contentsSample/LogoTshirts-7.jpeg';
import sample_8 from '../contentsSample/LogoTshirts-8.jpeg';
import sample_9 from '../contentsSample/LogoTshirts-9.jpeg';
import sample_10 from '../contentsSample/LogoTshirts-10.jpeg';
import sample_11 from '../contentsSample/LogoTshirts-11.jpeg';
import sample_12 from '../contentsSample/LogoTshirts-12.jpeg';
import sample_13 from '../contentsSample/LogoTshirts-13.jpeg';
import sample_14 from '../contentsSample/LogoTshirts-14.jpeg';
import {useHistory, useLocation} from 'react-router';

const DetailContents = ({signCheck, memberInfo}) => {

    window.scrollTo(0,0);
    const location = useLocation();
    const history = useHistory();

    let color =  location.state.info.model.modelColor;
    let tempColorList = color.split(' ');
    let size = location.state.info.model.modelSize;
    let tempSizeList = size.split(' ');
    let summaryList = location.state.info.model.modelSizeSummary;
    let tempSummaryList = summaryList.split(' ');

    // temp
    const dressThumbnail = {
        thumnailBlack : sample_3,
        thumnailWhite : sample_2 
    };

    const [modelColorList, setModelColorList] = useState([{
        color : ''
    }]); 
    const [modelSizeList, setModelSizeList] = useState([{
        size : '',
        sizeSummary : ''
    }]);

    useEffect(() => {
        const _setModelSizeList = tempSizeList.map((value, index) => ({
            size : tempSizeList[index],
            sizeSummary : tempSummaryList[index]
        }));
        setModelSizeList(_setModelSizeList);
        setModelColorList(tempColorList);
    },[])
    

    return (
        <div>
            <div className = 'detailContentsContainer' >
                <div className = 'detailShot'>
                    <img id = 'thumnail-size' src = {sample_1} />

                    <div className = 'productExContainer'>
                        <h1 className = 'productEx1'> ROMAN88 </h1>
                        <h1 className = 'productEx2'>  2021 S/S COLECTION </h1>
                        <h1 className = 'productEx3'> LOGO T SHIRTS </h1>

                        <p className = 'productText'> ???????????? ??? ?????? ????????? ?????? ??????????????????.</p>
                        <p className = 'productText'> ???????????? ????????? ?????????????????? </p>
                        <p className = 'productText'> ????????? ???????????? ????????? ?????? ???????????? ??????????????????.</p>
                    </div>

                    <img id = 'detail-size' src = {sample_2} />
                    <img id = 'detail-size' src = {sample_4} />
                    <img id = 'detail-size' src = {sample_13} />
                    <img id = 'detail-size' src = {sample_10} />
                    <img id = 'detail-size' src = {sample_3} />
                    <img id = 'detail-size' src = {sample_5} />
                    <img id = 'detail-size' src = {sample_12} />
                    <img id = 'detail-size' src = {sample_9} />
                    <img id = 'detail-size' src = {sample_6} />

                    <div className = 'productInnerEx1'>
                        <p className = 'productText'> [ ????????? ]</p>
                        <br/>
                        <p className = 'productText'> ????????? ???????????? ???????????? ????????? </p>
                        <p className = 'productText'> LDPE???????????? ???????????? ??? ?????????????????? ???????????????.</p>
                    </div>

                    <img id = 'detail-size' src = {sample_7} />
                    <img id = 'detail-size' src = {sample_8} />

                    <div className = 'productInnerEx1'>
                        <p className = 'productText'> [ ???????????? ]</p>
                        <br/>
                        <p className = 'productText'> ????????? ????????? ????????? ???????????? ????????? ???????????? ???????????? </p>
                        <p className = 'productText'> ???????????? ???????????? ?????? ????????? ???????????????.</p>
                        <br/>
                        <p className = 'productText'> [ ???????????? ]</p>
                        <br/>
                        <p className = 'productText'> ???????????? ??????????????? ????????? ???????????? ???????????? </p>
                        <p className = 'productText'> ?????? ???????????? ???????????????.</p>
                        <br/>
                        <p className = 'productText'> [ ??????????????? ]</p>
                        <br/>
                        <p className = 'productText'> ???????????? ?????? ?????? ????????? ?????? ????????? ????????? ???????????? ???????????? </p>
                        <p className = 'productText'> ????????? ???????????? ????????? ?????? ??????????????????.</p>
                        <br/>
                        <p className = 'productText'> [ 2????????? ]</p>
                        <br/>
                        <p className = 'productText'> ???????????? ????????? ??? ???????????? ???????????? ?????? 2??? ???????????? </p>
                        <p className = 'productText'> ?????? ???????????? ?????? ?????? ???????????????.</p>
                    </div>

                    <img id = 'detail-size' src = {sample_11} />

                    <div className = 'productInnerEx1'>
                        <p className = 'productText'> ????????? ????????? ?????? ?????? ????????? </p>
                        <p className = 'productText'> ????????? ????????? ?????? </p>
                        <p className = 'productText'> ???????????? ???????????? ????????? ????????????.</p>
                    </div>

                </div>

                <div className = 'select'>
                    <Selector memberInfo={memberInfo} dressThumbnail = {dressThumbnail} modelColorList = {modelColorList} modelSizeList = {modelSizeList} model = {location.state.info.model} signCheck={signCheck}/>
                </div>

            </div>
        </div>
    );
}

export default DetailContents;