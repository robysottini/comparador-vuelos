/**
 * Módulo Abrir Pestañas con directiva personalizada.
 *
 * @author Roberto Sottini <robysottini@gmail.com>
 * @version 1.0
 */

myApp.directive('abrirPestanas', function() {
    return {
        restrict: 'E', // Creo el nuevo elemento (E: Element) con nombre "abrir-pestanas".
        templateUrl: 'abrir-pestanas.html',
        controller: function($scope, $filter) {
            
            /**
             * Abre pestañas con las opciones seleccionas por el usuario.
             *
             * @author Roberto Sottini <robysottini@gmail.com>
             * @version 2.0
             */
            $scope.abrirPestanas = function() {
                var fechaPartida;
                var fechaRegreso = '';
                var viaje;
                var url;
                var urlPrincipio;
                var adulto;
                var ciudadOrigen;
                var ciudadDestino;
                var viajeDestinoOrigenRegreso;
                var moneda;

                //validarFormulario();

                // Despegar
                if ($scope.agencias[0].valor) {
                    urlPrincipio = 'http://www.despegar.com.ar/shop/flights/results';
                    fechaPartida = '/' + $filter('date')($scope.fechaPartida,'yyyy-MM-dd');
                    adulto = '/' + $scope.adulto.valor;
                    if (!$scope.soloIda) {
                        fechaRegreso = '/' + $filter('date')($scope.fechaRegreso,'yyyy-MM-dd');
                        viaje = '/roundtrip';
                    }
                    else {
                        viaje = '/oneway';
                    }
                    angular.forEach($scope.ciudades, function(ciudadOrigen, keyOrigen) {
                        if (ciudadOrigen.origen) {
                            ciudadOrigen = '/' + ciudadOrigen.codigo;
                            angular.forEach($scope.ciudades, function(ciudadDestino, keyDestino) {
                                if (ciudadDestino.destino) {
                                    ciudadDestino = '/' + ciudadDestino.codigo;
                                    url = urlPrincipio + viaje + ciudadOrigen + ciudadDestino + fechaPartida + fechaRegreso + adulto + '/0/0';
                                    window.open(url);
                                }
                            });
                        }
                    });
                }

                // Kayak
                if ($scope.agencias[1].valor) {
                    flexibilidadPartida = $scope.flexibilidadPartida.valor;
                    urlPrincipio = 'http://www.kayak.com.ar/flights';
                    fechaPartida = '/' + $filter('date')($scope.fechaPartida,'yyyy-MM-dd');
                    adulto = '/' + $scope.adulto.valor + 'adults';
                    if (!$scope.soloIda) {
                        fechaRegreso = '/' + $filter('date')($scope.fechaRegreso,'yyyy-MM-dd');
                        flexibilidadRegreso = $scope.flexibilidadRegreso.valor;
                    } else {
                        flexibilidadRegreso = '';
                    }
                    angular.forEach($scope.ciudades, function(ciudadOrigen, keyOrigen) {
                        if (ciudadOrigen.origen) {
                            ciudadOrigen = '/' + ciudadOrigen.codigo;
                            angular.forEach($scope.ciudades, function(ciudadDestino, keyDestino) {
                                if (ciudadDestino.destino) {
                                    ciudadDestino = '-' + ciudadDestino.codigo;
                                    url = urlPrincipio + ciudadOrigen + ',nearby' + ciudadDestino + ',nearby' + fechaPartida + flexibilidadPartida + fechaRegreso + flexibilidadRegreso + adulto;
                                    console.log(url);
                                    window.open(url);
                                }
                            });
                        }
                    });
                }

                // Momondo
                if ($scope.agencias[2].valor) {
                    urlConstante1 = 'http://www.momondo.es/flightsearch/?Search=true';
                    urlConstante2 = '&TK=ECO&DO=false&NA=true#Search=true';
                    urlConstante3 = '&TK=ECO&DO=false&NA=true';
                    fechaPartida = $filter('date')($scope.fechaPartida,'dd-MM-yyyy');
                    adulto = '&AD=' + $scope.adulto.valor;
                    if (!$scope.soloIda) {
                        fechaRegreso = $filter('date')($scope.fechaRegreso,'dd-MM-yyyy');
                        viaje = '&TripType=1&SegNo=1';
                        angular.forEach($scope.ciudades, function(ciudadOrigen, keyOrigen) {
                            if (ciudadOrigen.origen) {
                                ciudadOrigen = ciudadOrigen.codigo;
                                angular.forEach($scope.ciudades, function(ciudadDestino, keyDestino) {
                                    if (ciudadDestino.destino) {
                                        ciudadDestino = ciudadDestino.codigo;
                                        viajeDestinoOrigenRegreso = '&SO1=' + ciudadDestino + '&SD1=' + ciudadOrigen + '&SDP1=' + fechaRegreso;
                                        url = urlConstante1 + viaje + '&SO0=' + ciudadOrigen + '&SD0=' + ciudadDestino + '&SDP0=' + fechaPartida + viajeDestinoOrigenRegreso + adulto + urlConstante2 + viaje + '&SO0=' + ciudadOrigen + '&SD0=' + ciudadDestino + '&SDP0=' + fechaPartida + viajeDestinoOrigenRegreso + adulto + urlConstante3;
                                        console.log(url);
                                        window.open(url);
                                    }
                                });
                            }
                        });
                    } else {
                        viaje = '&TripType=2&SegNo=2';
                        viajeDestinoOrigenRegreso = '';
                        angular.forEach($scope.ciudades, function(ciudadOrigen, keyOrigen) {
                            if (ciudadOrigen.origen) {
                                ciudadOrigen = ciudadOrigen.codigo;
                                angular.forEach($scope.ciudades, function(ciudadDestino, keyDestino) {
                                    if (ciudadDestino.destino) {
                                        ciudadDestino = ciudadDestino.codigo;
                                        url = urlConstante1 + viaje + '&SO0=' + ciudadOrigen + '&SD0=' + ciudadDestino + '&SDP0=' + fechaPartida + adulto + urlConstante2 + viaje + '&SO0=' + ciudadOrigen + '&SD0=' + ciudadDestino + '&SDP0=' + fechaPartida + adulto + urlConstante3;
                                        console.log(url);
                                        window.open(url);
                                    }
                                });
                            }
                        });
                    }
                }

                // Skyscanner
                if ($scope.agencias[3].valor) {
                    urlConstante1 = 'http://www.skyscanner.com/transporte/vuelos';
                    urlConstante2 = '&children=0&infants=0&cabinclass=economy&rtn=1&preferdirects=false&outboundaltsenabled=false&inboundaltsenabled=false';
                    fechaPartida = '/' + $filter('date')($scope.fechaPartida,'yyyyMMdd');
                    adulto = '?adults=' + $scope.adulto.valor;
                    moneda = '&currency=' + $scope.moneda.valor;
                    if (!$scope.soloIda) {
                        fechaRegreso = '/' + $filter('date')($scope.fechaRegreso,'yyyyMMdd');
                    } else {
                        fechaRegreso = '';
                    }
                    angular.forEach($scope.ciudades, function(ciudadOrigen, keyOrigen) {
                        if (ciudadOrigen.origen) {
                            ciudadOrigen = '/' + ciudadOrigen.codigo;
                            angular.forEach($scope.ciudades, function(ciudadDestino, keyDestino) {
                                if (ciudadDestino.destino) {
                                    ciudadDestino = '/' + ciudadDestino.codigo;
                                    url = urlConstante1 + ciudadOrigen + ciudadDestino + fechaPartida + fechaRegreso + adulto + urlConstante2 + moneda;
                                    console.log(url);
                                    window.open(url);
                                }
                            });
                        }
                    });
                }

                // Transatlántica
                if ($scope.agencias[4].valor) {
                    urlConstante1 = 'http://www.transatlantica.travel/buscar/aereos';
                    fechaPartida = '/' + $filter('date')($scope.fechaPartida,'yyyyMMdd');
                    adulto = '/' + $scope.adulto.valor;
                    moneda = '&currency=' + $scope.moneda.valor;
                    if (!$scope.soloIda) {
                        fechaRegreso = '-' + $filter('date')($scope.fechaRegreso,'yyyyMMdd');
                        viaje = '/RT';
                    } else {
                        fechaRegreso = '';
                        viaje = '/OW';
                    }
                    angular.forEach($scope.ciudades, function(ciudadOrigen, keyOrigen) {
                        if (ciudadOrigen.origen) {
                            ciudadOrigen = '/' + ciudadOrigen.codigoT;
                            angular.forEach($scope.ciudades, function(ciudadDestino, keyDestino) {
                                if (ciudadDestino.destino) {
                                    ciudadDestino = '/' + ciudadDestino.codigoT;
                                    url = urlConstante1 + viaje + ciudadOrigen + ciudadDestino + fechaPartida + fechaRegreso + adulto;
                                    console.log(url);
                                    window.open(url);
                                }
                            });
                        }
                    });
                }

                // LAN Argentina
                if ($scope.agencias[5].valor) {
                    urlConstante1 = 'http://booking.lan.com/es_ar/apps/personas/compra?';
                    fechaPartida = '&vuelos_fecha_salida_ddmmaaaa=' + $filter('date')($scope.fechaPartida,'dd/MM/yyyy');
                    urlConstante2 = 'fecha1_dia=' + $filter('date')($scope.fechaPartida,'dd') + '&fecha1_anomes=' + $filter('date')($scope.fechaPartida,'yyyy-MM') + '&fecha2_dia=' + $filter('date')($scope.fechaRegreso,'dd') + '&fecha2_anomes=' + $filter('date')($scope.fechaRegreso,'yyyy-MM');
                    urlConstante3 = '&otras_ciudades=&num_segmentos_interfaz=2&tipo_paso1=caja&rand_check=4363.291100598872';
                    urlConstante4 = '&auAvailability=1';
                    flexibilidad = '&flex=1';
                    cabina = '&cabina=Y';
                    adulto = '&nadults=' + $scope.adulto.valor;
                    menor = '&nchildren=0';
                    infante = '&ninfants=0';
                    if (!$scope.soloIda) {
                        fechaRegreso = '&vuelos_fecha_regreso_ddmmaaaa=' + $filter('date')($scope.fechaRegreso,'dd/MM/yyyy');
                        viaje = '&ida_vuelta=ida_vuelta';
                    } else {
                        fechaRegreso = '';
                        viaje = '&ida_vuelta=ida';
                    }
                    angular.forEach($scope.ciudades, function(ciudadOrigen, keyOrigen) {
                        if (ciudadOrigen.origen) {
                            ciudadOrigenNombre = '&to_city2=' + ciudadOrigen.codigo;
                            vueloOrigen = '&vuelos_origen=' + ciudadOrigen.nombre + ', ' + ciudadOrigen.pais + ' (' + ciudadOrigen.codigo + ')';
                            fromCity1 = '&from_city1=' + ciudadOrigen.codigo;
                            angular.forEach($scope.ciudades, function(ciudadDestino, keyDestino) {
                                if (ciudadDestino.destino) {
                                    ciudadDestinoHasta = '&from_city2=' + ciudadDestino.codigo;
                                    vueloDestino = '&vuelos_destino=' + ciudadDestino.nombre + ', ' + ciudadDestino.pais + ' (' + ciudadDestino.codigo + ')';
                                    toCity1 = '&to_city1=' + ciudadDestino.codigo;                            
                                    url = urlConstante1 + urlConstante2 + urlConstante3 + ciudadDestinoHasta + ciudadOrigenNombre + urlConstante4 + viaje + vueloOrigen + fromCity1 + vueloDestino + toCity1 + flexibilidad + fechaPartida + fechaRegreso + cabina + adulto + menor + infante;
                                    window.open(url);
                                    console.log(url);
                                }
                            });
                        }
                    });
                }
            }
        }
    };
});