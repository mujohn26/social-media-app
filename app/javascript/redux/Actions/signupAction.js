import axios from 'axios';

export const createUser = (data) => async (dispatch) => {
	dispatch({ type: 'LOADING', payload: true });
	try {
		const response =  await axios.post(`http://localhost:3000/auth/signup`, {
			first_name: data.firstName,
			last_name: data.lastName,
			email: data.email,
			password: data.password
        });
        localStorage.setItem('token', response.data.token);
		dispatch({
			type: 'ACCOUNT_CREATED_SUCCESS',
			payload: 'your account was created successfully'
        });
        dispatch({ type: 'LOADING', payload: false });

    } catch (error) {
        dispatch({
            type: 'ACCOUNT_CREATED_FAILURE',
            payload: error.response.data.error.email[0]
        });
        dispatch({ type: 'LOADING', payload: false });


	}
};

