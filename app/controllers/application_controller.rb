class ApplicationController < ActionController::Base
  # protect_from_forgery
  skip_forgery_protection
  before_action :configure_permitted_parameters, if: :devise_controller?

  # skip_before_action :authenticity_token

  # def json_request?
  #   request.format.json?
  # end

  # include ::ActionController::Cookies
  # attr_reader :current_user

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: %i[first_name last_name email password is_admin])
    devise_parameter_sanitizer.permit(:sign_in, keys: %i[email password])
  end

  # protected

  # def authenticate_request!
  #   unless  user_id_in_token?
  #     render json: { errors: 'Please login first', loggedIn:false}, status: :unauthorized
  #     return
  #   end
  #   @current_user = User.find(auth_token[:user_id])
  # rescue JWT::VerificationError, JWT::DecodeError
  #   render json: { errors: ['Invalid login'] }, status: :unauthorized
  # end
  # private

  # def http_token
  #   @http_token ||= cookies.signed[:token]
  # end

  # def auth_token
  #   @auth_token ||= JsonWebToken.decode(http_token)
  # end

  # def user_id_in_token?
  #   http_token && auth_token && auth_token[:user_id].to_i
  # end
end
