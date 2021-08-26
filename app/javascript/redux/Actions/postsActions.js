import axios from 'axios';

export const getAllPostsAction = () => async (dispatch) => {
  	dispatch({ type: 'LOADING', payload: true });
	try {
        const response = await axios.get('/api/posts');
		dispatch({
			type: 'GET_POST_SUCCESSFULLY',
			payload: response.data
        });
    } catch (error) {
        dispatch({
            type: 'GET_POSTS_FAILURE',
            payload: error.response.data
        });
	}finally{
        dispatch({ type: 'LOADING', payload: false });
	}
};

