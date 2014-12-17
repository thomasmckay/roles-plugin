/**
 * Copyright 2013 Red Hat, Inc.
 *
 * This software is licensed to you under the GNU General Public
 * License as published by the Free Software Foundation; either version
 * 2 of the License (GPLv2) or (at your option) any later version.
 * There is NO WARRANTY for this software, express or implied,
 * including the implied warranties of MERCHANTABILITY,
 * NON-INFRINGEMENT, or FITNESS FOR A PARTICULAR PURPOSE. You should
 * have received a copy of GPLv2 along with this software; if not, see
 * http://www.gnu.org/licenses/old-licenses/gpl-2.0.txt.
 */

/**
 * @ngdoc object
 * @name  RolesPlugin.roles.controller:RoleOrganizationsController
 *
 * @requires $scope
 * @requires $q
 * @requires $location
 * @requires gettext
 * @requires Role
 * @requires Nutupane
 *
 * @description
 *   Provides the functionality for the list organizations details action pane.
 */
angular.module('RolesPlugin.roles').controller('RoleOrganizationsController',
    ['$scope', '$q', '$location', 'gettext', 'Role', 'Organization', 'Nutupane',
    function ($scope, $q, $location, gettext, Role, Organization, Nutupane) {
        var organizationsPane, params;

        $scope.successMessages = [];
        $scope.errorMessages = [];

        $scope.role = $scope.role || Role.get({id: $scope.$stateParams.roleId});

        params = {
            'id':          $scope.$stateParams.roleId,
            'search':      $location.search().search || "", // TODO: is this correct?
            'sort_by':     'name',
            'sort_order':  'ASC',
            'paged':       true
        };

        organizationsPane = new Nutupane(Role, params, 'organizations');
        $scope.organizationsTable = organizationsPane.table;
        // TODO: inifinite loop as the list just increments page number
        organizationsPane.searchTransform = function () {
            return "\"\""
        };

        $scope.removeOrganizations = function () {
            var data,
                success,
                error,
                deferred = $q.defer(),
                organizations = _.pluck($scope.role.organizations, 'id'),
                organizationsToRemove = _.pluck($scope.organizationsTable.getSelected(), 'id');

            data = {
                role: {
                    "organization_ids": organizationsToRemove
                }
            };

            success = function (data) {
                $scope.successMessages = [gettext('Removed %x organizations from role "%y".')
                    .replace('%x', $scope.organizationsTable.numSelected).replace('%y', $scope.role.name)];
                $scope.organizationsTable.working = false;
                $scope.organizationsTable.selectAll(false);
                organizationsPane.refresh();
                $scope.role.$get();
                deferred.resolve(data);
            };

            error = function (error) {
                deferred.reject(error.data.errors);
                $scope.errorMessages = error.data.errors;
                $scope.organizationsTable.working = false;
            };

            $scope.organizationsTable.working = true;
            Role.removeOrganizations({id: $scope.role.id}, data, success, error);
            return deferred.promise;
        };
    }]
);
