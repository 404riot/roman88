import { getCookie } from "./Cookies"

export const SignCheck = () => {

    if((getCookie('ROMAN88_ACCESS_TOKEN') != null && getCookie('ROMAN88_ACCESS_TOKEN') != '') &&
        getCookie('ROMAN88_SIGN_USER_ID') != null && getCookie('ROMAN88_SIGN_USER_ID') != '') {
        return true;
    } else {
        return false;
    }

}