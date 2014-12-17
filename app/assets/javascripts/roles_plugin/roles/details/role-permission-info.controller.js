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
 * @name  RolesPlugin.roles.controller:RolePermissionInfoController
 *
 * @requires $scope
 * @requires $q
 * @requires gettext
 * @requires Role
 *
 * @description
 *   Provides the functionality for the role details action pane.
 */
angular.module('RolesPlugin.roles').controller('RolePermissionInfoController',
    ['$scope', '$location', '$q', 'gettext', 'Role', 'Filter',
    function ($scope, $location, $q, gettext, Role, Filter) {

        $scope.successMessages = [];
        $scope.errorMessages = [];

        $scope.panel = $scope.panel || {loading: false};

        // TODO: Is there a way to get the full role passed in on $stateParams?
        //       See role-permissions.html for call
        // TODO: panel.loading below is not checking for _both_ role and filter
        $scope.role = $scope.role || Role.get({id: $scope.$stateParams.roleId}, function () {
            $scope.panel.loading = false;
        });
        $scope.filter = $scope.filter || Filter.get({id: $scope.$stateParams.filterId}, function () {
            $scope.panel.loading = false;
        });

        $scope.save = function (filter) {
            var deferred = $q.defer();

            filter.$update(function (response) {
                deferred.resolve(response);
                $scope.successMessages.push(gettext('Filter Saved'));
            }, function (response) {
                deferred.reject(response);
                angular.forEach(response.data.errors, function (errorMessage) {
                    $scope.errorMessages.push(gettext("An error occurred saving the Filter: ") + errorMessage);
                });
            });

            return deferred.promise;
        };
    }]
);
