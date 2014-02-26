object @filter

attributes :id, :name

child :permissions => :permissions do
  extends 'roles/api/roles/permission'
end

attributes :search

child :organizations => :organizations do
  attributes :id, :name
end

child :locations => :locations do
  attributes :id, :name
end