
angular.module('Roles.roles').filter('permissionName',
    ['translate',
    function (translate) {
        return function (permission) {
            switch (permission.name) {
            case 'destroy_smart_proxies_autosign':
                name = 'DESTROY AUTOSIGN';
            default:
                name = permission.name.split('_')[0].toUpperCase();
            }
            return translate(name);
        };
    }]
);
