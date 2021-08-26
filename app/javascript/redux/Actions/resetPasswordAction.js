import axios from 'axios';

export const ResetPasswordAction = ({password, resetToken}) => async (dispatch) => {
	dispatch({ type: 'LOADING', payload: true });
    try {
		const headers = {
			'Content-Type': 'application/json',
			token: `${resetToken}`
		};
        const response = await axios.patch(`/api/auth/reset`, {password:password}, { headers });
		dispatch({
			type: 'RESET_PASSWORD_SUCCESS',
			payload: response.data.message
		});
	} catch (error) {
		dispatch({
			type: 'RESET_PASSWORD_FAILURE',
			payload: error.response.data.error
		});
	} finally {
		dispatch({ type: 'LOADING', payload: false });
	}
};
