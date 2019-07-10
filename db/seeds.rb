# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Patient.destroy_all
Visit.destroy_all

100.times do
  dob = Faker::Date.birthday(18, 65)
  age = ((Date.today - dob).to_i / 365.25).to_i
  Patient.create!(
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name,
    gender: ['M', 'F'].sample,
    date_of_birth: dob,
    age: age,
    email: Faker::Internet.email,
    phone_number: Faker::PhoneNumber.cell_phone,
    street_address: Faker::Address.street_address,
    city: Faker::Address.city,
    state: Faker::Address.state_abbr,
    zip: Faker::Address.zip,
    description: Faker::TvShows::GameOfThrones.quote,
  )
end

Patient.all.each do |patient|
  rand(1..5).times do 
    Visit.create!(
      patient_id: patient.id,
      purpose_of_visit: Faker::Lorem.word,
      visit_details: Faker::Lorem.paragraphs(rand(1..5)),
      appointment_time: Faker::Time.between(Date.today, Date.today + 2.month, :day)
    )
  end
end

