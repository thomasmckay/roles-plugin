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
 * @name  RolesPlugin.roles.controller:RoleLocationsController
 *
 * @requires $scope
 * @requires $q
 * @requires $location
 * @requires gettext
 * @requires Role
 * @requires Nutupane
 *
 * @description
 *   Provides the functionality for the list locations details action pane.
 */
angular.module('RolesPlugin.roles').controller('RoleLocationsController',
    ['$scope', '$q', '$location', 'gettext', 'Role', 'Location', 'Nutupane',
    function ($scope, $q, $location, gettext, Role, Location, Nutupane) {
        var locationsPane, params;

        $scope.successMessages = [];
        $scope.errorMessages = [];

        params = {
            'id':          $scope.$stateParams.roleId,
            'search':      $location.search().search || "", // TODO: is this correct?
            'sort_by':     'name',
            'sort_order':  'ASC',
            'paged':       true
        };

        locationsPane = new Nutupane(Role, params, 'locations');
        $scope.locationsTable = locationsPane.table;
        // TODO: inifinite loop as the list just increments page number
        locationsPane.searchTransform = function () {
            return "\"\""
        };

        $scope.removeLocations = function () {
            var data,
                success,
                error,
                deferred = $q.defer(),
                locations = _.pluck($scope.role.locations, 'id'),
                locationsToRemove = _.pluck($scope.locationsTable.getSelected(), 'id');

            data = {
                role: {
                    "location_ids": _.difference(locations, locationsToRemove)
                }
            };

            success = function (data) {
                $scope.successMessages = [gettext('Removed %x locations from role "%y".')
                    .replace('%x', $scope.locationsTable.numSelected).replace('%y', $scope.role.name)];
                $scope.locationsTable.working = false;
                $scope.locationsTable.selectAll(false);
                locationsPane.refresh();
                $scope.role.$get();
                deferred.resolve(data);
            };

            error = function (error) {
                deferred.reject(error.data.errors);
                $scope.errorMessages = error.data.errors;
                $scope.locationsTable.working = false;
            };

            $scope.locationsTable.working = true;
            Role.removeLocations({id: $scope.role.id}, data, success, error);
            return deferred.promise;
        };
    }]
);
