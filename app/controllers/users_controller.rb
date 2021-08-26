class UsersController < ApplicationController
  before_action :authenticate_request!, only: [:index]
  skip_before_action :verify_authenticity_token
  def index
    users = User.all
    render json: users.to_json, status: 200
  end

  def create
    if users_params[:password] == 'password'
      render json: { error: 'You can not have password text as your password.' }, status: 400
    else

      users_data = {
        is_admin: false,
        is_verified: true,
        is_active: true,
        **users_params

      }
      new_user = User.create(users_data)
      if new_user.save
        render json: { message: 'Account was created successfully', token: JsonWebToken.encode({ user_id: new_user.id, email: new_user.email, is_admin: new_user.is_admin, time: Time.now.utc }) },
               status: 201
      else
        render json: { error: new_user.errors }, status: 400

      end
    end
  end

  private

  def users_params
    params.permit(:first_name, :last_name, :email, :password)
  end
end
