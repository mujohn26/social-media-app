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
  end
end
