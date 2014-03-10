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
 * @name  Roles.roles.controller:RoleAddUserGroupsController
 *
 * @requires $scope
 * @requires $q
 * @requires $location
 * @requires gettext
 * @requires Role
 * @requires Nutupane
 *
 * @description
 *   Provides the functionality for adding user groups to a role.
 */
angular.module('Roles.roles').controller('RoleAddUserGroupsController',
    ['$scope', '$q', '$location', 'gettext', 'Role', 'Nutupane',
    function ($scope, $q, $location, gettext, Role, Nutupane) {
        var userGroupsPane, params;

        $scope.successMessages = [];
        $scope.errorMessages = [];

        params = {
            'search':      $location.search().search || "",
            'sort_by':     'name',
            'sort_order':  'ASC',
            'paged':       true,
            'id':            $scope.$stateParams.roleId
        };

        userGroupsPane = new Nutupane(Role, params, 'availableUserGroups');
        $scope.userGroupsTable = userGroupsPane.table;

        $scope.addUserGroups = function () {
            var data,
                success,
                error,
                deferred = $q.defer(),
                userGroups = _.pluck($scope.role.userGroups, 'id'),
                userGroupsToAdd = _.pluck($scope.userGroupsTable.getSelected(), 'id');

            data = {
                role: {
                    "user_group_ids": _.union(userGroups, userGroupsToAdd)
                }
            };

            success = function (data) {
                $scope.successMessages = [gettext('Added %x user groups to role "%y".')
                    .replace('%x', $scope.userGroupsTable.numSelected).replace('%y', $scope.role.name)];
                $scope.userGroupsTable.working = false;
                $scope.userGroupsTable.selectAll(false);
                userGroupsPane.refresh();
                $scope.role.$get();
                deferred.resolve(data);
            };

            error = function (error) {
                deferred.reject(error.data.errors);
                $scope.errorMessages = error.data.errors['base'];
                $scope.userGroupsTable.working = false;
            };

            $scope.userGroupsTable.working = true;
            Role.saveUserGroups({id: $scope.role.id}, data, success, error);
            return deferred.promise;
        };
    }]
);
