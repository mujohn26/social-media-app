class PostsController < ApplicationController
  before_action :authenticate_user!

  def index 
    posts = Post.paginate(page:request.params[:page], per_page: 5).order('created_at DESC')
    render json: { message: 'Posts were retrieved successfully', data: posts.as_json(
      include: {
        user: {
          only: %i[first_name last_name email]
        }
      }
    ), loggedIn: true, token: cookies.signed[:token] },
           status: 200
  end

  def create
    posts_data = {
      user_id: current_user.id,
      is_shared: false,
      **posts_params
    }
    new_post = Post.create(posts_data)
    if new_post.save
      render json: { message: 'Post was published successfully', new_post: new_post.as_json(
        include: {
          user: {
            only: %i[first_name last_name email]
          }
        }
      ), loggedIn: true },
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
