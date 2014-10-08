module Roles
  class Engine < ::Rails::Engine
    isolate_namespace Roles

    initializer 'roles.mount_engine', :after => :build_middleware_stack do |app|
      app.routes_reloader.paths << "#{Roles::Engine.root}/config/mount_engine.rb"
    end

    initializer "roles.paths" do |app|
      app.routes_reloader.paths.unshift("#{Roles::Engine.root}/config/routes/api/roles.rb")
      app.routes_reloader.paths.unshift("#{Roles::Engine.root}/config/overrides.rb")
    end

    config.to_prepare do
      # Model extensions
      ::Role.send :include, Roles::Concerns::RoleExtensions

      #Controller extensions
      ::Api::V2::RolesController.send :include, Roles::Concerns::RolesControllerExtensions
    end

    initializer 'roles.register_plugin', :after => :finisher_hook do
      require 'roles/plugin'
      require 'roles/permissions'
    end

  end
end
