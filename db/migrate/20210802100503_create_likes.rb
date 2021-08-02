class CreateLikes < ActiveRecord::Migration[6.1]
  def change
    create_table :likes do |t|
      t.belongs_to :post
      t.belongs_to :user

      t.timestamps
    end
  end
end
