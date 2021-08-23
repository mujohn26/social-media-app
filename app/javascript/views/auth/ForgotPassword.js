import React, { useEffect, useState } from 'react';
import { Form } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { ForgotPasswordAction } from '../../redux/Actions/forgotPasswordAction';
import { isValidInputs } from '../../helpers/validation';
import '../../assets/styles/password.scss';
import { createBrowserHistory } from 'history';
export const history = createBrowserHistory({
	forceRefresh: true
});

const styleSuccessMessage = {
	color: '#36a91d',
	marginTop: '5%'
};

const ForgotPassword = (props) => {
	const [ inputs, setInputs ] = useState({  email: ''});
	const [ showEmptyFieldErrors, setShowEmptyFieldErrors ] = useState(false);

	const dispatch = useDispatch();
	const reducer = useSelector((state) => state.forgotPasswordReducer);
	const handleChange = (field) => (event) => {
		setInputs({
			...inputs,
			[field]: event.target.value
		});
	};
	const handleSubmit = async () => {
		setShowEmptyFieldErrors(true);
		if (isValidInputs(inputs)) {
			ForgotPasswordAction(inputs)(dispatch);
		}
	};
	useEffect(
		() => {

		},
		[ reducer.successMessage ]
	);

	const fields = [
		{ label: 'Email', id: 'email', dataId: 'email-field', type: 'text' },
	];
	return (
        <div className="forgot-page-container">
            <div className='page-title'>
                Forgot password
            </div>
            <div className='page-description'>
                When you fill in your registered email address, you will be sent instructions on how to reset your password.
            </div>
            <div className='form-container'>

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
				<div className="button-container">
					{reducer.isLoading == true ? (
						<div style={{ textAlign: 'center' }}>Loading...</div>
					) : (
						<Button id="submit-btn" style={{ backgroundColor: '#36a91d', color: 'white', width: '340px' }}>
							Send link
						</Button>
					)}
				</div>
				<div />
				<div style={{color:'red', marginTop:'4%'}}>
					{reducer.errorMessage !== undefined ? (<>{reducer.errorMessage}</>):''} 
                </div> 
                
				<div style={styleSuccessMessage} className="forgot-success-message">
					{reducer.successMessage !== undefined ? inputs.lastName : ''} {reducer.successMessage}
				</div>
                </Form>
                            </div>

		</div>
	);
};

export default ForgotPassword;
