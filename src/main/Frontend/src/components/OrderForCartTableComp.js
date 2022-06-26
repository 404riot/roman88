import React from 'react';

const OrderForCartTableComp = ({ cartData }) => {

    return (
        <>
            <tr>
                <td>
                    <label className = 'checker' htmlfor="check">
                        <input type="checkbox" id="check" className = 'checkInput'/>
                        <span class="checkmark"></span>
                    </label>
                </td>
                <td>
                    {/* <img src = {thumnailShot} id = 'buyThumbnail'/> */}
                    <p id = 'thumbnailText' >{cartData.orderModelName}</p> 
                    <p id = 'thumbnailText' >Model No. {cartData.orderModelNo}</p>
                    <p id = 'thumbnailText' >color : {cartData.orderColor} / size : {cartData.orderSize}</p>                        
                </td>
                <td>
                    <p id = 'tableText'>{cartData.orderModelPrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</p> 
                </td>
                <td>
                    <p id = 'tableText'>{cartData.orderPsc}</p>
                </td>
                <td>
                    {/* <p id = 'tableText'> 택배 {delivery} </p> */}
                    <p id = 'tableDeliveryText'> (50,000원 이상 무료배송) </p>
                </td>
                <td>
                    <p id = 'tableText'> {cartData.orderPrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")} </p>
                </td>
            </tr>
        </>
    );

}

export default OrderForCartTableComp;