Rails.application.routes.draw do

  #resource :roles, :only => [:index]

  namespace 'roles' do
    match 'plugin' => 'roles#plugin', :via => :get

    #namespace 'api' do
    #  match 'index' => 'roles#index', :via => :get
    #end
  end

end
