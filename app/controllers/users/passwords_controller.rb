# frozen_string_literal: true

class Users::PasswordsController < Devise::PasswordsController
  prepend_before_action :require_no_authentication, only: [:new]
  # GET /resource/password/new
  # def new
  #   super
  # end

  # POST /resource/password
  def create
    user = User.find_by(email: params[:email])
    if user.present?
      create_reset_password_token(user)
      UserMailer.forgot_password(user, request.base_url).deliver_now
    end
    render json: { message: 'Reset link was sent to your email address, if you dont receive it, please try again' },
           status: :ok
  end

  # GET /resource/password/edit?reset_password_token=abcdef
  # def edit
  #   super
  # end

   def edit
    user = User.find_by(reset_password_token:request.headers[:token])
    super
    user.update(params)
    render json: { message: 'Password was updated successfully' },
           status: :ok
  end

  # PUT /resource/password
  # def update
  #   super
  # end

  protected

  def create_reset_password_token(user)
    raw, hashed = Devise.token_generator.generate(User, :reset_password_token)
    @token = raw
    user.reset_password_token = @token
    user.reset_password_sent_at = Time.now.utc
    user.save
  end

  # def after_resetting_password_path_for(resource)
  #   super(resource)
  # end

  # The path used after sending reset password instructions
  # def after_sending_reset_password_instructions_path_for(resource_name)
  #   super(resource_name)
  # end
end
