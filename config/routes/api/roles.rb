Roles::Engine.routes.draw do

  scope :roles, :path => '/roles' do
    namespace :api do
      resources :roles, :only => [:index]
    end
  end

=begin
  scope :api, :path => '/roles' do
    namespace :api do
      resources :roles, :only => [:index]
    end
  end
=end

end
