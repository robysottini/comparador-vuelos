/**
 * Funciones requeridas por index.html.
 *
 * @author Roberto Sottini <robysottini@gmail.com>
 * @version 4.0
 */

var myApp = angular.module('mainApp', ['ngAnimate', 'ui.bootstrap', 'uiGmapgoogle-maps']);

myApp.controller('MainController', function($scope, $filter, $http, uiGmapGoogleMapApi) {

    $scope.ciudades = [];
    $scope.agencias = [];
    $scope.adultos = [];
    $scope.flexibilidades = [];
    $scope.flexibilidadPartida = [];
    $scope.flexibilidadRegreso = [];
    $scope.monedas = [];

    /**
     * Carga la fecha actual a los datepickers fechaPartida y fechaRegreso.
     * Ejemplo para hardcodear con una fecha específica: 
     * $scope.fechaPartida = new Date(2015, 07, 09);
     */
    $scope.fechaPartida = new Date();
    $scope.fechaRegreso = new Date();
    $scope.soloIda = false;

    $http.get('ciudades.json')
        .success(function(response) {
            $scope.ciudades = response;
        }).
        error(function(data, status, headers, config) {
            console.log('Error en main.js. Status: ' + status + '.');
    });
    $http.get('adultos.json')
        .success(function(response) {
            $scope.adultos = response;
        }).
        error(function(data, status, headers, config) {
            console.log('Error en main.js. Status: ' + status + '.');
    });
    $http.get('flexibilidades.json')
        .success(function(response) {
            $scope.flexibilidades = response;
        }).
        error(function(data, status, headers, config) {
            console.log('Error en main.js. Status: ' + status + '.');
    });
    $http.get('monedas.json')
        .success(function(response) {
            $scope.monedas = response;
        }).
        error(function(data, status, headers, config) {
            console.log('Error en main.js. Status: ' + status + '.');
    });
    $http.get('agencias.json')
        .success(function(response) {
            $scope.agencias = response;
        }).
        error(function(data, status, headers, config) {
            console.log('Error en main.js. Status: ' + status + '.');
    });

    /*
     * Hardcodear selección de ciudades de orígen o destino.
     * Ejemplo: 
     * $scope.ciudades[0].origen = true;
     * $scope.ciudades[12].destino = true;
     */
    /*
    /*
    $scope.$watchCollection('ciudades', function(newNames, oldNames) {
        if (newNames.length > 0) {
            $scope.ciudades[0].origen = true;
            $scope.ciudades[12].destino = true;
        }
    });
    */
    $scope.$watchCollection('adultos', function(newNames, oldNames) {
        if (newNames.length > 0) {
            $scope.adulto = $scope.adultos[0];
        }
    });
    $scope.$watchCollection('flexibilidades', function(newNames, oldNames) {
        if (newNames.length > 0) {
            $scope.flexibilidad = $scope.flexibilidades[0];
            $scope.flexibilidadPartida = $scope.flexibilidades[5];
            $scope.flexibilidadRegreso = $scope.flexibilidades[5];
        }
    });
    $scope.$watchCollection('monedas', function(newNames, oldNames) {
        if (newNames.length > 0) {
            $scope.moneda = $scope.monedas[0];
        }
    });


    $scope.errorOrigen = true;
    $scope.errorDestino = true;
    $scope.errorPartida = true;
    $scope.errorRegreso = true;

    $scope.erroresEncontrados = [];
    $scope.hayError = false;

    /**
     * Verifica que el usuario haya seleccionado al menos un origen y un destino. Si se produce un error,
     * se muestra el alerta.
     * 
     * @author Roberto Sottini <robysottini@gmail.com>
     * @version 1.0
     */
    /*function validarFormulario() {
        var mensajeError = '';
        
        angular.forEach($scope.ciudades, function(ciudad, key) {
            console.log('Nombre: ' + ciudad.nombre + ' ' + ciudad.origen);
            if (ciudad.origen) {
                $scope.errorOrigen = false;
            }
            if (ciudad.destino) {
                $scope.errorDestino = false;
            }
        });
        if ($scope.errorOrigen === true) {
            $scope.erroresEncontrados.push('origen');
        }
        if ($scope.errorDestino === true) {
            $scope.erroresEncontrados.push('destino');
        }

        if (!$scope.fechaPartida == '') {
            $scope.erroresEncontrados.push('fecha de partida');
        }

        if (!$scope.soloIda) {
            if (!$scope.fechaRegreso == '') {
                $scope.erroresEncontrados.push('fecha de regreso');
            }
        }

        var mensajeError = '';

        if ($scope.erroresEncontrados.length > 0) {
            mensajeError = 'Complete ';
            angular.forEach($scope.erroresEncontrados, function(error, key) {
                if (error.valor === true) {
                    mensajeError += error.nombre
                }
            });


            if (errores.length > 0) {
            mensajeError = 'Complete ' + errores[0];
            if (errores.length > 1) { // 2 errores o más.
                var i = 2;
                for (i; i <= errores.length - 1; i++) {
                    if (i === errores.length - 1) {
                        mensajeError += ', ';
                    } else {
                        mensajeError += ', ';
                    }
                    mensajeError += errores[i - 1];
                }
                mensajeError += ' y ' + errores[i - 1];
            }
            mensajeError += '.';
            document.getElementById('alerta').className = 'navbar navbar-fixed-top';
            document.getElementById('mensajeError').innerHTML = mensajeError;
        }
        }



        if (document.getElementById('soloIda').checked === false && document.getElementById('fechaRegreso').value === '') {
            errores.push('regreso');
            document.getElementById('fechaRegresoFormGroup').className = 'form-group has-error has-feedback';
            document.getElementById('fechaRegresoSpan').className = 'glyphicon glyphicon-remove form-control-feedback';
        } else {
            document.getElementById('fechaRegresoFormGroup').className = 'form-group';
            document.getElementById('fechaRegresoSpan').className = '';
        }
        if (errores.length > 0) {
            mensajeError = 'Complete ' + errores[0];
            if (errores.length > 1) { // 2 errores o más.
                var i = 2;
                for (i; i <= errores.length - 1; i++) {
                    if (i === errores.length - 1) {
                        mensajeError += ', ';
                    } else {
                        mensajeError += ', ';
                    }
                    mensajeError += errores[i - 1];
                }
                mensajeError += ' y ' + errores[i - 1];
            }
            mensajeError += '.';
            document.getElementById('alerta').className = 'navbar navbar-fixed-top';
            document.getElementById('mensajeError').innerHTML = mensajeError;
        }
    }*/

    /*
     * Cierra el alerta cambiando las clases del elemento.
     *
     * @author Roberto Sottini <robysottini@gmail.com>
     * @version 1.0
     */
    function cerrarAlerta() {
        document.getElementById('alerta').className = 'navbar navbar-fixed-top hidden';
    }

});

/*
myApp.config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        //    key: 'your api key',
        v: '3.17',
        libraries: 'weather,geometry,visualization'
    });
})
*/