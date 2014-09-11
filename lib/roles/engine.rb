module Roles
  class Engine < ::Rails::Engine
    isolate_namespace Roles

    initializer 'katello.mount_engine', :after => :build_middleware_stack do |app|
      app.routes_reloader.paths << "#{Roles::Engine.root}/config/mount_engine.rb"
    end

    initializer "roles.paths" do |app|
      app.routes_reloader.paths.unshift("#{Roles::Engine.root}/config/routes/api/roles.rb")
      app.routes_reloader.paths.unshift("#{Roles::Engine.root}/config/overrides.rb")
    end

    config.to_prepare do
      #Controller extensions
      ::Api::V2::RolesController.send :include, Roles::Concerns::RolesControllerExtensions
    end

  end
end
