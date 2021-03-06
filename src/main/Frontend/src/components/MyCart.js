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
                if(prevTotalPrice != 0 && selectPrice + prevTotalPrice > 50000 && prevTotalPrice < 50000) {    // ?????? ?????? ???????????? ????????? + ????????? ??? ??????
                    temp = selectPrice + prevTotalPrice - 3000;     // ?????? ???????????? ????????? ?????? ??? ???????????? ??????
                } else if(selectPrice + prevTotalPrice > 50000 && prevTotalPrice > 50000) { // ?????? ?????? ???????????? ???????????? ?????? ??????
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
                if((selectPrice + 3000) == prevTotalPrice) {    // ?????? ????????? ?????? ????????? ????????? ????????? ??????
                    temp = 0;
                } 
                // ????????? ??? ??? ????????? ???????????? ???????????? ?????? ??????, ??? ???????????? ?????? ??? 50000??? ????????? ??????
                else if((prevTotalPrice - selectPrice) != 0 && (prevTotalPrice - selectPrice) < 50000) {   
                    temp = prevTotalPrice - selectPrice + 3000;     // ?????? ????????? ????????? ?????? ??? ????????? ??????
                } else if((prevTotalPrice - selectPrice) > 50000) { // ?????? ????????? ????????? ???????????? 50000??? ????????? ??????
                    temp = prevTotalPrice - selectPrice;     // ?????? ????????? ??????
                } else {
                    temp = selectPrice + 3000;
                }
            } else if(selectPrice >= 50000) {
                if(selectPrice == prevTotalPrice) {    // ?????? ????????? ?????? ????????? ????????? ????????? ??????
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
            alert('????????? ????????? ?????? ?????? ??????????????????. ')
        } else if(window.confirm("????????? ????????? CART?????? ???????????????. ")) {
            axios.post('/member/removeMemberCart', JSON.stringify(checkedItemsSeq), { headers : { "Content-Type": "application/json" },
            paramsSerializer : params => {          // axios.js ?????? ???????????? ????????? [] ?????? ??????
                return qs.stringify(params);
            }}).then((response) => {
                if(response.data == "removed") {

                    // ?????? ???????????? ?????? ?????????
                    for(let i = 0; i < checkedItemsSeq.length; i++) {
                        document.getElementById("checking" + checkedItemsSeq[i]).checked = false;
                    }
                    checkedItems.clear();
                    setCheckedItems(checkedItems);
                    // ????????? ?????? ?????? ?????????
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
                <th id = 'productInfoInCart'> ???????????? </th>
                <th id = 'productPriceInCart'> ???????????? </th>
                <th id = 'productPcsInCart'> ?????? </th>
                <th id = 'productDeliveryInCart'> ?????? </th>
                <th id = 'paymentInCart'> ???????????? </th> 

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
                                    <td style ={{width : '300px',textAlign : 'left'}}> <p> ????????? ????????? ????????????.</p> </td>
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
                                    <p id = 'tableText' name = {'deliveryPrice' + orderData.orderSeq}> {deliOrder}??? </p>
                                        <p id = 'tableDeliveryText'> (50,000??? ?????? ????????????) </p>
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
                <h3 id = 'cartPaymentPrice'> {totalPrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")} ??? </h3>
                <h3 id = 'cartPaymentPrice'> Total &nbsp;</h3>
            </div>

            <TOS />

        </div>
    );
}


export default MyCart;