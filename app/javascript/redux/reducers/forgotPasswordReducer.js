const forgotPasswordReducer = (state = {}, action) => {
    switch (action.type) {
        case "LINK_SENT_SUCCESS":
            return {
                ...state,
                successMessage: action.payload,
            };
        case "LINK_SENT_FAILURE":
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
export default forgotPasswordReducer;