json.column_heads do
  json.array! @columns
end

json.patient do
  json.partial! 'api/patients/patient.json.jbuilder', patient: @patient
end