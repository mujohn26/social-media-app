import { act } from "react-dom/test-utils";

const postsReducer = (state = {}, action) => {
    switch (action.type) {
        case "GET_POST_SUCCESSFULLY":
            return {
                ...state,
                data: action.payload.data,
                loggedIn: action.payload.loggedIn,
                token:action.payload.token
            };
        case "GET_POSTS_FAILURE":
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

        default:
            return state;
    }
};
export default postsReducer;