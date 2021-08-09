import React from 'react';
import { shallow } from 'enzyme';
import App from '../components/App';

describe('Render root app component', () => {
	it('should render the root app component successfully', () => {
		const wrapper = shallow(<App />);
		expect(wrapper.find('Router').length).toBe(0);
		expect(wrapper.find('Switch').length).toBe(1);
	});
});