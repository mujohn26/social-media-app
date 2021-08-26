import React, { useEffect} from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import {getTokenAction} from '../../redux/Actions/postsActions'
import { useHistory } from "react-router-dom";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const history = useHistory()
  const dispatch = useDispatch();
  const reducer = useSelector((state) => state.getTokenReducer);

  const getToken = async () => {
    getTokenAction()(dispatch);

  }

  useEffect(() => {
    console.log('=-==-=-=--==-=',)
  })

	return (
		<BrowserRouter>
			<Route
				{...rest}
				render={ props => {
          return reducer.token !== undefined ? (
            <Component {...props} />
            ) : (
              history.push('/login')
					);
				}}
			/>
		</BrowserRouter>
	);
};

export default PrivateRoute;