class CreateFoodies < ActiveRecord::Migration[6.0]
  def change
    create_table :foodies do |t|
      t.string :description
      t.boolean :completed
      t.integer :rating

      t.timestamps
    end
  end
end
