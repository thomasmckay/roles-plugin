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
 * @name  RolesPlugin.roles.controller:RolesBulkActionController
 *
 * @requires $scope
 * @requires $q
 * @requires $location
 * @requires gettext
 * @requires Role
 * @requires CurrentOrganization
 *
 * @description
 *   A controller for providing bulk action functionality to the roles page.
 */
angular.module('RolesPlugin.roles').controller('RolesBulkActionController',
    ['$scope', '$q', '$location', 'gettext', 'Role', 'CurrentOrganization',
    function ($scope, $q, $location, gettext, Role, CurrentOrganization) {
        $scope.successMessages = [];
        $scope.errorMessages = [];

        $scope.removeRoles = {
            confirm: false,
            workingMode: false
        };

        $scope.state = {
            successMessages: [],
            errorMessages: [],
            working: false
        };

        $scope.setState = function (working, success, errors) {
            $scope.state.working = working;
            $scope.state.successMessages = success;
            $scope.state.errorMessages = errors;
        };

        $scope.actionParams = {
            ids: []
        };

        $scope.performRemoveRoles = function () {
            var params, success, error, deferred = $q.defer();

            $scope.removeRoles.confirm = false;
            $scope.state.working = true;

            params = $scope.nutupane.getAllSelectedResults();

            success = function (data) {
                deferred.resolve(data);
                angular.forEach($scope.roleTable.getSelected(), function (row) {
                    $scope.removeRow(row.id);

                });
                $scope.setState(false, data.displayMessages, []);
            };

            error = function (error) {
                deferred.reject(error.data["errors"]);
                $scope.setState(false, [], error.data["errors"]);
            };

            RoleBulkAction.removeRoles(params, success, error);

            return deferred.promise;
        };

    }]
);
