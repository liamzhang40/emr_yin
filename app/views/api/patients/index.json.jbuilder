json.column_heads do
  json.array! @columns
end

json.rows do
  @patients.each do |patient|
    json.set! patient.id do
      json.partial! 'api/patients/patient.json.jbuilder', patient: patient
    end
  end
end