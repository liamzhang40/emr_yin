class CreateVisits < ActiveRecord::Migration[5.2]
  def change
    create_table :visits do |t|
      t.integer :patient_id, null: false
      t.string :purpose_of_visit, null: false
      t.string :visit_details
      t.datetime :appointment_time, null: false

      t.timestamps
    end
    add_index :visits, :patient_id
  end
end
