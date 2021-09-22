require 'rails_helper'

RSpec.describe PostsController, type: :model do
    before do
    User.destroy_all
    Post.destroy_all
    end
  user = User.create({ id: 123, email: 'test22@gmail.com', first_name: 'test', last_name: 'app', password: 'test@123',
                       is_admin: false })
  user.save!
  post = Post.new(description: 'testing post model', user:user, is_shared: false, created_at: '2021-08-27',
                  updated_at: '2021-08-27')
  it 'valid post attributes' do
    expect(post).to be_valid
  end
  it 'is not valid without first name' do
    post.description = nil
    expect(post).to_not be_valid
  end
end
