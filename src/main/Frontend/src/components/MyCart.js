import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { qs } from 'url-parse';
import { getCookie } from '../Cookies';
import thumnailWhite from '../contentsSample/LogoTshirts-2.jpeg';
import thumnailBlack from '../contentsSample/LogoTshirts-3.jpeg';

import '../styles/CartStyle.css';

import TOS from './TOS';
import { useHistory } from 'react-router';

const MyCart = ({signCheck, signUserId}) => {

    const [trigger, setTrigger] = useState('none');
    const [removeFlag, setRemoveFlag] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const history = useHistory();

    const orderMemberId = {
        memberId : signUserId
    };

    const [memberCart, setMemberCart] = useState([{
        orderSeq : 0,
        orderMemberId : '',
        orderProductColor : '',
        orderProductPsc : '',
        orderProductSize : '',
        orderProductNo : '',
        orderProductName : '',
        orderProductPrice : '',
        orderPrice : 0
    }]);

    useEffect(async() => {

        window.scrollTo(0,0);

        if(!signCheck()) {
            history.push("/");
        } else {
            axios.post('/member/getMemberCart', JSON.stringify(orderMemberId), { headers : {
                "Content-Type": "application/json"
            }}).then((response) => {
                
                if(response.data.length != 0) {
    
                    const _memberCart = response.data.map((orderData) => ({
                        orderSeq : orderData.seq,
                        orderMemberId : orderData.orderMemberId,
                        orderProductColor : orderData.orderProductColor,
                        orderProductPsc : orderData.orderProductPsc,
                        orderProductSize : orderData.orderProductSize,
                        orderProductNo : orderData.orderProductNo,
                        orderProductName : orderData.orderProductName,
                        orderProductPrice : orderData.orderProductPrice,
                        orderPrice : orderData.orderPrice
                    }));
                    setTotalPrice(0);
                    setMemberCart(_memberCart);
                    setTrigger("items");
                    setRemoveFlag(false);
                }
            })
        }
    }, [removeFlag]);

    const [isChecked, setIsChecked] = useState(false);
    const [checkedItems, setCheckedItems] = useState(new Set());
    const [checkedItemsSeq, setCheckedItemsSeq] = useState([]);

    const checkHandler = ({target}) => {
        setIsChecked(!isChecked);
        checkedItemHandler(target.value, target.checked);
    }

    const checkedItemHandler = (id, isChecked) => {
        
        if(isChecked) {
            checkedItems.add(id);
            setCheckedItems(checkedItems);
            setCheckedItemsSeq(checkedItemsSeq.concat(memberCart[id].orderSeq));
            calcTotalPrice(id, 'add');
        } else if(!isChecked && checkedItems.has(id)) {
            checkedItems.delete(id);
            setCheckedItems(checkedItems);
            setCheckedItemsSeq(checkedItemsSeq.filter(item => item !== memberCart[id].orderSeq));
            calcTotalPrice(id, 'remove');
        }
        return checkedItems;
    }

    const calcTotalPrice = (id, flag) => {
        
        let temp = 0;
        let prevTotalPrice = totalPrice;
        let selectPrice = memberCart[id].orderPrice;

        if(flag == 'add') {
            if(selectPrice < 50000) {
                if(prevTotalPrice != 0 && selectPrice + prevTotalPrice > 50000 && prevTotalPrice < 50000) {    // 기존 선택 아이템이 상품가 + 배송비 인 경우
                    temp = selectPrice + prevTotalPrice - 3000;     // 기존 금액에서 배송비 제외 후 상품가만 합산
                } else if(selectPrice + prevTotalPrice > 50000 && prevTotalPrice > 50000) { // 기존 선택 아이템에 배송비가 없는 경우
                    temp = selectPrice + prevTotalPrice;
                } else {
                    temp = selectPrice + 3000;
                }
            } else if(selectPrice >= 50000) {
                if(prevTotalPrice != 0 && prevTotalPrice < 50000) {   
                    temp = selectPrice + prevTotalPrice - 3000;     
                } else if(prevTotalPrice > 50000) {
                    temp = selectPrice + prevTotalPrice;
                } else {
                    temp = selectPrice;
                }
            }
        } else if(flag == 'remove') {
            if(selectPrice < 50000) {
                if((selectPrice + 3000) == prevTotalPrice) {    // 기존 금액이 선택 아이템 금액과 동일한 경우
                    temp = 0;
                } 
                // 기존에 두 개 이상의 아이템이 추가되어 있는 경우, 새 아이템을 제외 후 50000원 미만인 경우
                else if((prevTotalPrice - selectPrice) != 0 && (prevTotalPrice - selectPrice) < 50000) {   
                    temp = prevTotalPrice - selectPrice + 3000;     // 선택 아이템 금액만 제외 후 배송비 추가
                } else if((prevTotalPrice - selectPrice) > 50000) { // 선택 아이템 금액을 제외해도 50000원 이상인 경우
                    temp = prevTotalPrice - selectPrice;     // 상품 금액만 제외
                } else {
                    temp = selectPrice + 3000;
                }
            } else if(selectPrice >= 50000) {
                if(selectPrice == prevTotalPrice) {    // 기존 금액이 선택 아이템 금액과 동일한 경우
                    temp = 0;
                } else if((prevTotalPrice - selectPrice) != 0 && (prevTotalPrice - selectPrice) < 50000) {
                    temp = prevTotalPrice - selectPrice + 3000;
                } else if((prevTotalPrice - selectPrice) > 50000) {
                    temp = prevTotalPrice - selectPrice;
                }
            }
        }
        setTotalPrice(temp);
    }

    const deleteTable = () => {

        if(checkedItemsSeq.length == 0) {
            alert('삭제할 상품을 하나 이상 선택해주세요. ')
        } else if(window.confirm("선택한 상품을 CART에서 삭제합니다. ")) {
            axios.post('/member/removeMemberCart', JSON.stringify(checkedItemsSeq), { headers : { "Content-Type": "application/json" },
            paramsSerializer : params => {          // axios.js 배열 파라미터 전송시 [] 없이 전송
                return qs.stringify(params);
            }}).then((response) => {
                if(response.data == "removed") {

                    // 모든 체크박스 상태 초기화
                    for(let i = 0; i < checkedItemsSeq.length; i++) {
                        document.getElementById("checking" + checkedItemsSeq[i]).checked = false;
                    }
                    checkedItems.clear();
                    setCheckedItems(checkedItems);
                    // 선택된 요소 배열 초기화
                    setCheckedItemsSeq(checkedItemsSeq.filter(item => item == 0));

                    setRemoveFlag(true);
                } else if(response.data == "failed") {
                    alert("An unknown error occurred");
                }   
            })
        }
    }

    let thumnailShot = '';

    return (
        <div className = 'CartContainer'>

            <div>
                <h3> CART </h3>
                <hr style = {{ width : '100%'}} />
            </div>

            <table className = 'cartTable'>
                <th> </th>
                <th id = 'productInfoInCart'> 상품정보 </th>
                <th id = 'productPriceInCart'> 상품금액 </th>
                <th id = 'productPcsInCart'> 수량 </th>
                <th id = 'productDeliveryInCart'> 배송 </th>
                <th id = 'paymentInCart'> 결제금액 </th> 

                {
                    memberCart.map((orderData, index) => {
                
                        if(orderData.orderProductColor == 'black') {
                            thumnailShot = thumnailBlack;
                        } else if(orderData.orderProductColor == 'white') {
                            thumnailShot = thumnailWhite;
                        }

                        if(trigger == 'none') {
                            
                            return (
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td> </td>
                                    <td style ={{width : '300px',textAlign : 'left'}}> <p> 추가된 상품이 없습니다.</p> </td>
                                </tr>
                            );

                        } else if(trigger == 'items') {

                            var orderPriceTotal = orderData.orderPrice;
                            var deliOrder = 0;

                            if(orderData.orderPrice < 50000) {
                                deliOrder = 3000;
                            } else {
                                deliOrder = 0;
                            }

                            orderPriceTotal += deliOrder;

                            return (

                                <tr>
                                    <td key = {orderData.id}>
                                        <label className = 'checker' for = {"checking" + orderData.orderSeq} >
                                            <input type="checkbox" id = {"checking" + orderData.orderSeq} className = 'checkInput' value={index} onChange={(e) => checkHandler(e)} />
                                            <span class="checkmark"></span>
                                        </label>
                                    </td>
                                    <td key = {orderData.id}>
                                        <img src = {thumnailShot} id = 'buyThumbnail'/>
                                        <p id = 'thumbnailText' > {orderData.orderProductName} </p> 
                                        <p id = 'thumbnailText' >Model No. {orderData.orderProductNo}</p>
                                        <p id = 'thumbnailText' >color : {orderData.orderProductColor} / size : {orderData.orderProductSize}</p>                        
                                    </td>
                                    <td key = {orderData.id}>
                                        <p id = 'tableText'>{orderData.orderProductPrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</p> 
                                    </td>
                                    <td key = {orderData.id}>
                                        <p id = 'tableText'>{orderData.orderProductPsc}</p>
                                    </td>
                                    <td key = {orderData.id}>
                                    <p id = 'tableText' name = {'deliveryPrice' + orderData.orderSeq}> {deliOrder}원 </p>
                                        <p id = 'tableDeliveryText'> (50,000원 이상 무료배송) </p>
                                    </td>
                                    <td key = {orderData.id}>
                                        <p id = 'tableText'> {orderPriceTotal.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")} </p>
                                    </td>
                                </tr>
    
                            )

                        }

                    })
                } 


            </table>

            <hr style = {{ width : '100%'}} />

            <div>
                <div className = 'cartPaymentContainer'>
                    <h3 id = 'cartNaverPayBtn'> N pay</h3>
                </div>
                <div className = 'deleteContainer' onClick = {deleteTable}>
                    <h3 id = 'deleteBtn'> DELETE</h3>
                </div>
                <h3 id = 'cartPaymentPrice'> {totalPrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")} 원 </h3>
                <h3 id = 'cartPaymentPrice'> Total &nbsp;</h3>
            </div>

            <TOS />

        </div>
    );
}


export default MyCart;