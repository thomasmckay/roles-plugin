Rails.application.routes.draw do

  #resource :roles, :only => [:index]

  namespace 'roles' do
    match 'plugin' => 'roles#plugin', :via => :get

    namespace 'api' do
      match 'index' => 'roles#index', :via => :get
      match ':id/show' => 'roles#show', :via => :get
      match '' => 'roles#create', :via => :post
    end
  end

end
