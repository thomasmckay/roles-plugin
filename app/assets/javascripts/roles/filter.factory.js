/**
 * Copyright 2013-2014 Red Hat, Inc.

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
 * @ngdoc factory
 * @name  Roles.roles.factory:Filter
 *
 * @requires $resource
 *
 * @description
 *   Provides a $resource for activation keys.
 */
angular.module('Roles.roles').factory('Filter',
    ['BastionResource', function (BastionResource) {
        return BastionResource('/../api/v2/filters/:id/:action/:action2', {id: '@id'}, {
            users: {method: 'GET'}
        });
    }]
);
