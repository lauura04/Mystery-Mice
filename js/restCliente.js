$(document).ready(function() {
    console.log("Cliente REST inicializado");

    function obtenerVidas(jugador, callback){
        $.ajax({
            //url:
            method: "GET",
            success: function(data){
                console.log(`Vidas obtenidas para ${jugador}`, data.vidas);
                
            }
        })
    }
})