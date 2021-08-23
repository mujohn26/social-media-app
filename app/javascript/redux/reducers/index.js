import { combineReducers } from "redux";
import signupReducer from './signupReducer'
import loginReducer from './loginReducer'
import forgotPasswordReducer from './forgotPasswordReducer'
import resetPasswordReducer from './resetPasswordReducer'


export default combineReducers({
    signupReducer,
    loginReducer,
    forgotPasswordReducer,
    resetPasswordReducer
});