class UsersController < ApplicationController
  def index
    users = User.all
    render json: users.to_json, status: 200
  end
end
