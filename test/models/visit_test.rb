# == Schema Information
#
# Table name: visits
#
#  id               :bigint           not null, primary key
#  patient_id       :integer          not null
#  purpose_of_visit :string           not null
#  visit_details    :string
#  appointment_time :datetime         not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#

require 'test_helper'

class VisitTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
