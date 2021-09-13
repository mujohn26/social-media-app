class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  # has_secure_password
  # validates :first_name, presence: true
  # validates :last_name, presence: true
  validates :email, presence: true, uniqueness: true
  # validates :reset_password_token, uniqueness: true
  # validates :password
  # def generate_token!
  #   self.reset_password_token = generate_token
  #   self.reset_password_sent_at = Time.now.utc
  #   save!
  # end

  # def password_token_valid?
  #   (self.reset_password_sent_at + 4.hours)> Time.now.utc 
  # end

  # private

  # def generate_token
  #   SecureRandom.hex(10) 
  # end

end
