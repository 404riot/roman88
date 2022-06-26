import React, { useEffect } from 'react';
import {useHistory, useLocation} from 'react-router';
import '../styles/BuyNowStyle.css';
import TOS from './TOS';

const BuyNow = ({signCheck}) => {

    const history = useHistory();

    useEffect(() => {
        if(!signCheck()) {
            history.push('/');
        }
    }, [])

    const location = useLocation();
    window.scrollTo(0,0);

    const modelNo = location.state.orderInfo.orderModelNo;
    const modelName = location.state.orderInfo.orderModelName;
    const color = location.state.orderInfo.orderColor;
    const psc = location.state.orderInfo.orderPsc;
    const size = location.state.orderInfo.orderSize;
    let price = location.state.orderInfo.orderPrice;
    const modelPrice = location.state.orderInfo.orderModelPrice;
    const thumnailShot = location.state.orderInfo.thumnailShot;

    let delivery = '';

    if(price < 50000) {
        delivery = '3,000원';
        price += 3000;
    } else {
        delivery = '0원';
    }

    return (
        <div className = 'BuyContainer'>

            <div>
                <h3> PURCHASE </h3>
                <hr style = {{ width : '100%'}} />
            </div>

            <table className = 'buyTable'>
                {/* <th> </th> */}
                <th id = 'productInfo'> 상품정보 </th>
                <th id = 'productPrice'> 상품금액 </th>
                <th id = 'productPcs'> 수량 </th>
                <th id = 'productDelivery'> 배송 </th>
                <th id = 'payment'> 결제금액 </th>
                <tr>
                    
                    <td>
                        <img src = {thumnailShot} id = 'buyThumbnail'/>
                        <p id = 'thumbnailText' >{modelName}</p> 
                        <p id = 'thumbnailText' >Model No. {modelNo}</p>
                        <p id = 'thumbnailText' >color : {color} / size : {size}</p>                        
                    </td>
                    <td>
                        <p id = 'tableText'>{modelPrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}원</p> 
                    </td>
                    <td>
                        <p id = 'tableText'>{psc}</p>
                    </td>
                    <td>
                        <p id = 'tableText'> 택배 {delivery} </p>
                        <p id = 'tableDeliveryText'> (50,000원 이상 무료배송) </p>
                    </td>
                    <td>
                        <p id = 'tableText'> {price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")} </p>
                    </td>
                </tr>
                
            </table>
            <hr style = {{ width : '100%'}} />

            <div>
                <div className = 'paymentContainer'>
                    <h3 id = 'naverPayBtn'> N pay</h3>
                </div>
                <h3 id = 'paymentPrice'> {price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")} 원 </h3>
                <h3 id = 'paymentPrice'> Total &nbsp;</h3>
            </div>

            <TOS />

        </div>
    );
}

export default BuyNow;

