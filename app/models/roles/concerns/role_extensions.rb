#
# Copyright 2014 Red Hat, Inc.
#
# This software is licensed to you under the GNU General Public
# License as published by the Free Software Foundation; either version
# 2 of the License (GPLv2) or (at your option) any later version.
# There is NO WARRANTY for this software, express or implied,
# including the implied warranties of MERCHANTABILITY,
# NON-INFRINGEMENT, or FITNESS FOR A PARTICULAR PURPOSE. You should
# have received a copy of GPLv2 along with this software; if not, see
# http://www.gnu.org/licenses/old-licenses/gpl-2.0.txt.

module Roles
  module Concerns
    module RoleExtensions
      extend ActiveSupport::Concern

      included do
        def readable?
          authorized?(:view_roles)
        end

        def editable?
          authorized?(:edit_roles)
        end

        def deletable?
          authorized?(:destroy_roles)
        end
      end
    end
  end
end
