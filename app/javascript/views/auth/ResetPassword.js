import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import { Form } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { ResetPasswordAction } from '../../redux/Actions/resetPasswordAction';
import { isValidInputs } from '../../helpers/validation';
import '../../assets/styles/password.scss';

const styleSuccessMessage = {
	color: '#36a91d',
	marginTop: '5%'
};

const ResetPassword = (props) => {
    const history = useHistory();
	const [ inputs, setInputs ] = useState({  password: '', confirmPassword:''});
    const [showEmptyFieldErrors, setShowEmptyFieldErrors] = useState(false);
    const [isPasswordMatch, setIsPasswordMatch] = useState(true)

	const dispatch = useDispatch();
	const reducer = useSelector((state) => state.resetPasswordReducer);
	const handleChange = (field) => (event) => {
		setInputs({
			...inputs,
			[field]: event.target.value
		});
	};
	const handleSubmit = async () => {
        setShowEmptyFieldErrors(true);
        setIsPasswordMatch(inputs.password == inputs.confirmPassword)
        if (isValidInputs(inputs) || isPasswordMatch) {
          const params = queryString.parse(location.search);
            const resetToken = params.token;
		  ResetPasswordAction({password:inputs.password,resetToken})(dispatch);
		}
	};
	useEffect(
		() => {
            if (reducer.successMessage !== undefined) { 
				history.push('/login')
			}
		},
		[ reducer.successMessage ]
	);

	const fields = [
        { label: 'Password', id: 'password', dataId: 'password-field', type: 'password' },
        { label: 'Confirm Password', id: 'confirmPassword', dataId: 'confirmPassword-field', type: 'password' }

	];
	return (
        <div className="forgot-page-container">
            <div className='page-title'>
                Reset Password
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
                <div style={{color:'red', marginTop:'4%'}}>{isPasswordMatch?'':'Password does not match'}</div>
				<div className="button-container">
					{reducer.isLoading == true ? (
						<div style={{ textAlign: 'center' }}>Loading...</div>
					) : (
						<Button id="submit-btn" style={{ backgroundColor: '#36a91d', color: 'white', width: '340px' }}>
							Reset password
						</Button>
					)}
				</div>
                  
				<div style={{color:'red', marginTop:'4%'}}>
					{reducer.errorMessage !== undefined ? (<>{reducer.errorMessage}</>):''} 
                </div> 
                
				<div style={styleSuccessMessage}>
					{reducer.successMessage !== undefined ? inputs.lastName : ''} {reducer.successMessage}
				</div>
                </Form>
                            </div>

		</div>
	);
};

export default ResetPassword;
