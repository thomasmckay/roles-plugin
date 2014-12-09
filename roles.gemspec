$:.push File.expand_path("../lib", __FILE__)

# Maintain your gem's version:
require "roles/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = "roles"
  s.version     = Roles::VERSION
  s.authors     = ["thomasfmckay@gmail.com"]
  s.email       = ["foreman-dev@googlegroups.com"]
  s.homepage    = "http://theforeman.org"
  s.summary     = "Foreman & Katello Roles UI"
  s.description = "Foreman & Katello Roles UI"

  s.files = Dir["{app,config,lib}/**/*", "README.md"]
  s.test_files = Dir["test/**/*"]

  s.add_dependency "bastion"
end
