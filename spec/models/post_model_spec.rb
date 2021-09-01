require 'rails_helper'

RSpec.describe PostsController, type: :model do
  user = User.create({ id: 1, email: 'test1@gmail.com', first_name: 'test', last_name: 'app', password: 'test@123',
                       is_admin: false })
  post = Post.new(description: 'testing post model', user_id: user.id, is_shared: false, created_at: '2021-08-27',
                  updated_at: '2021-08-27')
  it 'valid post attributes' do
    expect(post).to be_valid
  end
  it 'is not valid without first name' do
    post.description = nil
    expect(post).to_not be_valid
  end
end
