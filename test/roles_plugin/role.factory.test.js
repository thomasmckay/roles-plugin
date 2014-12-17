/**
 Copyright 2014 Red Hat, Inc.

 This software is licensed to you under the GNU General Public
 License as published by the Free Software Foundation; either version
 2 of the License (GPLv2) or (at your option) any later version.
 There is NO WARRANTY for this software, express or implied,
 including the implied warranties of MERCHANTABILITY,
 NON-INFRINGEMENT, or FITNESS FOR A PARTICULAR PURPOSE. You should
 have received a copy of GPLv2 along with this software; if not, see
 http://www.gnu.org/licenses/old-licenses/gpl-2.0.txt.
 **/

describe('Factory: Role', function() {

    beforeEach(module('Role.roles'));

    beforeEach(function() {
        roles = {
            "total":1,
            "subtotal":1,
            "page":"1",
            "per_page":20,
            "search":"",
            "sort":{"by":"name","order":"ASC"},
            "results":[
                {"id":1,"name":"role"}
                ]};
        });

    beforeEach(inject(function($injector) {
        $httpBackend = $injector.get('$httpBackend');
        Role = $injector.get('Role');
    }));

    afterEach(function() {
        $httpBackend.flush();
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('Role.get GET /api/v2/roles/1?fields=full', function() {
        $httpBackend.expectGET('/api/v2/roles/1?fields=full').respond(roles.results[0]);

        ActivationKey.get({id: 1}, function(response) {
            expect(response.id).toBe(roles.results[0].id);
        });
    });

});
