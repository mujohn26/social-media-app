class ApplicationController < ActionController::Base
  attr_reader :current_user


  protected

  def authenticate_request!
    unless user_id_in_token?
      render json: { errors: 'Please login first' }, status: :unauthorized
      return
    end
    @current_user = User.find(auth_token[:user_id]) 
  rescue JWT::VerificationError, JWT::DecodeError
    render json: { errors: ['Invalid login'] }, status: :unauthorized
  end

  private

  def http_token
    @http_token ||= (request.headers['Authorization'].split(' ').last if request.headers['Authorization'].present?)
  end

  def auth_token
    @auth_token ||= JsonWebToken.decode(http_token)
  end

  def user_id_in_token?
    http_token && auth_token && auth_token[:user_id].to_i
  end
end
