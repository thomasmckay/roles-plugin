Roles::Engine.routes.draw do
  scope :roles, :path => '/roles' do
    namespace :api do
      resources :roles, :only => [:index, :update] do
        member do
          match '/users' => 'roles#users', :via => :get
          match '/users' => 'roles#add_users', :via => :post
          match '/users' => 'roles#remove_users', :via => :put

          # TODO: see note in role.factor.js
          match '/permissions' => 'roles#user_permissions', :view => :get
        end
      end
    end
  end
end
