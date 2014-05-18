Rails.application.routes.draw do

  #resource :roles, :only => [:index]

  namespace 'roles' do
    #match 'roles' => 'roles#index', :via => :get
    match '/roles/(*path)', :to => "roles#index"

    namespace 'api' do
      match 'index' => 'roles#index', :via => :get
      match ':id/show' => 'roles#show', :via => :get
      match '' => 'roles#create', :via => :post
    end
  end

end
