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

      before_filter :find_resource, :only => [:users, :add_users, :remove_users,
                                              :organizations, :add_organizations, :remove_organizations,
                                              :locations, :add_locations, :remove_locations,
                                              :update, :user_permissions]

      layout '/api/v2/layouts/index_layout', :only => [:users, :organizations, :locations]

      def update
        # Necessary to avoid "mass assignment" errors
        params[:role].delete :id
        params[:role].delete :builtin
        super
      end

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

        @users = User.where(:id => user_ids)

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

      # TODO: apipie
      def organizations
        associated = (params[:associated] || 'true').to_bool # TODO: what's best way to check bool in params?

        filter_organization_ids = []
        @role.filters.each do |filter|
          filter.organizations.each do |organization|
            filter_organization_ids << organization.id
          end
        end
        filter_organization_ids.uniq

        organization_ids = Organization.authorized(:view_organizations).collect do |organization|
          if associated
            organization.id if filter_organization_ids.include? organization.id
          else
            organization.id unless filter_organization_ids.include? organization.id
          end
        end
        organization_ids.compact!

        @organizations = Organization.where(:id => organization_ids).paginate(paginate_options)

        @taxonomies = @organizations
        render :template => 'api/v2/taxonomies/index'
      end

      # TODO: apipie
      def add_organizations
        ids = params[:role][:organization_ids]
        ids &= Organization.authorized(:view_organizations).pluck(:id)

        @role.filters.each do |filter|
          if filter.allows_organization_filtering?
            filter.organization_ids = (filter.organization_ids + ids).uniq
            filter.save!
          end
        end
        @role.reload

        render :action => :show
      end

      # TODO: apipie
      def remove_organizations
        ids = params[:role][:organization_ids]
        ids &= Organization.authorized(:view_organizations).pluck(:id)

        @role.filters.each do |filter|
          if filter.allows_organization_filtering?
            filter.organization_ids = (filter.organization_ids - ids).uniq
            filter.save!
          end
        end
        @role.reload

        render :action => :show
      end


      # TODO: apipie
      def locations
        associated = (params[:associated] || 'true').to_bool # TODO: what's best way to check bool in params?

        filter_location_ids = []
        @role.filters.each do |filter|
          filter.locations.each do |location|
            filter_location_ids << location.id
          end
        end
        filter_location_ids.uniq

        location_ids = Location.authorized(:view_locations).collect do |location|
          if associated
            location.id if filter_location_ids.include? location.id
          else
            location.id unless filter_location_ids.include? location.id
          end
        end
        location_ids.compact!

        @locations = Location.where(:id => location_ids).paginate(paginate_options)

        @taxonomies = @locations
        render :template => 'api/v2/taxonomies/index'
      end

      # TODO: apipie
      def add_locations
        ids = params[:role][:location_ids]
        ids &= Location.authorized(:view_locations).pluck(:id)

        @role.filters.each do |filter|
          if filter.allows_location_filtering?
            filter.location_ids = (filter.location_ids + ids).uniq
            filter.save!
          end
        end
        @role.reload

        render :action => :show
      end

      # TODO: apipie
      def remove_locations
        ids = params[:role][:location_ids]
        ids &= Location.authorized(:view_locations).pluck(:id)

        @role.filters.each do |filter|
          if filter.allows_location_filtering?
            filter.location_ids = (filter.location_ids - ids).uniq
            filter.save!
          end
        end
        @role.reload

        render :action => :show
      end



      def user_permissions
        if User.current.admin?
          @permissions = Permission.resources_with_translations.collect do |resource_name, resource_type|
            OpenStruct.new(:resource_type => resource_type,
                           :resource_name => resource_name,
                           :permissions => Permission.where(:resource_type => resource_type))
          end
        else
          @permissions = []
          User.current.roles.each do |role|
            role.permissions.each do |permission|
              offset = @permissions.index { |existing| existing.resource_type == permission.resource_type }
              if offset.nil?

                @permissions << OpenStruct.new(:resource_type => permission.resource_type, :permissions => [])
                offset = -1
              end
              @permissions[offset].permissions << permission unless @permissions[offset].permissions.include? permission
            end
          end
        end
        render :action => :permissions
      end

      def action_permission
        if %w(add_users remove_users
              add_organizations remove_organizations
              add_locations remove_locations).include?(params[:action])
          :edit
        elsif %w(users organizations locations user_permissions).include?(params[:action])
          :view
        else
          super
        end
      end

    end
  end
end
