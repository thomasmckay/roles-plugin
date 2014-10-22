Roles::Engine.routes.draw do
  scope :roles, :path => '/roles' do
    namespace :api do
      resources :roles, :only => [:index, :update] do
        member do
          match '/users' => 'roles#users', :via => :get
          match '/users' => 'roles#add_users', :via => :post
          match '/users' => 'roles#remove_users', :via => :put

          match '/organizations' => 'roles#organizations', :via => :get
          match '/organizations' => 'roles#add_organizations', :via => :post
          match '/organizations' => 'roles#remove_organizations', :via => :put

          match '/locations' => 'roles#locations', :via => :get
          match '/locations' => 'roles#add_locations', :via => :post
          match '/locations' => 'roles#remove_locations', :via => :put

          # TODO: see note in role.factor.js
          match '/permissions' => 'roles#user_permissions', :view => :get
        end
      end
    end
  end
end
