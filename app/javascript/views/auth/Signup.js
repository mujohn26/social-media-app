import React, { useEffect, useState } from 'react';
import { Form } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { createUser } from '../../redux/Actions/signupAction';
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
	const [ firstName, setFirstName ] = useState('');
	const [ lastName, setLastName ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ validateFirstName, setValidateFirstName ] = useState(true);
	const [ validateLastName, setValidateLastName ] = useState(true);
	const [ validateEmail, setValidateEmail ] = useState(true);
	const [ validatePassword, setValidatePassword ] = useState(true);
	const [ inputsValidates, setInputsValidates ] = useState([]);

	const dispatch = useDispatch();
	const reducer = useSelector((state) => state.signupReducer);
	function validateInput(input, text, stateHandle) {
		if (input == '') {
			inputsValidates.push(false);
			stateHandle(false);
		} else {
			inputsValidates.push(true);
			stateHandle(true);
		}
	}

	const handleSubmit = () => {
		setInputsValidates([]);
		validateInput(firstName, 'firstName', setValidateFirstName);
		validateInput(lastName, 'lastName', setValidateLastName),
		validateInput(email, 'email', setValidateEmail),
		validateInput(password, 'password', setValidatePassword);
		if (!inputsValidates.includes(false)) {
			const userData = {
				firstName,
				lastName,
				email,
				password
			};
			createUser(userData)(dispatch);
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
	return (
		<div className="signup-page-container">
			<Form>
				<Form.Input
					error={validateFirstName == false ? 'Please enter your first name' : null}
					fluid
					label="First name"
					placeholder="First name"
					id="form-input-first-name"
					style={{ width: '340px' }}
					onChange={(e) => {
						setFirstName(e.target.value);
					}}
				/>
				<Form.Input
					error={validateLastName == false ? 'Please enter your last name' : null}
					fluid
					label="Last name"
					placeholder="Last name"
					style={{ width: '340px' }}
					onChange={(e) => {
						setLastName(e.target.value);
					}}
				/>

				<Form.Input
					error={validateEmail == false ? 'Please enter your email' : reducer.errorMessage}
					fluid
					label="Email"
					placeholder="Email"
					style={{ width: '340px' }}
					onChange={(e) => {
						setEmail(e.target.value);
					}}
				/>
				<Form.Input
					error={validatePassword == false ? 'Please enter password' : null}
					fluid
					label="Password"
					placeholder="Password"
					type="password"
					style={{ width: '340px' }}
					onChange={(e) => {
						setPassword(e.target.value);
					}}
				/>
				<div>
					Already have a account ?{' '}
					<a href="/login" style={{ color: '#36a91d', marginLeft: '10px' }}>
						Login here
					</a>
				</div>

				<div className="button-container">
					{reducer.isLoading == true ? (
						<div style={{ textAlign: 'center' }}>Loading...</div>
					) : (
						<Button
							style={{ backgroundColor: '#36a91d', color: 'white', width: '340px' }}
							onClick={handleSubmit}
						>
							Create account
						</Button>
					)}
				</div>
				<div />

				<div style={styleSuccessMessage}>
					{reducer.successMessage !== undefined ? lastName : ''} {reducer.successMessage}
				</div>
			</Form>
		</div>
	);
};

export default SignupPage;
