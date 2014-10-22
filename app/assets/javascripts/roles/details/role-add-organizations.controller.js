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
 * @name  Roles.roles.controller:RoleAddOrganizationsController
 *
 * @requires $scope
 * @requires $q
 * @requires $location
 * @requires gettext
 * @requires Role
 * @requires Nutupane
 *
 * @description
 *   Provides the functionality for adding organizations to a role.
 */
angular.module('Roles.roles').controller('RoleAddOrganizationsController',
    ['$scope', '$q', '$location', 'gettext', 'Role', 'Nutupane',
    function ($scope, $q, $location, gettext, Role, Nutupane) {
        var organizationsPane, params;

        $scope.successMessages = [];
        $scope.errorMessages = [];

        $scope.role = $scope.role || Role.get({id: $scope.$stateParams.roleId});

        params = {
            'id':          $scope.$stateParams.roleId,
            'associated':  false,
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

        $scope.addOrganizations = function () {
            var data,
                success,
                error,
                deferred = $q.defer(),
                organizationsToAdd = _.pluck($scope.organizationsTable.getSelected(), 'id');

            data = {
                role: {
                    "organization_ids": organizationsToAdd
                }
            };

            success = function (data) {
                $scope.successMessages = [gettext('Added %x organizations to role "%y".')
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
            Role.addOrganizations({id: $scope.role.id}, data, success, error);
            return deferred.promise;
        };
    }]
);
