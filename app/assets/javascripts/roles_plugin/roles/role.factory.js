/**
 * Copyright 2014 Red Hat, Inc.
 *
 * This software is licensed to you under the GNU General Public
 * License as published by the Free Software Foundation; either version
 * 2 of the License (GPLv2) or (at your option) any later version.
 * There is NO WARRANTY for this software, express or implied,
 * including the implied warranties of MERCHANTABILITY,
 * NON-INFRINGEMENT, or FITNESS FOR A PARTICULAR PURPOSE. You should
 * have received a copy of GPLv2 along with this software; if not, see
 * http://www.gnu.org/licenses/old-licenses/gpl-2.0.txt.
 **/

/**
 * @ngdoc service
 * @name  RolesPlugin.roles.factory:Role
 *
 * @requires $resource
 * @requires CurrentOrganization
 *
 * @description
 *   Provides a $resource for a role or list of roles
 */
angular.module('RolesPlugin.roles').factory('Role',
    ['BastionResource', function (BastionResource) {
        return BastionResource('/../api/v2/roles/:id/:action', {id: '@id'}, {
            get: {method: 'GET', isArray: false},
            update: {method: 'PUT', url: '/../roles_plugin/api/roles/:id'},
            removeRoles: {method: 'GET', params: {action: 'filter'}},
            filter: {method: 'GET', params: {action: 'filter'}},
            permissions: {method: 'GET', isArray: false, transformResponse: function (data) {
                var role = angular.fromJson(data);
                return {results: role.filters};
            }},
            userGroups: {method: 'GET', isArray: false, url: '/../api/v2/usergroups'},
            availableUserGroups: {method: 'GET', isArray: false, url: '/../api/v2/usergroups'},
            users: {method: 'GET', url: '/../roles_plugin/api/roles/:id/users'},
            availableUsers: {method: 'GET', url: '/../roles_plugin/api/roles/:id/users', params: {'associated': false}},
            addUsers: {method: 'POST', url: '/../roles_plugin/api/roles/:id/users'},
            removeUsers: {method: 'PUT', url: '/../roles_plugin/api/roles/:id/users'},

            organizations: {method: 'GET', url: '/../roles_plugin/api/roles/:id/organizations'},
            availableOrganizations: {method: 'GET', url: '/../roles_plugin/api/roles/:id/organizations', params: {'associated': false}},
            addOrganizations: {method: 'POST', url: '/../roles_plugin/api/roles/:id/organizations'},
            removeOrganizations: {method: 'PUT', url: '/../roles_plugin/api/roles/:id/organizations'},

            locations: {method: 'GET', url: '/../roles_plugin/api/roles/:id/locations'},
            availableLocations: {method: 'GET', url: '/../roles_plugin/api/roles/:id/locations', params: {'associated': false}},
            addLocations: {method: 'POST', url: '/../roles_plugin/api/roles/:id/locations'},
            removeLocations: {method: 'PUT', url: '/../roles_plugin/api/roles/:id/locations'},

            // TODO: Should this be on User? Some query to return only the user's available
            //       filter resource types and permissions.
            availablePermissions: {method: 'GET', isArray: true, url: '/../roles_plugin/api/roles/:id/permissions'}
        });
    }]
);
