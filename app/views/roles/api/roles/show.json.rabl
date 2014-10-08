object @role

extends 'api/v2/roles/show'

node :resource_types do |role|
  role.permissions.collect do |permission|
    permission.resource_type
  end.uniq
end

node :organizations do |role|
  organizations = []
  role.filters.each do |filter|
    filter.organizations.each do |organization|
      organizations << organization.name
    end
  end
  organizations.uniq
end

node :locations do |role|
  locations = []
  role.filters.each do |filter|
    filter.locations.each do |location|
      locations << location.name
    end
  end
  locations.uniq
end

child :filters => :filters do
  extends 'roles/api/roles/filter'
end

node :permissions do |role|
  {
    :deletable => role.deletable?,
    :editable => role.editable?,
  }
end
