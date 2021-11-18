class AuthenticationController < ApplicationController
  skip_before_action :verify_authenticity_token
  def authenticate_user
    user = User.find_by(email: params[:email])
    if user && user.authenticate(params[:password])
      cookies.signed[:token] = { value: generate_token(user), httponly: true, expires: 1.hour.from_now }
      render json: payload(user), status: 200
    else
      render json: { error: 'Invalid email/password' }, status: :unauthorized
    end
  end

  def payload(user)
    {
      message: 'User logged in successfully',
      data: { id: user.id, email: user.email, lastName: user.last_name }
    }
  end
  
  private
  def generate_token(user)
    JsonWebToken.encode({ user_id: user.id, email: user.email, is_admin: user.is_admin, fistName:user.first_name, lastName: user.last_name})
  end
end
