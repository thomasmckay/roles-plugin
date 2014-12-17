require 'roles_plugin/plugin.rb'

# To adjust a user's role, edit permission is required for both
# editing the role as well as the user
Foreman::AccessControl.permission(:edit_roles).actions << [
  'roles_plugin/api/roles/add_users',
  'roles_plugin/api/roles/remove_users'
]
Foreman::AccessControl.permission(:edit_users).actions << [
  'roles_plugin/api/roles/add_users',
  'roles_plugin/api/roles/remove_users'
]

# TODO: Are reciprocal permissions needed for organizations and locations (like users above)?
Foreman::AccessControl.permission(:edit_roles).actions << [
  'roles_plugin/api/roles/add_organizations',
  'roles_plugin/api/roles/remove_organizations',
  'roles_plugin/api/roles/add_locations',
  'roles_plugin/api/roles/remove_locations'
]

Foreman::AccessControl.permission(:view_roles).actions << [
  'roles_plugin/api/roles/users',
]
Foreman::AccessControl.permission(:view_users).actions << [
  'roles_plugin/api/roles/users',
]

