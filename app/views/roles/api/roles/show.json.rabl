object @role

extends 'api/v2/roles/show'

node :resource_types do
     @resource_types
end

child :filters => :filters do
  extends 'roles/api/roles/filter'
end