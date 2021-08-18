class UserMailer < ApplicationMailer
  def forgot_password(user, domain)
    data = {
      link: "#{domain}/reset?token=#{user.reset_password_token}",
      last_name:user.last_name
    }
    @user = data
    @greeting = 'Hi'
    mail to: user.email, subject: 'Reset password instructions'
  end
end
