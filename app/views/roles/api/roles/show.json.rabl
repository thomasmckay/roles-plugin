object @role

extends 'api/v2/roles/show'

node :resource_types do |role|
  role.permissions.collect do |permission|
    permission.resource_type
  end.uniq
end

child :filters => :filters do
  extends 'roles/api/roles/filter'
end