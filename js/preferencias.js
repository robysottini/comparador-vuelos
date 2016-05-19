/**
 * Módulo Preferencias con directiva personalizada.
 *

 * @author Roberto Sottini <robysottini@gmail.com>
 * @version 1.0
 */

myApp.directive('preferencias', function() {
    return {
        restrict: 'E', // Creo el nuevo elemento (E: Element) con nombre "preferencias".
        templateUrl: 'preferencias.html',
        controller: function($scope) {
            $scope.today = function() {
                $scope.dt = new Date();
            };
            $scope.today();

            $scope.clear = function () {
                $scope.dt = null;
            };

            // Disable weekend selection
            $scope.disabled = function(date, mode) {
                return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
            };

            $scope.toggleMin = function() {
                $scope.minDate = $scope.minDate ? null : new Date();
            };
            $scope.toggleMin();

            $scope.openFechaPartida = function($event) {
                $event.preventDefault();
                $event.stopPropagation();

                $scope.openedFechaPartida = true;
            };

            $scope.openFechaRegreso = function($event) {
                $event.preventDefault();
                $event.stopPropagation();

                $scope.openedFechaRegreso = true;
            };

            $scope.dateOptions = {
                formatYear: 'yy',
                startingDay: 1
            };

            $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
            $scope.format = $scope.formats[0];

            var tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            var afterTomorrow = new Date();
            afterTomorrow.setDate(tomorrow.getDate() + 2);
            $scope.events =
            [
            {
             date: tomorrow,
             status: 'full'
            },
            {
             date: afterTomorrow,
             status: 'partially'
            }
            ];

            $scope.getDayClass = function(date, mode) {
                if (mode === 'day') {
                    var dayToCheck = new Date(date).setHours(0,0,0,0);

                    for (var i=0;i<$scope.events.length;i++){
                        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

                        if (dayToCheck === currentDay) {
                            return $scope.events[i].status;
                        }
                    }
                }

                return '';
            };
        },
        controllerAs: 'DatepickerDemoController'
    };
});