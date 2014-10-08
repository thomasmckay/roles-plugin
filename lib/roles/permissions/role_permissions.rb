require 'roles/plugin.rb'

# To adjust a user's role, edit permission is required for both
# editing the role as well as the user
Foreman::AccessControl.permission(:edit_roles).actions << [
  'roles/api/roles/add_users',
  'roles/api/roles/remove_users'
]
Foreman::AccessControl.permission(:edit_users).actions << [
  'roles/api/roles/add_users',
  'roles/api/roles/remove_users'
]

# TODO: Are reciprocal permissions needed for organizations and locations (like users above)?
Foreman::AccessControl.permission(:edit_roles).actions << [
  'roles/api/roles/add_organizations',
  'roles/api/roles/remove_organizations',
  'roles/api/roles/add_locations',
  'roles/api/roles/remove_locations'
]

Foreman::AccessControl.permission(:view_roles).actions << [
  'roles/api/roles/users',
]
Foreman::AccessControl.permission(:view_users).actions << [
  'roles/api/roles/users',
]

