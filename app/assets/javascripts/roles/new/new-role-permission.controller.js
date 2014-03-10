/**
 * Copyright 2013-2014 Red Hat, Inc.
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
 * @name  Roles.roles.controller:NewRolePermissionController
 *
 * @requires $scope
 * @requires $q
 * @requires FormUtils
 * @requires Role
 * @requires Organization
 * @requires CurrentOrganization
 * @requires ContentView
 *
 * @description
 *   Controls the creation of an empty Role object for use by sub-controllers.
 */
angular.module('Roles.roles').controller('NewRolePermissionController',
    ['$scope', '$q', 'FormUtils', 'Role', 'Organization', 'CurrentOrganization', 'ContentView',
    function ($scope, $q, FormUtils, Role, Organization, CurrentOrganization, ContentView) {

        $scope.role = $scope.role || new Role();
        $scope.panel = {loading: false};
        $scope.organization = CurrentOrganization;

        $scope.$watch('role.name', function () {
            if ($scope.roleForm.name) {
                $scope.roleForm.name.$setValidity('server', true);
            }
        });

        $scope.save = function (role) {
            role.$save(success, error);
        };

        function success(response) {
            $scope.table.addRow(response);
            $scope.transitionTo('roles.details.info', {roleId: $scope.role.id});
        }

        function error(response) {
            $scope.working = false;
            angular.forEach(response.data.errors, function (errors, field) {
                $scope.roleForm[field].$setValidity('server', false);
                $scope.roleForm[field].$error.messages = errors;
            });
        }

    }]
);
