collection @permissions

attribute :resource_name => :name
attribute :resource_type => :id

child :permissions do |permission|
  extends 'roles/api/roles/permission'
end
