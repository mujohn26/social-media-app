const loginReducer = (state = {}, action) => {
    switch (action.type) {
        case "USER_LOGIN_SUCCESS":
            return {
                ...state,
                successMessage: action.payload,
            };
        case "USER_LOGIN_FAILURE":
            return {
                ...state,
                errorMessage: action.payload,
            };
        case "LOADING":
            return {
                ...state,
                isLoading: action.payload,
            };
        default:
            return state;
    }
};
export default loginReducer;