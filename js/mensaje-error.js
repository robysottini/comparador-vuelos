/**
 * Módulo Mensaje de Error con directiva personalizada.
 *
 * @author Roberto Sottini <robysottini@gmail.com>
 * @version 1.0
 */

myApp.directive('mensajeError', function() {
    return {
    	restrict: 'E', // Creo el nuevo elemento (E: Element) con nombre "mensaje-error".
    	templateUrl: 'mensaje-error.html'
    };
});