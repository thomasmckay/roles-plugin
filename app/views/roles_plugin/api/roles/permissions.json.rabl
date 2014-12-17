collection @permissions

attribute :resource_name => :name
attribute :resource_type => :id

child :permissions do |permission|
  extends 'roles_plugin/api/roles/permission'
end
