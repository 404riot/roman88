// Regular Expression
export const RegexOnlyString = (value) => {
    return(value.replace(/[^ㄱ-ㅎ가-힣a-z]/g, ""));
}

export const RegexOnlyEngNumber = (value) => {
    return(value.replace(/[^a-z0-9]/g,""));
}

export const RegexOnlyNumber = (value) => {
    return(value.replace(/[^0-9]/g, ""));
}

export const RegexOnlyEmailName = (value) => {
    return(value.replace(/[^a-z0-9-_]/g,""));
}

export const RegexOnlyEmailDomain = (value) => {
    return(value.replace(/((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,""));
}

export const RegexOnluEmailAddress = (value) => {
    let emailPattern  = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return(value.match(emailPattern));
}