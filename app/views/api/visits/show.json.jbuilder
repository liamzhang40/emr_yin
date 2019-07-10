json.column_heads do
  json.array! @columns
end

json.visit do
  json.partial! 'api/visits/visit.json.jbuilder', visit: @visit
end