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
 * @name  Roles.roles.factory:Role
 *
 * @requires $resource
 * @requires CurrentOrganization
 *
 * @description
 *   Provides a $resource for a role or list of roles
 */
angular.module('Roles.roles').factory('Role', ['$resource',
    function ($resource) {
        return $resource('/../roles/api/:id/:action', {id: '@id'}, {
            get: {method: 'GET', isArray: false, params: {action: 'show'}},
            query: {method: 'GET', isArray: false, params: {action: 'index'}},
            removeRoles: {method: 'GET', params: {action: 'filter'}},
            filter: {method: 'GET', params: {action: 'filter'}},
            permissions: {method: 'GET', params: {action: 'show'}, transformResponse: function (data) {
                var role = angular.fromJson(data);
                return {results: role.filters};
            }}
        });
    }]
);
