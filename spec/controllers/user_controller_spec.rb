require 'rails_helper'
      
RSpec.describe UsersController, type: :controller do
  describe 'controllers test' do
    it 'creates a user' do
      expect do
        post :create,
             params: { email: 'test@gmail.com', first_name: 'test', last_name: 'app', password: 'test@123' }
      end.to change(User, :count).by(1)
      user = User.last
      expect(user.email).to eq('test@gmail.com')
    end
    it 'validates password' do
      user = post(:create, params: { email: 'test@gmail.com', last_name: 'app', password: 'password' })
      expect(JSON.parse(user.body)['error']).to eq('You can not have password text as your password.')
      expect(user.status).to eq(400)
    end
  end
end
