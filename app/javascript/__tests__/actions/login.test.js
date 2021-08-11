import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { LoginUser } from '../../redux/Actions/loginAction';
import moxios from 'moxios';
import axios from 'axios';
import expect from 'expect';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);
describe('Login actions', () => {
	beforeEach(() => {
		moxios.install(axios);
	});
	afterEach(() => {
		moxios.uninstall(axios);
	});

	it('login a user ', async () => {
		moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request.respondWith({
				status: 200,
				response: {
						message: 'User logged in successfully',
						token:
                            'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyNywiZW1haWwiOiJtdWpvaG4zMkBnbWFpbC5jb20iLCJpc19hZG1pbiI6ZmFsc2V9.5rEXv48ejjDUOJjKDij3YYkeJod05d7XyIof2kWgFsM',
                        data: { id: '1', email: 'test@gmail.com', lastName: 'john' }
				}
			});
		});

		const expectedActions = [
			{
				type: 'LOADING',
				payload: true 
			},
			{
				type: 'USER_LOGIN_SUCCESS',
				payload: 'User logged in successfully'
			},
			{
				type: 'LOADING',
				payload: false
			}
		];

		const store = mockStore({});
		await store
			.dispatch(
				LoginUser({ email: 'test@gmail.com', password: 'test@123' })
			)
			.then(async () => {
				expect(store.getActions()).toEqual(expectedActions);
			});
	});
	it('throw error if user is not logged in', async () => {
		moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request.reject({
				status: 401,
				response: {
					data: {
						error:  'Invalid email/password'  
					}
				}
			});
		});
		const expectedActions = [
			{
				payload: true,
				type: 'LOADING'
			},
			{
				type: 'USER_LOGIN_FAILURE',
				payload: 'Invalid email/password'
			},
			{
				payload: false,
				type: 'LOADING'
			}
		];

		const store = mockStore({});
		await store
			.dispatch(
				LoginUser({ email: 'test@gmail.com', password: 'test@123' })
			)
			.then(async () => {
				expect(store.getActions()).toEqual(expectedActions);
			});
	});
});
