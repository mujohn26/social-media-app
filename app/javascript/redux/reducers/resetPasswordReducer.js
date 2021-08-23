const resetPasswordReducer = (state = {}, action) => {
    switch (action.type) {
        case "RESET_PASSWORD_SUCCESS":
            return {
                ...state,
                successMessage: action.payload,
            };
        case "RESET_PASSWORD_FAILURE":
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
export default resetPasswordReducer;