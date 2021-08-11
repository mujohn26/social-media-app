import axios from 'axios';

export const LoginUser = (data) => async (dispatch) => {
	dispatch({ type: 'LOADING', payload: true });
	try {
		const response =  await axios.post(`/auth/login`, {
			email: data.email,
			password: data.password
        });
		localStorage.setItem('token', response.data.token);
		dispatch({
			type: 'USER_LOGIN_SUCCESS',
			payload: response.data.message
        });
    } catch (error) {
        dispatch({
            type: 'USER_LOGIN_FAILURE',
            payload: error.response.data.error
        });
	} finally{
        dispatch({ type: 'LOADING', payload: false });
	}
};

