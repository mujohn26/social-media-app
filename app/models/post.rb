class Post < ApplicationRecord
  validates :description, presence: true
  belongs_to :user
end
