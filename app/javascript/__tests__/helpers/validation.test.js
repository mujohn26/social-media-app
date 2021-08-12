import React from 'react';
import { checkInputValidation, isValidInputs } from '../../helpers/validation';

describe('#Validations', () => {
	it('returns boolean when email is provided', () => {
		expect(checkInputValidation('test@app.com')).toEqual(false)
	});
	it('Returns bollean when all data are provided', () => {
		const data={email:'test@pp.com', password:'test@app'}
		expect(isValidInputs(data)).toEqual(true)
	});

});
