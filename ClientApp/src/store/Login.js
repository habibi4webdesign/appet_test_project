import Axios from 'axios'
import qs from 'qs'
import cookie from 'react-cookies'

const requestLoginType = 'REQUEST_LOGIN';
const responseLoginType = 'RESPONSE_LOGIN';

const logoutType = 'LOGOUT';

const requestInitializeAppType = 'REQUEST_INITIALIZE_APP';
const responseInitializeAppType = 'RESPONSE_INITIALIZE_APP';

const initialState = { error: null, isLoading: false, isAuthenticated: false, url: "", initialized: false, token: null, expires_in: 0, refresh_token: "" };

export const actionCreators = {

    requestLogin: (loginData) => async (dispatch, getState) => {

        dispatch({ type: requestLoginType });
        const login = getState().login;

        const url = `https://gateway.tameemco.ir/uaa/oauth/token`;

        let data = {
            username: loginData.username,
            password: loginData.password,
            grant_type: 'password',
        }

        try {
            var config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'Authorization': 'Basic d2ViX2FwcDo=',
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": "true ",
                    'Access-Control-Allow-Headers': 'X-Auth-Token, X-User-Id'

                }
            };

            const response = await Axios.post(url, qs.stringify(data), config).catch(e => e.response);
            debugger;
            const result = {
                isAuthenticated: response.status === 200,
                token: response.data.access_token,
                expires_in: response.data.expires_in,
                refresh_token: response.data.refresh_token
            };

            if (response.status === 400) {
                result.error = "نام کاربری یا رمز عبور وارد شده صحیح نمی باشد"
            }

            if (response.status === 200) {
                let expire = (new Date()).valueOf();
                expire += response.data.expires_in * 1000;
                cookie.save('token', result.token, { path: '/', expires: new Date(expire) }, );

            }

            dispatch({ type: responseLoginType, ...result });
        }
        catch (error) {
            const result = { isAuthenticated: false, error: "متاسفانه خطایی پیش آمده" };
            dispatch({ type: responseLoginType, ...result });
        }

    },

    logout: () => async (dispatch, getState) => {
        cookie.remove('token');
        dispatch({ type: logoutType });
    },

    requestInitialize: () => async (dispatch, getState) => {

        let isAuthenticated = false;
        const token = cookie.load('token');

        if (token) {
            isAuthenticated = true;
        }
        let result = {
            initialized: true,
            token: token,
            isAuthenticated: isAuthenticated
        };

        dispatch({ type: responseInitializeAppType, ...result });

    },

};

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export const reducer = (state, action) => {
    state = state || initialState;

    switch (action.type) {
        case requestLoginType:
            return {
                ...state,
                isLoading: true,
                error: ''
            };

        case responseLoginType:
            return {
                ...state,
                result: action.result,
                isLoading: false,
                isAuthenticated: action.isAuthenticated,
                error: action.error,
                token: action.token,
            };

        case logoutType:
            return {
                ...state,
                result: null,
                isLoading: false,
                isAuthenticated: false,
                error: null,
                token: null
            };

        case requestInitializeAppType:
            return {
                ...state,
                isLoading: true
            };

        case responseInitializeAppType:
            return {
                ...state,
                error: action.error,
                isLoading: false,
                initialized: action.initialized,
                isAuthenticated: action.isAuthenticated,
                token: action.token,
            };

    }

    return state;
};
