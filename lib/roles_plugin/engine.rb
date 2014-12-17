require 'bastion'

module RolesPlugin
  class Engine < ::Rails::Engine
    isolate_namespace RolesPlugin

    initializer 'roles_plugin.mount_engine', :after => :build_middleware_stack do |app|
      app.routes_reloader.paths << "#{RolesPlugin::Engine.root}/config/mount_engine.rb"
    end

    initializer "roles_plugin.paths" do |app|
      app.routes_reloader.paths.unshift("#{RolesPlugin::Engine.root}/config/routes/api/roles.rb")
    end

    initializer "roles_plugin.assets", :group => :all do |app|
      SETTINGS[:roles] = {
        :assets => {
          :precompile => [
            'roles_plugin/roles_plugin.js'
          ]
        }
      }
    end

    initializer "roles_plugin.load_app_instance_data" do |app|
      app.config.paths['db/migrate'] += RolesPlugin::Engine.paths['db/migrate'].existent
    end

    config.to_prepare do
      Bastion.register_plugin({
         :name => 'roles_plugin',
         :javascript => 'roles_plugin/roles_plugin',
         :pages => %w[roles]
       })

      # Model extensions
      ::Role.send :include, RolesPlugin::Concerns::RoleExtensions

      #Controller extensions
      ::Api::V2::RolesController.send :include, RolesPlugin::Concerns::RolesControllerExtensions
    end

  end
end
