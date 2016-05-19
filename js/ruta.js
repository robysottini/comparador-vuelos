/**
 * Módulo Ruta con directiva personalizada.
 *
 * @author Roberto Sottini <robysottini@gmail.com>
 * @version 1.0
 */

myApp.directive('ruta', function() {
    return {
        restrict: 'E', // Creo el nuevo elemento (E: Element) con nombre "ruta".
        templateUrl: 'ruta.html',
        controller: function($scope, $http, uiGmapGoogleMapApi) {

            // Características del mapa.
            $scope.mapa = {
                centro: {
                    latitude: 0,
                    longitude: -30
                },
                zoom: 2,
                opciones: {
                    draggable: false,
                    scrollwheel: false
                }
            };

            // Array de marcadores de origen y marcadores de destino.
            $scope.marcadoresOrigen = [];
            $scope.marcadoresDestino = [];

            // Características de los marcadores de destino.
            /*$scope.marcadorDestino = {
                id: '',
                opciones: {
                    draggable: false,
                    animation: 2, // 1: BOUNCE, 2: DROP,
                    title: '',
                    icon : 'img/icono_destino.png'
                }
            };*/

            function observarOrigen(ciudad, key) {
                $scope.$watch(function() {
                    return ciudad.origen;
                }, function(newValue, oldValue) {
                    if (newValue) {
                        //console.log('Agregando: ' + ciudad.nombre);
                        $scope.marcadorOrigen = {
                            id: ciudad.nombre,
                            title: 'marcadorOrigen' + key,
                            latitude: ciudad.latitude,
                            longitude: ciudad.longitude,
                            animation: 1 // 1: BOUNCE, 2: DROP
                        };
                        $scope.marcadoresOrigen.push($scope.marcadorOrigen);
                        //console.log('Marcador: ' + $scope.marcadorOrigen.id);
                        //console.log('Cantidad de marcadoresOrigen: ' + $scope.marcadoresOrigen.length + '\n------------------\n');
                    }
                    else if (oldValue) {
                        //console.log('Borrando: ' + ciudad.nombre);
                        //console.log('' + $scope.marcadoresOrigen[1].id);
                        var posicion = $scope.marcadoresOrigen.map(function(e) { return e.id; }).indexOf(ciudad.nombre);
                        //console.log('posicion a borrar: ' + posicion);
                        $scope.marcadoresOrigen.splice(posicion, 1);
                        //console.log('CantidadSplice: ' + $scope.marcadoresOrigen.length + '\n------------------\n');
                    }
                });
            }

            function observarDestino(ciudad, key) {
                $scope.$watch(function() {
                    return ciudad.destino;
                }, function(newValue, oldValue) {
                    if (newValue) {
                        //console.log('Agregando: ' + ciudad.nombre);
                        $scope.marcadorDestino = {
                            id: ciudad.nombre,
                            title: 'marcadorDestino' + key,
                            latitude: ciudad.latitude,
                            longitude: ciudad.longitude,
                            icon: 'img/icono_destino.png'
                        };
                        $scope.marcadoresDestino.push($scope.marcadorDestino);
                        //console.log('Marcador: ' + $scope.marcadorDestino.id);
                        //console.log('Cantidad de marcadoresDestino: ' + $scope.marcadoresDestino.length + '\n------------------\n');
                    }
                    else if (oldValue) {
                        //console.log('Borrando: ' + ciudad.nombre);
                        //console.log('' + $scope.marcadoresDestino[1].id);
                        var posicion = $scope.marcadoresDestino.map(function(e) { return e.id; }).indexOf(ciudad.nombre);
                        //console.log('posicion a borrar: ' + posicion);
                        $scope.marcadoresDestino.splice(posicion, 1);
                        //console.log('CantidadSplice: ' + $scope.marcadoresDestino.length + '\n------------------\n');
                    }
                });
            }

            $scope.$watchCollection('ciudades', function(newNames, oldNames) {
                //console.log("El tamaño de la colección es: " + newNames.length);
                if (newNames.length > 0) {
                    angular.forEach($scope.ciudades, function(ciudad, key) {    
                        observarOrigen(ciudad, key);
                        observarDestino(ciudad, key);
                    });
                }
            });
        }
    };
});