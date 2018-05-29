import Axios from 'axios';
import qs from 'qs';
import { reset } from 'redux-form';
import moment from 'jalali-moment';

const requestHomeInitializeType = 'REQUEST_HOME_INITIALIZE';
const responseHomeInitializeType = 'RESPONSE_HOME_INITIALIZE';

const testMode = true;

const initialState = {
    error: [],
    messageType: "",
    isLoading: true,
    messages: [],
    user: null,
};

export const actionCreators = {
    homeInitialize: () => async (dispatch, getState) => {

        let response = [];
        let errors = [];

        const dataRequest = {
            error: [],
            messageType: "",
            isLoading: false,
            messages: [],
            user: null,

        };

        dispatch({ type: requestHomeInitializeType, result: dataRequest });

        const login = getState().login;

        try {
            let result = {
                error: [],
                messageType: "",
                isLoading: false

            };
            let data = {
                token: login.token,
            }
            if (testMode) {

                var config = {
                    withCredentials: true,
                    headers: {
                        'Authorization': 'Basic d2ViX2FwcDo='
                    },
                };

                debugger;
                // response = json;
                const url = `https://gateway.tameemco.ir/uaa/oauth/check_token`;
                response = await Axios.post(url,qs.stringify(data), config).catch(e => e.response);
            } else {
                const url = `oauth/check_token`;
                response = await Axios.post(url).catch(e => e.response);
            }

            if (response.status == 200) {

                //#region RESULT SET VALUES
                result.error = [];
                result.messageType = "";
                result.isLoading = false;
                result.user = response.data;
                //endregion

            } else {
                errors = response.data.messages.map(message => message.message);
                result = {
                    isLoading: false,
                    data: null,
                    error: errors,
                    messageType: "error",
                };
            }

            if (response.status != 200) {
                errors = response.data.messages.map(message => message.message);
                result.error = errors;
                result.messageType = "error"
            }

            dispatch({ type: responseHomeInitializeType, result });

        }
        catch (error) {

            errors.push("متاسفانه خطایی پیش بینی نشده ای رخ داده است لطفا با واحد پشتیبانی تماس بگیرید");

            const result = {
                isLoading: false,
                data: null,
                error: errors,
                messageType: "error",
            };
            dispatch({ type: responseHomeInitializeType, result });
        }
    },
}

export const reducer = (state, action) => {
    state = state || initialState;

    switch (action.type) {
        case requestHomeInitializeType:
            return {
                ...state,
                ...action.result,
            };
        case responseHomeInitializeType:
            return {
                ...state,
                ...action.result,
            };

    }
    return state;
};
