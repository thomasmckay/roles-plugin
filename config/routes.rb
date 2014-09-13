Roles::Engine.routes.draw do

  match '/:roles_page/(*path)', :to => "roles#index"
  match '/roles/(*path)', :to => "roles#index_ie"

end
