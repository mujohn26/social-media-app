class CommentsController < ApplicationController
  before_action :authenticate_user!
  skip_before_action :verify_authenticity_token

  def index
   post_id= request.headers['post_id']
   @comments = Comment.all.where(post_id: post_id)
   return render json: { comments: @comments.to_json, message:"Comments were fetched successfully" }, status: :ok
  end

  def create
    if comment_params['comment'].nil?
     return render json: { error: 'Comment cannot be empty' }, status: :bad_request
    else
    @comment =Comment.create({**comment_params, user:current_user})
    return render json: { comment: @comment, message:'Comment was created succesfully'}, status: :created
    end
  end


  private

  def comment_params
    params.permit(:comment, :post_id)
  end
 
end
