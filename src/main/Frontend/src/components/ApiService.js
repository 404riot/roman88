import React from 'react';
import axios from 'axios';

const USER_API_BASE_URL = "http://localhost:8080/api/member";

class ApiService {

    fetchMain () {
        return axios.get(USER_API_BASE_URL)
    }


    fetchUsers(userID) {
        return axios.get(USER_API_BASE_URL + '/' + userID);
    }
}