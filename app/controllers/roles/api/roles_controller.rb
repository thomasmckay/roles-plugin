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
  module Api
    class RolesController < ::Api::V2::RolesController

      before_filter :find_resource, :only => [:users, :add_users, :remove_users]

      layout '/api/v2/layouts/index_layout', :only => :users

      # TODO: apipie
      def users
        associated = (params[:associated] || 'true').to_bool # TODO: what's best way to check bool in params?
        user_ids = User.authorized(:view_users).except_hidden.collect do |user|
          if associated
            user.id if user.role_ids.include? @role.id
          else
            user.id unless user.role_ids.include? @role.id
          end
        end
        user_ids.compact!

        @users = User.where(:id => user_ids).paginate(paginate_options)

        render :template => 'api/v2/users/index'
      end

      # TODO: apipie
      def add_users
        ids = params[:role][:user_ids]
        @role.user_ids = (@role.user_ids + ids).uniq
        @role.save!
        render :action => :show
      end

      # TODO: apipie
      def remove_users
        ids = params[:role][:user_ids]
        @role.user_ids = (@role.user_ids - ids).uniq
        @role.save!
        render :action => :show
      end

      def action_permission
        if %w(add_users remove_users).include?(params[:action])
          :edit
        elsif %w(users).include?(params[:action])
          :view
        else
          super
        end
      end

    end
  end
end
