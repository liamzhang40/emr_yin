class CreatePatients < ActiveRecord::Migration[5.2]
  def change
    create_table :patients do |t|
      t.string :first_name, null: false
      t.string :last_name, null: false
      t.string :gender, null: false
      t.date :date_of_birth, null: false
      t.integer :age, null: false
      t.string :email, null: false 
      t.string :phone_number, null: false
      t.string :street_address, null: false
      t.string :city, null: false
      t.string :state, null: false
      t.string :zip, null: false
      t.text :description

      t.timestamps
    end
    add_index :patients, :first_name
    add_index :patients, :last_name
  end
end
