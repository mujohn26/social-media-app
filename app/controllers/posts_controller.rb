class PostsController < ApplicationController
  before_action :authenticate_request!, only: [:create]
  skip_before_action :verify_authenticity_token

  def create
    posts_data = {
      user_id: @auth_token[:user_id],
      is_shared: false,
      **posts_params

    }
    new_post = Post.create(posts_data)
    if new_post.save
      render json: { message: 'Post was published successfully' },
             status: 201
    else
      render json: { error: new_post.errors }, status: 400

    end
  end

  private

  def posts_params
    params.permit(:description)
  end
end
