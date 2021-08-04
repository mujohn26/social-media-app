class AuthenticationController < ApplicationController
  def authenticate_user
    user = User.find_for_database_authentication(email: params[:email])
    if user.valid_password?(params[:password])
      render json: payload(user)
    else
      render json: { errors: 'Invalid email/password' }, status: :unauthorized
    end
  end

  def payload
    return nil unless user && user.id

    {
      auth_token: JsonWebToken.encode({ user_id: user.id }),
      user: { id: user.id, email: user.email }
    }
  end
end
