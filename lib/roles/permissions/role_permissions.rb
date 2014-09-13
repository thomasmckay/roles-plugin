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

Foreman::AccessControl.permission(:view_roles).actions << [
  'roles/api/roles/users',
]
Foreman::AccessControl.permission(:view_users).actions << [
  'roles/api/roles/users',
]
# TODO: is the above really correct, or is below?
#Foreman::AccessControl.permission(:edit_roles).actions << 'roles/api/roles#add_users'
#Foreman::AccessControl.permission(:edit_roles).actions << 'roles/api/roles#remove_users'
#Foreman::AccessControl.permission(:edit_users).actions << 'roles/api/roles#add_users'
#Foreman::AccessControl.permission(:edit_users).actions << 'roles/api/roles#remove_users'

