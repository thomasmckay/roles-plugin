require 'bastion'

module Roles
  class Engine < ::Rails::Engine
    isolate_namespace Roles

    initializer 'roles.mount_engine', :after => :build_middleware_stack do |app|
      app.routes_reloader.paths << "#{Roles::Engine.root}/config/mount_engine.rb"
    end

    initializer "roles.paths" do |app|
      app.routes_reloader.paths.unshift("#{Roles::Engine.root}/config/routes/api/roles.rb")
    end

    initializer "roles.assets", :group => :all do |app|
      SETTINGS[:roles] = {
        :assets => {
          :precompile => [
            'roles/roles.js'
          ]
        }
      }
    end

    config.to_prepare do
      Bastion.register_plugin({
         :name => 'roles',
         :javascript => 'roles/roles',
         :pages => %w[roles]
       })

      # Model extensions
      ::Role.send :include, Roles::Concerns::RoleExtensions

      #Controller extensions
      ::Api::V2::RolesController.send :include, Roles::Concerns::RolesControllerExtensions
    end

  end
end
