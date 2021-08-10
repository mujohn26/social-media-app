import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { createUser } from '../../redux/Actions/signupAction';
import moxios from 'moxios';
import axios from 'axios';
import expect from 'expect';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);
describe('Signup actions', () => {
	beforeEach(() => {
		moxios.install(axios);
	});
	afterEach(() => {
		moxios.uninstall(axios);
	});

	it('creates a user ', async () => {
		moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request.respondWith({
				status: 201,
				response: {
					data: {
						message: 'Account was created successfully',
						token:
							'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyNywiZW1haWwiOiJtdWpvaG4zMkBnbWFpbC5jb20iLCJpc19hZG1pbiI6ZmFsc2V9.5rEXv48ejjDUOJjKDij3YYkeJod05d7XyIof2kWgFsM'
					}
				}
			});
		});

		const expectedActions = [
			{
				type: 'LOADING',
				payload: true
			},
			{
				type: 'ACCOUNT_CREATED_SUCCESS',
				payload: 'your account was created successfully'
			},
			{
				type: 'LOADING',
				payload: false
			}
		];

		const store = mockStore({});
		await store
			.dispatch(
				createUser({ email: 'test@gmail.com', first_name: 'test', last_name: 'app', password: 'test@123' })
			)
			.then(async () => {
				expect(store.getActions()).toEqual(expectedActions);
			});
	});
	it('throw error if user is not created', async () => {
		moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request.reject({
				status: 401,
				response: {
					data: {
						error: {
							email: [ 'Email is already taken' ]
						}
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
				type: 'ACCOUNT_CREATED_FAILURE',
				payload: 'Email is already taken'
			},
			{
				payload: false,
				type: 'LOADING'
			}
		];

		const store = mockStore({});
		await store
			.dispatch(
				createUser({ email: 'test@gmail.com', first_name: 'test', last_name: 'app', password: 'test@123' })
			)
			.then(async () => {
				expect(store.getActions()).toEqual(expectedActions);
			});
	});
});
