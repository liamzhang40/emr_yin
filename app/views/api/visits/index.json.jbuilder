json.column_heads do
  json.array! @columns
end

json.rows do
  @visits.each do |visit|
    json.set! visit.id do
      json.partial! 'api/visits/visit.json.jbuilder', visit: visit
    end
  end
end