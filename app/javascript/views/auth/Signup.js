import React, { useEffect, useState } from 'react';
import { Form } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { createUser } from '../../redux/Actions/signupAction';
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

const SignupPage = () => {
	const [ inputs, setInputs ] = useState({ firstName: '', lastName: '', email: '', password: '' });
	const [ showEmptyFieldErrors, setShowEmptyFieldErrors ] = useState(false);

	const dispatch = useDispatch();
	const reducer = useSelector((state) => state.signupReducer);
	function redirect() {
		history.push('/login');
		location.reload();
	}
	const handleChange = (field) => (event) => {
		setInputs({
			...inputs,
			[field]: event.target.value
		});
	};

	const handleSubmit = async () => {
		setShowEmptyFieldErrors(true);
		if (isValidInputs(inputs)) {
			createUser(inputs)(dispatch);
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
		{ label: 'First name', id: 'firstName', dataId: 'first-name-field', type: 'text' },
		{ label: 'Last name', id: 'lastName', dataId: 'last-name', type: 'text' },
		{ label: 'Email', id: 'email', dataId: 'email-field', type: 'text' },
		{ label: 'password', id: 'password', dataId: 'password-field', type: 'password' }
	];
	return (
		<div className="signup-page-container">
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
				<div>
					Already have a account ?{' '}
					<a onClick={ redirect } style={{ color: '#36a91d', marginLeft: '10px' }}>
						Login here
					</a>
				</div>

				<div className="button-container">
					{reducer.isLoading == true ? (
						<div style={{ textAlign: 'center' }}>Loading...</div>
					) : (
						<Button id="submit-btn" style={{ backgroundColor: '#36a91d', color: 'white', width: '340px' }}>
							Create account
						</Button>
					)}
				</div>
				<div />

				<div style={styleSuccessMessage}>
					{reducer.successMessage !== undefined ? inputs.lastName : ''} {reducer.successMessage}
				</div>
				<div style={{ color: 'red' }}>
					{reducer.errorMessage !== undefined ?<div> Email {reducer.errorMessage} </div>: ''}
				</div>
			</Form>
		</div>
	);
};

export default SignupPage;
