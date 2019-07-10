# == Schema Information
#
# Table name: patients
#
#  id             :bigint           not null, primary key
#  first_name     :string           not null
#  last_name      :string           not null
#  gender         :string           not null
#  date_of_birth  :date             not null
#  age            :integer          not null
#  email          :string           not null
#  phone_number   :string           not null
#  street_address :string           not null
#  city           :string           not null
#  state          :string           not null
#  zip            :string           not null
#  description    :text
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#

class Patient < ApplicationRecord
  validates :first_name, :last_name, :gender, :date_of_birth, :age, :street_address, :city, :state, :zip, presence: true
  has_one_attached :profile
  
  has_many :visits
end
