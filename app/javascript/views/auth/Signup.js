import React, { useEffect, useState } from 'react';
import { Form } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { createUser } from '../../redux/Actions/signupAction';
import { checkInputValidation, getInputValidations } from '../../helpers/validation';
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
	const [ inputs, setInputs ] = useState({ firstName: "", lastName: "", email: "", password: "" });
	const [ isValid, setIsValid ] = useState({ firstName: true, lastName: true, email: true, password: true });

	const dispatch = useDispatch();
	const reducer = useSelector((state) => state.signupReducer);
	const handleChange = (field) => (event) => {
		setInputs({
			...inputs,
			[field]: event.target.value
		});
	};

	const handleSubmit = async () => {
		const inputsArr = getInputValidations(inputs);
		if (!inputsArr.includes(false)) {
			createUser(inputs)(dispatch);
		} else {
			await checkValid();
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

	const checkValid = async () => {
		for (let value in inputs) {
			setIsValid({ ...isValid, [value]: checkInputValidation(inputs[value]) });
		}
	};
	return (
		<div className="signup-page-container">
			<Form>
				<Form.Input
					label="First name"
					placeholder="First name"
					className='text-field'
					value={inputs.firstName}
					onChange={handleChange('firstName')}
				/>
				<Form.Input
					label="Last name"
					placeholder="Last name"
					className='text-field'
					value={inputs.lastName}
					onChange={handleChange('lastName')}
				/>

				<Form.Input
					label="Email"
					placeholder="Email"
					className='text-field'
					value={inputs.email}
					onChange={handleChange('email')}
				/>
				<Form.Input
					label="Password"
					placeholder="Password"
					type="password"
					className='text-field'
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
