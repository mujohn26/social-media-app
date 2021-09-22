require 'rails_helper'

RSpec.describe AuthenticationController, type: :controller do
  before do
    User.destroy_all
  end

  describe 'Authentication test' do
    it 'login user successfully' do
      user = User.create({ email: 'test@gmail.com', first_name: 'test', last_name: 'app', password: 'test@123' })
      user.save!
      expect(user.email).to eq('test@gmail.com')
      user = post(:authenticate_user, params: { email: 'test@gmail.com', password: 'test@123' })
      expect(JSON.parse(user.body)['message']).to eq('User logged in successfully')
      expect(user.status).to eq(200)
    end
    it 'Throws error when invalid credentails' do
      user = post(:authenticate_user, params: { email: 'test@gmail.com', password: 'test123' })
      expect(JSON.parse(user.body)['error']).to eq('Invalid email/password')
      expect(user.status).to eq(401)
    end
  end
end
