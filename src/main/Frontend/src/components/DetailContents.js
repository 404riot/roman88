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

                        <p className = 'productText'> 로망팔팔 첫 번째 컬렉션 로고 티셔츠입니다.</p>
                        <p className = 'productText'> 릴렉스한 핏으로 제작되었으며 </p>
                        <p className = 'productText'> 편안한 착용감과 이목을 끄는 프린팅의 디자인입니다.</p>
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
                        <p className = 'productText'> [ 패키징 ]</p>
                        <br/>
                        <p className = 'productText'> 환경을 생각하여 재활용에 용이한 </p>
                        <p className = 'productText'> LDPE지퍼백과 종이박스 및 종이테이프로 포장합니다.</p>
                    </div>

                    <img id = 'detail-size' src = {sample_7} />
                    <img id = 'detail-size' src = {sample_8} />

                    <div className = 'productInnerEx1'>
                        <p className = 'productText'> [ 덤블워싱 ]</p>
                        <br/>
                        <p className = 'productText'> 원단에 수분을 공급한 상태에서 고온에 건조하는 공법으로 </p>
                        <p className = 'productText'> 내구성을 강화하여 옷의 수축을 방지합니다.</p>
                        <br/>
                        <p className = 'productText'> [ 텐타가공 ]</p>
                        <br/>
                        <p className = 'productText'> 고온으로 다림질하여 원단을 고정하는 공법으로 </p>
                        <p className = 'productText'> 옷의 뒤틀림을 방지합니다.</p>
                        <br/>
                        <p className = 'productText'> [ 바이오가공 ]</p>
                        <br/>
                        <p className = 'productText'> 원단이나 실에 효소 처리를 하여 섬유의 잔털을 제거하는 공법으로 </p>
                        <p className = 'productText'> 표면이 매끈하여 보풀이 적고 부드럽습니다.</p>
                        <br/>
                        <p className = 'productText'> [ 2도인쇄 ]</p>
                        <br/>
                        <p className = 'productText'> 프린팅의 갈리짐 및 찢어짐을 방지하기 위해 2번 인쇄하여 </p>
                        <p className = 'productText'> 색이 선명하고 크랙 또한 방지합니다.</p>
                    </div>

                    <img id = 'detail-size' src = {sample_11} />

                    <div className = 'productInnerEx1'>
                        <p className = 'productText'> 제품을 구매해 주신 모든 분들께 </p>
                        <p className = 'productText'> 감사의 마음을 담아 </p>
                        <p className = 'productText'> 로망팔팔 스티커를 동봉해 드립니다.</p>
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