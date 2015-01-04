'use strict';

angular.module('jquerySlotmachine', [])

.directive('diwSlotmachine', function ($parse) {
  return {
    restrict: 'E',
    transclude: false,
    scope: {
      source: '=source',
      displayProperty: '=',
      noSelection: '@'
    },
    template: '<select ng-model="selected" ng-options="entry as accessor(entry) for entry in source"><option value="" disabled>{{ noSelection }}</option></select>',
    link: function (scope, element, attrs) {
      scope.accessor = scope.displayProperty ? $parse(scope.displayProperty) : function (value) {
        return value;
      };
      
      scope.noSelection = scope.noSelection || 'Nog geen selectie';
      
      scope.$on('slotmachine:shuffle', function() {
        scope.selected = _.sample(scope.source);
      });
    }
  };
});