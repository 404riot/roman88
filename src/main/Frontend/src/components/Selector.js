import React, {useState, useCallback, useEffect} from 'react';
import $ from 'jquery';
import axios from 'axios';

import '../styles/SelectorStyle.css';

import SizeSelector from '../Selector/SizeSelector';
import ColorSelector from '../Selector/ColorSelector';
import Counter from '../Selector/Counter';

import cart from '../sampleIcons/cart2.svg';
import heart from '../sampleIcons/heart.svg';
import { useHistory } from 'react-router';
import Cookies from 'universal-cookie';

const Selector = ({dressThumbnail, modelColorList, modelSizeList, model, signCheck, memberInfo}) => {

    const history = useHistory();
    const cookies = new Cookies();
    
    const [psc, setPsc] = useState(1);
    const [price, setPrice] = useState(model.modelPrice);
    const [modelFullNo, setModelFullNo] = useState('');
    const [inputs, setInputs] = useState({
        color : '',
        size : ''
    });

    const {color, size} = inputs;
    
    const onChange = (e) => {
        
        const { value, name } = e.target;
        var fullModelName = model.modelNo;
        
        if(value == 'small') {
            setModelFullNo(fullModelName + 'S');
        } else if( value == 'medium') {
            setModelFullNo(fullModelName + 'M');
        } else if( value == 'large') {
            setModelFullNo(fullModelName + 'L');
        } else if( value == 'xlarge') {
            setModelFullNo(fullModelName + 'XL');
        } else if( value == 'xxlarge') {
            setModelFullNo(fullModelName + 'XXL');
        }

        setInputs({
            ...inputs,
            [name]:value
        });
        
    };
    
    const onIncrease = useCallback(() => {
        setPsc(psc + 1);
        setPrice(price + 32000);
    });
    
    const onDecrease = useCallback(() => {
        if(psc <= 1) {
            setPsc(1);
        } else {
            setPsc(psc - 1);
            setPrice(price - 32000);
        }
    });

    function sendOrder() {

        // axios에서 받아온 기본 data에 user가 선택한 데이터로 수정하여 재저장.
        const orderColor = inputs.color;
        const orderSize = inputs.size;
        const orderPsc = psc;
        const orderModelNo = modelFullNo;
        const orderPrice = price;

        // modelName, price는 고정값이므로 axios에서 받아온 data 사용
        const orderModelName = model.modelName;
        const orderModelPrice = model.modelPrice;

        // aws storage에 img집어넣으면 그 때 수정할거.
        let thumnailShot = '';
        if(orderColor == 'black') {
            thumnailShot = dressThumbnail.thumnailBlack;
        } else if(orderColor == 'white') {
            thumnailShot = dressThumbnail.thumnailWhite;
        }

        const orders = {
            orderColor,
            orderSize,
            orderPsc,
            orderModelNo,
            orderPrice,
            orderModelName,
            orderModelPrice,
            thumnailShot
        };

        if(orderColor == '') {
            alert('[색상] 옵션을 선택해 주세요.');
        } else if(orderSize == '') {
            alert('[사이즈] 옵션을 선택해 주세요. ');
        } else if(!signCheck()) {
            alert('로그인이 필요한 서비스입니다. 로그인 후 이용해 주세요.')
        } else {
            return (
                history.push({
                    pathname : '/buyProduct',
                    state : { orderInfo : orders }
                })
            );
        }
    }    

    const addCart = () => {

        if(!signCheck()) {
            alert('로그인이 필요한 서비스입니다. 로그인 후 이용해 주세요.')
        } else {
            // axios에서 받아온 기본 data에 user가 선택한 데이터로 수정하여 재저장.
            const orderColor = inputs.color;
            const orderSize = inputs.size;
            const orderPsc = psc;
            const orderModelNo = modelFullNo;
            const orderPrice = price;

            // modelName, price는 고정값이므로 axios에서 받아온 data 사용
            const orderModelName = model.modelName;
            const orderModelPrice = model.modelPrice;


            const memberOrder = {
                orderMemberId : memberInfo.id,
                orderProductColor : orderColor,
                orderProductPsc : orderPsc,
                orderProductSize : orderSize,
                orderProductNo : orderModelNo,
                orderProductName : orderModelName,
                orderProductPrice : orderModelPrice,
                orderPrice : orderPrice
            }

            axios.post('member/addMemberCart', JSON.stringify(memberOrder), { headers : {
                "Content-Type" : "application/json"
            }}).then((response) => {
                
                if(response.data == 'save') {
                    alert("Cart에 추가되었습니다. profile의 MyCart에서 확인하실 수 있습니다.");
                }
            });
        }
        
    }

    $(function(){
        $(window).scroll(function(){  
            var rollIt = $(this).scrollTop() >= 1000; 
            var windowSize = $(window).width();

            if(rollIt){ 
                // scroll down
                if(windowSize >= 1400 && windowSize <= 1800){
                    $(".selector").css({"marginLeft":"63%"});    
                }else if(windowSize > 1800 && windowSize <= 1920) {
                    $(".selector").css({"marginLeft":"57%"});    
                } else if(windowSize > 1920 && windowSize <= 2560) {
                    $(".selector").css({"marginLeft":"60%"});    
                }
                
            } else {
                // scroll up
                if(windowSize >= 1400 && windowSize <= 1800){
                    $(".selector").css({"marginLeft":"45%"});  
                }else if(windowSize > 1800 && windowSize <= 1920) {
                    $(".selector").css({"marginLeft":"45%"});    
                } else if(windowSize > 1920 && windowSize <= 2560) {
                    $(".selector").css({"marginLeft":"35%"});    
                } 
                
            }
        });
    });

    
    return (
            <div className = 'selectContainer'>
                <div className = 'selector'>
                    <h5 id = 'title'> ROMAN88 / model no. {model.modelNo} </h5> 
                    <p id = 'dressName' > {model.modelName} </p> 
                    
                    <p  id = 'price' > KRW {model.modelPrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")} </p>
                    <hr id = 'bar1' />

                    <ColorSelector modelColor = {modelColorList} props = {onChange} />
                                
                    <Counter plus = {onIncrease} minus = {onDecrease} psc = {psc} />

                    <SizeSelector modelSizeList = {modelSizeList} props = {onChange} />
                    
                    <hr id = 'bar2' />

                    <div className = 'selectorContainer'>
                        <h4> Order </h4>
                        <div className = 'selectorMenu'>
                            <div className = 'colorText'>
                                <p> {color} </p>
                            </div>
                            <div className = 'pscText'>
                                <p> {psc} </p>
                            </div>
                            <div className = 'sizeText' >
                                <p> {size} </p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 id = 'total' > Total </h4>
                        <p id = 'totalPrice'> {price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")} </p>
                    </div>

                    <hr id = 'bar3' />

                    <div>
                        <div className = 'buy' onClick = {sendOrder}>
                            <p  id = 'buyButton'> BUY NOW </p>
                            <img src = {heart} id = 'buyImg' />       
                        </div>

                        <div className = 'buy' onClick = {addCart} id = 'cartContainer'>
                            <p id = 'cartButton'> ADD CART </p>
                            <img src = {cart} id = 'cartImg' />
                        </div>
                    </div>

                </div>


            </div>
    )
}

export default React.memo(Selector);