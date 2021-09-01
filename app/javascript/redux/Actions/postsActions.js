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

export const createPostAction = (description, data) => async (dispatch) => {
  	dispatch({ type: 'LOADING', payload: true });
	try {
        const response = await axios.post('/api/posts',{
			description: description,
        });
		dispatch({
			type: 'CREATE_POST_SUCCESSFULLY',
            payload: response.data,
            data: data.concat(response.data.new_post).sort( (a, b) => new Date(b.created_at) - new Date(a.created_at))
        });
    } catch (error) {
        dispatch({
            type: 'CREATE_POSTS_FAILURE',
            payload: error.response.data
        });
	}finally{
        dispatch({ type: 'LOADING', payload: false });
	}
};


