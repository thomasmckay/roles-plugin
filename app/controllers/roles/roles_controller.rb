require_dependency "roles/application_controller"

module Roles
  class RolesController < Roles::ApplicationController

    before_filter :authorize

    def rules
      {
        :index => lambda {true},
        :all => lambda {true}
      }
    end

    def index
      render 'bastion/layouts/application', :layout => false
    end

    def plugin
      #redirect_to :action => 'index', :anchor => '/roles'
      render 'bastion/layouts/application', :layout => false, :anchor => '/roles'
    end
  end
end
