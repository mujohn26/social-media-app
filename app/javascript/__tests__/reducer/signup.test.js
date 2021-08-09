import signupReducer from '../../redux/reducers/signupReducer';
import {
	createUserSuccess,
	createUserFailure,
	isLoadingAction,

} from '../../__mocks__/signup.mock';

describe('Signup Reducer', () => {
	it('create user success', () => {
        const getState = signupReducer({}, createUserSuccess);
		expect(getState).toEqual({ 
			successMessage: createUserSuccess.payload,
		});
	});
    it('throw error when user is not created', () => {
        const getState = signupReducer({}, createUserFailure);
        expect(getState).toEqual({
            errorMessage: createUserFailure.payload,
        });
    })
	it('Should  LOADING', () => {
		const getState = signupReducer({}, isLoadingAction);
		expect(getState).toEqual({
			isLoading: isLoadingAction.payload,
		});
	});


});