
const postsReducer = (state = {}, action) => {
    switch (action.type) {
        case "GET_POST_SUCCESSFULLY":
            return {
                ...state,
                postsData: action.payload.data,
                postDataArr:action.payload.data,
                loggedIn: action.payload.loggedIn,
            };
        case "GET_POSTS_FAILURE":
            return {
                ...state,
                errorMessage: action.payload.errors,
                loggedIn:action.payload.loggedIn
            };
        case "CREATE_POST_SUCCESSFULLY":
            console.log('==-===-=-=-=-',action.payload.message)
            return {
                ...state,
                successMessage: action.payload.message,
                loggedIn: action.payload.loggedIn,
                postsData: action.data,
                postDataArr: action.data
            };
        case "CREATE_POSTS_FAILURE":
            return {
                ...state,
                errorMessage: action.payload.errors,
                loggedIn:action.payload.loggedIn
            };
        case "LOADING":
            return {
                ...state,
                isLoading: action.payload,
            };
        case "LOADING_CREATE":
            return {
                ...state,
                isLoadingCreate: action.payload,
            };
        

        default:
            return state;
    }
};
export default postsReducer;