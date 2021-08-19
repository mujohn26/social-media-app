class PasswordsController < ApplicationController
  skip_before_action :verify_authenticity_token
  def forgot
    return render json: { error: 'Email was not provided' }, status: :bad_request if params[:email].blank?

    user = User.find_by(email: params[:email])
    if user.present?
      user.generate_token!
      UserMailer.forgot_password(user, request.base_url).deliver_now
    end
    render json: { message: 'Reset link was sent to your email address, if you dont receive it, please try again' },
           status: :ok
  end

  def reset
    token = request.headers['token']
    return render json: { error: 'Token not found' }, status: :bad_request if request.headers['token'].blank?
    user = User.find_by(reset_password_token: token)
    if user.present? && user.password_token_valid?
      if params[:password].blank? || (params[:password] == 'password')
        return render json: { error: 'Please enter a valid password' },
                      status: 400
      end

      update_password(user)
    else
      render json: { error: 'Invalid token, please try again' }, status: 404
    end
  end

  def update_password(user)
    user.update(users_params)
    render json: { message: 'Password was updated successfully' },
           status: :ok
  end

  private

  def users_params
    params.permit(:password)
  end
end
