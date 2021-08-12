import React from 'react';
import UseAuthModal from '../../components/UseAuthModal';
import { render } from "@testing-library/react";

function setup(...args) {
	const returnVal = {}
	function LandingPage() {
		Object.assign(returnVal, UseAuthModal(...args))
		return null
	}
	render(<LandingPage />)
	return returnVal
}


describe('Render useAuthModal  components', () => {
	it('Simulate open Login', () => {
		const useAuthModal = setup('login')
		expect(useAuthModal.openLogin).toEqual()
	});
	it('Simulate open Signup', () => {
		const useAuthModal = setup('signup')
		expect(useAuthModal.openSignup).toEqual()
	});
	it('Simulate close modal', () => {
		const useAuthModal = setup('')
		expect(useAuthModal.openSignup).toEqual()
	});

});
