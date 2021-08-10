import React, { useEffect, useState } from 'react';
import { Form } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { createUser } from '../../redux/Actions/signupAction';
import { getInputValidations } from '../../helpers/validation';
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
	const [ buttonClicked, setButtonClicked ] = useState(false);

	const dispatch = useDispatch();
	const reducer = useSelector((state) => state.signupReducer);
	const handleChange = (field) => (event) => {
		setInputs({
			...inputs,
			[field]: event.target.value
		});
	};

	const handleSubmit = async () => {
		setButtonClicked(true);
		const inputsArr = getInputValidations(inputs);
		if (!inputsArr.includes(true)) {
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
	return (
		<div className="signup-page-container">
			<Form>
				<Form.Input
					error={buttonClicked == true && inputs.firstName == '' ? 'Please enter first name' : null}
					label="First name"
					placeholder="First name"
					className="text-field"
					data-test="first-name-field"
					value={inputs.firstName}
					onChange={handleChange('firstName')}
				/>
				<Form.Input
					error={buttonClicked == true && inputs.lastName == '' ? 'Please enter last name' : null}
					label="Last name"
					placeholder="Last name"
					className="text-field"
					data-test="last-name-field"
					value={inputs.lastName}
					onChange={handleChange('lastName')}
				/>

				<Form.Input
					error={
						buttonClicked == true && inputs.email == '' ? 'Please enter your email' : reducer.errorMessage
					}
					label="Email"
					placeholder="Email"
					className="text-field"
					id="email-field"
					value={inputs.email}
					onChange={handleChange('email')}
				/>
				<Form.Input
					error={buttonClicked == true && inputs.password == '' ? 'Please enter password' : null}
					label="Password"
					placeholder="Password"
					type="password"
					className="text-field"
					data-test="password-field"
					value={inputs.password}
					onChange={handleChange('password')}
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
							id="submit-btn"
							style={{ backgroundColor: '#36a91d', color: 'white', width: '340px' }}
							onClick={handleSubmit}
						>
							Create account
						</Button>
					)}
				</div>
				<div />

				<div style={styleSuccessMessage}>
					{reducer.successMessage !== undefined ? inputs.lastName : ''} {reducer.successMessage}
				</div>
			</Form>
		</div>
	);
};

export default SignupPage;
