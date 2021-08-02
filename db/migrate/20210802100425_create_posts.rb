class CreatePosts < ActiveRecord::Migration[6.1]
  def change
    create_table :posts do |t|
      t.string :description
      t.belongs_to :user
      t.boolean :is_shared
      # t.belongs_to :user , foreign_key: 'shared_by'

      t.timestamps
    end
  end
end
