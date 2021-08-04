const signupReducer = (state = {}, action) => {
    switch (action.type) {
        case "ACCOUNT_CREATED_SUCCESS":
            return {
                ...state,
                successMessage: action.payload,
            };
        case "ACCOUNT_CREATED_FAILURE":
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
export default signupReducer;