# Load the Rails application.
require_relative 'application'

# Initialize the Rails application.
Rails.application.initialize!

ActionMailer::Base.delivery_method = :smtp
ActionMailer::Base.perform_deliveries = true

# SMTP settings for gmail
ActionMailer::Base.smtp_settings = {
  address: ENV['EMAIL_ADDRESS'],
  port: ENV['EMAIL_PORT'],
  user_name: ENV['GMAIL_USERNAME'],
  password: ENV['GMAIL_PASSWORD'],
  domain: ENV['EMAIL_DOMAIN'],
  authentication: :login,
  enable_starttls_auto: true
}
