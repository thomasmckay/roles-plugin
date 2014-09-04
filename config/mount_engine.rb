Foreman::Application.routes.draw do
  mount Roles::Engine, :at => '/', :as => 'roles'
end
