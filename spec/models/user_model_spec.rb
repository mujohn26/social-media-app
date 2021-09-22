require 'rails_helper'

RSpec.describe UsersController, type: :model do
    before do
    User.destroy_all
  end
  user = User.new( email: 'test@gmail.com', first_name: 'test', last_name: 'app', password: 'test@123' )
  it 'valid user attributes' do
    expect(user).to be_valid
  end
  it 'is not valid without first name' do
    user.first_name = nil
    expect(user).to_not be_valid
  end
  it 'is not valid without first name' do
    user.last_name = nil
    expect(user).to_not be_valid
  end
  it 'is not valid without email' do
    user.email = nil
    expect(user).to_not be_valid
  end
  it 'is not valid without password' do
    user.email = nil
    expect(user).to_not be_valid
  end
end