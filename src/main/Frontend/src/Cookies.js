import Cookies from "universal-cookie";

const cookies = new Cookies();

export const setCookie = (name, value, option) => {
    return cookies.set(name, value, { ...option });
}

export const getCookie = (name) => {
    return cookies.get(name);
}

export const clearCookie = () => {
    cookies.remove('ROMAN88_ACCESS_TOKEN');
    cookies.remove('ROMAN88_ACCESS_TOKEN_EXP');
    cookies.remove('ROMAN88_SIGN_USER_AUTH');
    cookies.remove('ROMAN88_SIGN_USER_ID');
}