class PostsController < ApplicationController
  before_action :authenticate_user!
  skip_before_action :verify_authenticity_token

  def index 
    posts = Post.paginate(page:request.params[:page], per_page: 5).order('created_at DESC')

    posts_data = []
    posts.each do |post|
      comments = Comment.all.where(post_id: post.id)
      post_object = {
        post: post.as_json(
        include: {
        user: {
          only: %i[first_name last_name email]
        }
      }
      ),
      comments: comments.as_json(
      include: {
        user: {
          only: %i[first_name last_name email]
        }
      }
      )

      }

      posts_data.push(post_object)
    end

    render json: { message: 'Posts were retrieved successfully', data: posts_data, loggedIn: true, token: cookies.signed[:token] },
           status: 200
  end

  def create
    posts_data = {
      user_id: current_user.id,
      is_shared: false,
      **posts_params
    }
    new_post = Post.create(posts_data)

    comments = Comment.all.where(post_id: new_post.id)
    if new_post.save
      post_object = {
        post: new_post.as_json(
        include: {
        user: {
          only: %i[first_name last_name email]
        }
      }
      ),
      comments: comments.as_json(
      include: {
        user: {
          only: %i[first_name last_name email]
        }
      }
      )

      }
      render json: { message: 'Post was published successfully', new_post: post_object, loggedIn: true },
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
