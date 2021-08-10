export const props = {
	stateObject: {
		reducer: {
			successMessage: 'Account created successfully',
		},
	},

	state: {
		firstName: 'test',
		lastName:'account',
		email: 'testacc@gmail.com',
		password: 'test123@'
	},
	
	handleSubmit:jest.fn(),
	handleChange:jest.fn(),
	
};

export const createUserSuccess = {
	type: 'ACCOUNT_CREATED_SUCCESS',
	payload: 'your account was created successfully'
};

export const createUserFailure = {
	type: 'ACCOUNT_CREATED_FAILURE',
	payload: 'Email already taken'
};
export const isLoadingAction = {
	type: 'LOADING',
	payload: true
};
