let __TOKEN = "";
let __LocalToken =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiQWRtaW5AZ21pYWwuY29tIiwidXNlcm5hbWUiOiJoZWFkcnQifQ.wbKf8D3AO7gvgseI-odMcOWGogZafVpbNxhYP74sbH0";
let __USER = {};
let __USER_TYPE = 2;

export function __setTokenAndUser(authToken, user) {
    __TOKEN = authToken;
    __USER = user;
}
export function __setUser(user) {
    __USER = user;
}
export function __getToken() {
    return __TOKEN;
}
export function __getLocalToken() {
    return __LocalToken;
}
export function __setLocalToken(token) {
    return (__LocalToken = token);
}
export function __getUser() {
    return __USER;
}

export function __setUserType(type) {
    __USER_TYPE = type;
}
export function __getUserType() {
    return __USER_TYPE;
}
