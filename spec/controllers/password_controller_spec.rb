require 'rails_helper'

RSpec.describe PasswordsController, type: :controller do
  describe '#forgot password' do
    it 'Throws error when email is not provided' do
      user = post(:forgot)
      expect(JSON.parse(user.body)['error']).to eq('Email was not provided')
      expect(user.status).to eq(400)
    end

    it 'Send reset link successfully' do
      User.create({ email: 'test@gmail.com', first_name: 'test', last_name: 'app', password: 'test@123' })
      user = post(:forgot, params: { email: 'test@gmail.com' })
      expect(JSON.parse(user.body)['message']).to eq('Reset link was sent to your email address, if you dont receive it, please try again')
      expect(user.status).to eq(200)
    end
  end

  describe '#reset password' do
    it 'Throws error when token is not provided' do
      request.headers['token'] = ''
      user = post(:reset)
      expect(JSON.parse(user.body)['error']).to eq('Token not found')
      expect(user.status).to eq(400)
    end
    it 'Throws error when token is invalid' do
      request.headers['token'] = 'does-not-exist'
      user = post(:reset)
      expect(JSON.parse(user.body)['error']).to eq('Invalid token, please try again')
      expect(user.status).to eq(404)
    end

    it 'Throws error when password is not provided' do
      User.create({ email: 'test@gmail.com', first_name: 'test', last_name: 'app', password: 'test@123',
                    reset_password_token: 'valid-token', reset_password_sent_at: Time.now.utc })
      request.headers['token'] = 'valid-token'
      user = post(:reset)
      expect(JSON.parse(user.body)['error']).to eq('Please enter a valid password')
      expect(user.status).to eq(400)
    end

    it 'Updates user password successfully' do
      User.create({ email: 'test@gmail.com', first_name: 'test', last_name: 'app', password: 'test@123',
                    reset_password_token: 'valid-token', reset_password_sent_at: Time.now.utc })
      request.headers['token'] = 'valid-token'
      user = post(:reset, params: { password: 'test@123' })
      expect(JSON.parse(user.body)['message']).to eq('Password was updated successfully')
      expect(user.status).to eq(200)
    end
  end
end
