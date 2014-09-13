Roles::Engine.routes.draw do
  scope :roles, :path => '/roles' do
    namespace :api do
      resources :roles, :only => [:index] do
        member do
          match '/users' => 'roles#users', :via => :get
          match '/users' => 'roles#add_users', :via => :post
          match '/users' => 'roles#remove_users', :via => :put
        end
      end
    end
  end
end
