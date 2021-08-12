import React from 'react';
import { shallow, mount } from 'enzyme';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import LoginPage from '../../views/auth/Login';
import { props } from '../../__mocks__/signup.mock';
import reducer from '../../redux/reducers/index';

const middlewares = [ thunk ];
const testStore = (state) => {
	const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
	return createStoreWithMiddleware(reducer, state);
};
const setUpComponent = () => {
	const store = testStore({});
	const wrapper = mount(
		<Provider store={store}>
			<LoginPage {...props} />
		</Provider>
	);
	return wrapper;
};

describe('Render login  components', () => {
	it('Simulate submit', () => {
		const component = setUpComponent();
		const handleSubmitSpy = component.find('#submit-btn').at(1).simulate('click');
		expect(handleSubmitSpy).toBeDefined();
	});
	it('should handle change successfully', () => {
		const component = setUpComponent();
		const handleChangeSpy = component
			.find('[data-test="email-field"]')
			.at(1)
			.simulate('change', { event: { target: { value: 'test@app.com' } } });

		expect(handleChangeSpy).toBeDefined();
    });

});
