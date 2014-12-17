Foreman::Application.routes.draw do
  mount RolesPlugin::Engine, :at => '/', :as => 'roles'
end
