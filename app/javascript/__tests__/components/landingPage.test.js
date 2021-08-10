import React from 'react';
import { shallow } from 'enzyme';
import LandingPage from '../../views/LandingPage';

describe('Render landing page component', () => {
	it('should render landing page component successfully', () => {
		const wrapper = shallow(<LandingPage />);
		expect(wrapper.find('div').length).toBe(18);
	});
});