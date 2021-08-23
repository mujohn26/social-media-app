import loginReducer from '../../redux/reducers/loginReducer';
import {
	loginUserSuccess,
	loginUserFailure,
	isLoadingAction,
} from '../../__mocks__/login.mock'

describe('Login Reducer', () => {
	it('login user success', () => {
        const getState = loginReducer({}, loginUserSuccess);
		expect(getState).toEqual({ 
			successMessage: loginUserSuccess.payload,
		});
	});
    it('throw error when loggin fails', () => {
        const getState = loginReducer({}, loginUserFailure);
        expect(getState).toEqual({
            errorMessage: loginUserFailure.payload,
        });
    })
	it('Should  LOADING', () => {
		const getState = loginReducer({}, isLoadingAction); 
		expect(getState).toEqual({
			isLoading: isLoadingAction.payload,
		});
	});


});