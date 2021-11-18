import React, { useEffect, useState } from 'react';
import { Form } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { LoginUser } from '../../redux/Actions/loginAction';
import { isValidInputs } from '../../helpers/validation';
import '../../assets/styles/signup.scss';
import { createBrowserHistory } from 'history';
export const history = createBrowserHistory({
	forceRefresh: true
});

const styleSuccessMessage = {
	color: '#36a91d',
	marginTop: '5%'
};

const forgotPasswordStye = {
	marginTop: '10px',
	cursor: 'pointer',
	color: '#36a91d'

}

const LoginPage = (props) => {
	const [ inputs, setInputs ] = useState({  email: props.email, password: '' });
	const [ showEmptyFieldErrors, setShowEmptyFieldErrors ] = useState(false);

	const dispatch = useDispatch();
	const reducer = useSelector((state) => state.loginReducer);
	const handleChange = (field) => (event) => {
		setInputs({
			...inputs,
			[field]: event.target.value
		});
	};

	function redirect() {
		history.push('/signup');
		location.reload();
	}

	function forgotPassword(params) {
		history.push('/forgot');
		location.reload();
	}
	const handleSubmit = async () => {
		setShowEmptyFieldErrors(true);
		if (isValidInputs(inputs)) {
			LoginUser(inputs)(dispatch);
		}
	};
	useEffect(
		() => {
			if (reducer.successMessage !== undefined) {
				history.push('/posts'); 
				location.reload();
			}
		},
		[ reducer.successMessage ]
	);

	const fields = [
		{ label: 'Email', id: 'email', dataId: 'email-field', type: 'text' },
		{ label: 'password', id: 'password', dataId: 'password-field', type: 'password' }
	];
	return (
		<div className="login-page-container">
			<Form onSubmit={handleSubmit}>
				{fields.map((field, index) => {
					return (
						<Form.Input
							error={
								showEmptyFieldErrors == true && inputs[field.id] == '' ? (
									`${field.label} is empty`
								) : null
							}
							className="text-field"
							placeholder={field.label}
							label={field.label}
							value={inputs[field.id]}
							onChange={handleChange(field.id)}
							data-test={field.dataId}
							type={field.type}
							showEmptyFieldErrors={showEmptyFieldErrors}
							key={index}
						/>
					);
				})}

				<div style={forgotPasswordStye} onClick={forgotPassword}>
					Forgot password
				</div>

				<div className="button-container">
					{reducer.isLoading == true ? (
						<div style={{ textAlign: 'center' }}>Loading...</div>
					) : (
						<Button id="submit-btn" style={{ backgroundColor: '#36a91d', color: 'white', width: '340px' }}>
							Login
						</Button>
					)}
				</div>

					<div style={{marginTop:'15px'}}>
					Not a member ?{' '}
					<a onClick={redirect} style={{ color: '#36a91d', marginLeft: '10px' }}>
						Signup now
					</a>
				</div>
				<div style={{color:'red', marginTop:'4%'}}>
					{reducer.errorMessage !== undefined ? (<>{reducer.errorMessage} please try again !</>):''} 
                </div> 
                
				<div style={styleSuccessMessage}>
					{reducer.successMessage !== undefined ? inputs.lastName : ''} {reducer.successMessage}
				</div>
			</Form>
		</div>
	);
};

export default LoginPage;
