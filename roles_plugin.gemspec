$:.push File.expand_path("../lib", __FILE__)

# Maintain your gem's version:
require "roles_plugin/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = "roles_plugin"
  s.version     = RolesPlugin::VERSION
  s.authors     = ["thomasfmckay@gmail.com"]
  s.email       = ["foreman-dev@googlegroups.com"]
  s.homepage    = "http://theforeman.org"
  s.summary     = "Foreman & Katello Roles UI"
  s.description = "Foreman & Katello Roles UI"

  s.files = Dir["{app,config,lib}/**/*", "README.md"]
  s.test_files = Dir["test/**/*"]

  s.add_dependency "bastion"
end
