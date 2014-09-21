'use strict';

//Global service for global variables
angular.module('mean.system').factory('Global', ['$log',

function($log) {
    var _this = this;
    _this._data = {
        user : window.user,
        authenticated : false,
        isAdmin : false,
        isCompetitorAdmin : false,
        isResultAdmin : false
    };
    if (window.user && window.user.roles) {
        $log.info('setting the Userroles in the window...: ');
        _this._data.authenticated = window.user.roles.length;
        _this._data.isAdmin = window.user.roles.indexOf('admin') !== -1;
        _this._data.isCompetitorAdmin = window.user.roles.indexOf('competitorAdmin') !== -1 || window.user.roles.indexOf('admin') !== -1;
        _this._data.isResultAdmin = window.user.roles.indexOf('resultAdmin') !== -1 || window.user.roles.indexOf('admin') !== -1;
    }
    return _this._data;
}]);
 