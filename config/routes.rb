Roles::Engine.routes.draw do

=begin
  namespace 'roles' do
    namespace 'api' do
      match 'index' => 'roles#index', :via => :get
      match ':id/show' => 'roles#show', :via => :get
      match '' => 'roles#create', :via => :post
    end
  end
=end

  match '/:roles_page/(*path)', :to => "roles#index"
  match '/roles/(*path)', :to => "roles#index_ie"

end
