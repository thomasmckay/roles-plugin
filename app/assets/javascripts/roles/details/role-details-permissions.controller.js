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
 */

/**
 * @ngdoc object
 * @name  Roles.roles.controller:RoleDetailsPermissionsController
 *
 * @requires $scope
 * @requires $q
 * @requires gettext
 * @requires Role
 *
 * @description
 *   Provides the functionality for the role details action pane.
 */
angular.module('Roles.roles').controller('RoleDetailsPermissionsController',
    ['$scope', '$location', '$q', '$filter', 'gettext', 'Nutupane', 'Role',
    function ($scope, $location, $q, $filter, gettext, Nutupane, Role) {

        var params = {
            'id':               $scope.$stateParams.roleId,
        };

        var nutupane = new Nutupane(Role, params, 'permissions');
        $scope.permissionsTable = nutupane.table;
        $scope.permissionsTable.refresh = nutupane.refresh;
        $scope.removeRow = nutupane.removeRow;

        $scope.successMessages = [];
        $scope.errorMessages = [];

        $scope.panel = $scope.panel || {loading: false};

        $scope.role = $scope.role || Role.get({id: $scope.$stateParams.roleId}, function () {
            $scope.panel.loading = false;
        });

        $scope.save = function (role) {
            var deferred = $q.defer();

            role.$update(function (response) {
                deferred.resolve(response);
                $scope.successMessages.push(gettext('Role Saved'));
            }, function (response) {
                deferred.reject(response);
                angular.forEach(response.data.errors, function (errorMessage) {
                    $scope.errorMessages.push(gettext("An error occurred saving the Role: ") + errorMessage);
                });
            });

            return deferred.promise;
        };

        $scope.formatPermissionsList = function (permissions) {
            var fullNames;
            fullNames = _.map(permissions, function (permission) {
                return $filter('permissionName')(permission);
            });

            return fullNames.join(', ');
        };
    }]
);
