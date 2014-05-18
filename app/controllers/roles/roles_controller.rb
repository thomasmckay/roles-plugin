require_dependency "roles/application_controller"

module Roles
  class RolesController < Roles::ApplicationController

    skip_before_filter :authorize

    def index
      render 'roles/layouts/application', :layout => false
    end

    def plugin
      #redirect_to :action => 'index', :anchor => '/roles'
      render 'roles/layouts/application', :layout => false, :anchor => '/roles'
    end
  end
end
