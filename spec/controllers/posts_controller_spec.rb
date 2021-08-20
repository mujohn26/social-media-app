require 'rails_helper'
      
RSpec.describe PostsController, type: :controller do
  describe 'Postes controller test' do
    it 'Creates a post' do
      post = post(:create, params: { user_id: 3,is_shared: false,description:'test posts' })
      expect(JSON.parse(post.body)['error']).to eq('You can not have password text as your password.')
      expect(post.status).to eq(400)
    end
  end
end
