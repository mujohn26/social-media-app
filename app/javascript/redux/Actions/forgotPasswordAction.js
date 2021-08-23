import axios from 'axios';

export const ForgotPasswordAction = (data) => async (dispatch) => {
	dispatch({ type: 'LOADING', payload: true });
	try {
		const response =  await axios.post(`/auth/forgot`, {
			email: data.email,
        });
		dispatch({
			type: 'LINK_SENT_SUCCESS',
			payload: response.data.message
        });
    } catch (error) {
        dispatch({
            type: 'LINK_SENT_FAILURE',
            payload: error.response.data.error
        });
	} finally{
        dispatch({ type: 'LOADING', payload: false });
	}
};

