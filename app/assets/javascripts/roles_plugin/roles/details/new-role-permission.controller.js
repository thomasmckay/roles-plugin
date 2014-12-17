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
 * @name  RolesPlugin.roles.controller:NewRolePermissionController
 *
 * @requires $scope
 * @requires $q
 * @requires FormUtils
 * @requires Role
 * @requires Organization
 * @requires CurrentOrganization
 *
 * @description
 *   Controls the creation of an empty Role object for use by sub-controllers.
 */

angular.module('RolesPlugin.roles').controller('NewRolePermissionController',
    ['$scope', '$q', '$filter', 'FormUtils', 'Role', 'Filter', 'Organization', 'CurrentOrganization',
    function ($scope, $q, $filter, FormUtils, Role, Filter, Organization, CurrentOrganization) {

        $scope.permission = new Filter();
        $scope.permission.permission_ids = [];
        $scope.role = $scope.role || new Role();
        $scope.panel = {loading: false};
        $scope.organization = CurrentOrganization;

        $scope.role.$promise.then(function () {
            Role.availablePermissions({id: $scope.role.id}, function (response) {
                $scope.resourceTypes = response;
            });
        });

        $scope.$watch('permission.resource_type', function (resourceTypeId) {
            var resourceType;
            if (resourceTypeId && $scope.resourceTypes) {
                $scope.permission.permission_ids = [];  // reset any previous permission filters
                resourceType = _.where($scope.resourceTypes, {id: resourceTypeId});
                if (resourceType.length === 0) {
                    $scope.permissionTypes = [];
                } else {
                    $scope.permissionTypes = resourceType[0].permissions;
                }
            }
        });

        $scope.toggleSelection = function (permissionId) {
            var idx = $scope.permission.permission_ids.indexOf(permissionId);

            if (idx > -1) {
                $scope.permission.permission_ids.splice(idx, 1);
            } else {
                $scope.permission.permission_ids.push(permissionId);
            }
        };

        $scope.save = function (permission) {
            $scope.permission.role_id = $scope.role.id;
            $scope.permission.unlimited = true;
            permission.$save(success, error);
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
