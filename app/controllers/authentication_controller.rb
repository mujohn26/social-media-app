class AuthenticationController < ApplicationController
  skip_before_action :verify_authenticity_token
  def authenticate_user
    user = User.find_by(email: params[:email])
    if user && user.authenticate(params[:password])
      user.update(token:generate_token(user))
      render json: payload(user), status: 200
    else
      render json: { error: 'Invalid email/password' }, status: :unauthorized
    end
  end

  def payload(user)
    {
      message: 'User logged in successfully',
      token: generate_token(user),
      data: { id: user.id, email: user.email, lastName: user.last_name }
    }
  end

  private
  def generate_token(user)
    JsonWebToken.encode({ user_id: user.id, email: user.email, is_admin: user.is_admin })
  end
end
