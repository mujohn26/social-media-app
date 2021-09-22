require 'rails_helper'

RSpec.describe CommentsController, type: :controller do
  before do
    Comment.destroy_all
    User.destroy_all
    set_cookies
  end

  let(:user) { User.create({ email: 'test1@gmail.com', first_name: 'test', last_name: 'app', password: 'test@123' }) }
  let(:posts) { Post.create({description: 'test', user: user}) }

  describe 'Comments controller test' do
    describe '# when there is error' do
      it 'Throws error comment field is missing' do
      response = post(:create, params: { post_id: posts.id, user_id:user.id })
      expect(response.status).to eq(400)
      expect(JSON.parse(response.body)['error']).to eq('Comment cannot be empty')
      end
    end

    describe '# Create success' do
      it 'Comment is created successfully' do
      response = post(:create, params: { comment:'Wow very good',post_id: posts.id, user_id:user.id })
      expect(response.status).to eq(201)
      expect(JSON.parse(response.body)['message']).to eq('Comment was created succesfully')
      end
    end

    describe '# Fetch comments' do
      it 'Fetchs all comments successfully' do
      post(:create, params: { comment:'Wow very good',post_id: posts.id, user_id:user.id })
      request.headers['post_id'] = posts.id
      response = get(:index)

      expect(response.status).to eq(200)
      expect(JSON.parse(response.body)['message']).to eq('Comments were fetched successfully')
      end
    end
  end
end
