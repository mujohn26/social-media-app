class AuthenticationController < ApplicationController
  skip_before_action :verify_authenticity_token
  def authenticate_user
    user = User.find_by(email: params[:email])
    if user && user.authenticate(params[:password])
      render json: payload(user), status: 200
    else
      render json: { error: 'Invalid email/password' }, status: :unauthorized
    end
  end

  def payload(user)
    {
      message: 'User logged in successfully',
      token: JsonWebToken.encode({ user_id: user.id, email: user.email, is_admin: user.is_admin }),
      data: { id: user.id, email: user.email, lastName: user.last_name }
    }
  end
end
