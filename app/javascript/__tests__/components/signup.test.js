import React from 'react';
import { shallow, mount } from 'enzyme';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import SignupPage from '../../views/auth/Signup';
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
			<SignupPage {...props} />
		</Provider>
	);
	return wrapper;
};

describe('Render Signup  components', () => {
	it('Simulate submit', () => {
        const component = setUpComponent();
		const handleSubmitSpy = component.find('#submit-btn').at(1).simulate('click');
		expect(handleSubmitSpy).toBeDefined(); 
	});
	it('should handle change successfully', () => {
		const component = setUpComponent();
		const handleChangeSpy = component.find('[data-test="first-name-field"]').at(1).simulate('change', {event:{ target: { value: 'john' } }});
	
		expect(handleChangeSpy).toBeDefined();  
	});
});
