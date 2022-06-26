import React, {useEffect, useState} from 'react';
import axios from 'axios';

import '../styles/MembersManageStyle.css';

const MembersManage = () => {

    const [membersAccount, setMembersAccount] = useState([{
        name : '',
        id : '',
        address : '',
        postCode : '',
        phoneNumber : '',
        email : ''
    }]);

    useEffect(async() => {

        axios.post('/api/Manage/MembersAccount').then((response) => {

            console.log(response.data);

            const _memberAccount = response.data.map((account) => ({
                name : account.name,
                id : account.id,
                address : account.address,
                postCode : account.postCode,
                phoneNumber : account.phoneNumber,
                email : account.email
            }));

            setMembersAccount(_memberAccount);

        });

    },[]);

    return (
        <div className = 'membersManageContainer'>
            <h4> Members </h4>
            <hr style = {{ border : '0.5px solid black', marginTop : '-15px', width : '100%' }}/>

            <table className = 'membersTable'>
                <th id = 'nameRow'> 이름 </th>
                <th id = 'idRow'> 아이디 </th>
                <th id = 'addressRow'> 주소 </th>
                <th id = 'postCodeRow'> 우편번호 </th>
                <th id = 'phoneNumberRow'> 전화번호 </th>
                <th id = 'emailRow'> 이메일 </th>

                {
                    membersAccount.map((account, index) => {

                        return (
                            <tr className = "accountRow">

                                <td key = {index+1}>
                                    <h5> {account.name} </h5>
                                </td>
                                <td key = {index+2}>
                                    <h5> {account.id} </h5>
                                </td>
                                <td key = {index+3}>
                                    <h5> {account.address} </h5>
                                </td>
                                <td key = {index+4}>
                                    <h5> {account.postCode} </h5>
                                </td>
                                <td key = {index+5}>
                                    <h5> {account.phoneNumber} </h5>
                                </td>
                                <td key = {index+6}>
                                    <h5> {account.email} </h5>
                                </td>
                                
                            </tr>
                        );

                    })
                }

            </table>
        </div>
    );

}

export default MembersManage;