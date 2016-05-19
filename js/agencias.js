/**
 * Módulo Agencias con directiva personalizada.
 *
 *
 * @author Roberto Sottini <robysottini@gmail.com>
 * @version 1.0
 */

myApp.directive('agencias', function() {
    return {
    	restrict: 'E', // Creo el nuevo elemento (E: Element) con nombre "agencias".
    	templateUrl: 'agencias.html',
    	controller: function($scope) {
        	$scope.isCollapsed = true;
    	},
    	controllerAs: 'CollapseDemoController'
    };
});