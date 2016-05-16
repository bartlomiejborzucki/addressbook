import angular from 'angular';
import 'angular-material';
import 'angular-ui-router';
import 'angular-local-storage';
import 'angular-messages';
import list from './list';
import contact from './contact';
import storage from './storage';
import commons from './commons';

const ngModule = angular.module('addressbook', ['ngMaterial', 'ui.router', 'LocalStorageModule', 'ngMessages']);

require('angular-material/angular-material.css');

commons(ngModule);
list(ngModule);
contact(ngModule);
storage(ngModule);

ngModule.config(function ($stateProvider, $urlRouterProvider, $locationProvider, localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix('addressbook');
    $locationProvider.html5Mode(true).hashPrefix('!');
    $urlRouterProvider.otherwise(function ($injector) {
        var $state = $injector.get('$state');
        $state.go('addressbookList');
    });
    $stateProvider
        .state('adddressbookList', {
            url: "/",
            views: {
                'main': {
                    template: require("./list/templates/list.html"),
                    controller: 'ListCtrl as ctrl'
                }
            }
        })
});