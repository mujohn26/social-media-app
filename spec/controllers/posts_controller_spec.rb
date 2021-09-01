require 'rails_helper'

RSpec.describe PostsController, type: :controller do
  before do
    Post.destroy_all
    User.destroy_all
    set_cookies
  end

  describe 'Posts controller test' do
    it 'Creates a post' do
      post = post(:create, params: { user_id: 3, is_shared: false, description: 'test posts' })
      expect(JSON.parse(post.body)['message']).to eq('Post was published successfully')
      expect(post.status).to eq(201)
    end

    it 'Fetch all posts' do
      Post.create({ user_id: 1, is_shared: false, description: 'test posts' })
      # Post.create({  user_id: 1, is_shared: false, description: 'test posts' })
      return_data = [
        { 'created_at' => JSON.parse(Post.first.created_at.to_json),
          'description' => Post.first.description,
          'id' => Post.first.id,
          'is_shared' => false,
          'updated_at' => JSON.parse(Post.first.updated_at.to_json),
          'user' =>
       { 'email' => Post.first.user.email,
         'first_name' => Post.first.user.first_name,
         'last_name' => Post.first.user.last_name },
          'user_id' => Post.first.user.id }
      ]
      posts = post(:index)
      expect(JSON.parse(posts.body)['message']).to eq('Posts were retrieved successfully')
      expect(JSON.parse(posts.body)['data']).to eq(return_data)

      expect(posts.status).to eq(200)
    end
  end
end
