class ApplicationController < ActionController::Base
  include ::ActionController::Cookies
  attr_reader :current_user


  protected

  def authenticate_user!
    unless  user_id_in_token?
      render json: { errors: 'Please login first', loggedIn:false}, status: :unauthorized
      return
    end
    @current_user = User.find(auth_token[:user_id])
  rescue JWT::VerificationError, JWT::DecodeError
    render json: { errors: ['Invalid login'] }, status: :unauthorized
  end
  private

  def http_token
    @http_token ||= cookies.signed[:token]
  end

  def auth_token
    @auth_token ||= JsonWebToken.decode(http_token)
  end

  def user_id_in_token?
    http_token && auth_token && auth_token[:user_id].to_i
  end
end
