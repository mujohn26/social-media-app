class JsonWebToken
  JWT_SECRET = ENV['JWT_SECRET']
  def self.encode(payload)
    JWT.encode(payload, JWT_SECRET)
  end

  def self.decode(token)
    HashWithIndifferentAccess.new(JWT.decode(token, JWT_SECRET)[0])
  rescue StandardError
    nil
  end
end
 