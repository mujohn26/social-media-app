require 'rails_helper'
RSpec.describe PasswordsController, driver: :selenium_chrome, js: true do
  describe 'the create reset process' do
    it 'should forgot password' do
      visit('/forgot')
      fill_in 'Email', with: 'test@gmail.com'
      click_button 'Send link'
      expect(page).to have_content 'Reset link was sent to your email address, if you dont receive it, please try again'
    end
    it 'Throws error when email is empty' do
      visit('/forgot')
      fill_in 'Email', with: ''
      click_button 'Send link'
      expect(page).to have_content 'Email is empty'
    end
    it 'Throws error for empty fields ' do
      visit('/reset')
      fill_in 'Password', with: ''
      fill_in 'Confirm Password', with: ''
      click_button 'Reset password'
      expect(page).to have_content 'Password is empty'
      expect(page).to have_content 'Confirm Password is empty'
    end
    it 'Throws error for empty fields ' do
      visit('/reset')
      fill_in 'Password', with: ''
      fill_in 'Confirm Password', with: ''
      click_button 'Reset password'
      expect(page).to have_content 'Invalid token, please try again'
    end
    it 'It resets password successfully' do
      User.create({ email: 'test@gmail.com', first_name: 'test', last_name: 'app', password: 'test@123',
                    reset_password_token: 'valid-token', reset_password_sent_at: Time.now.utc })
      visit('/reset?token=valid-token')
      fill_in 'Password', with: 'test123@'
      fill_in 'Confirm Password', with: 'test123@'
      click_button 'Reset password'
      expect(page).to have_content 'Login'
    end
  end
end
