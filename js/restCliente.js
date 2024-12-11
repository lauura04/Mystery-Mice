$(document).ready(function() {
    console.log("Cliente REST inicializado");

    
    function obtenerJugador (playerKey, callback){
        $.ajax({
            url:`http://localhost:8080/jugadores/${playerKey}`,
            method: "GET",
            success:function(data){
                console.log(`Jugador obtenido: `, data);
                if(callback){
                    callback(data);
                }
            },
            error: function(xhr, status, error){
                console.error(`Error al obtener el jugador ${playerKey}`, error);
            }
        });
    }

    function crearJugador (playerKey, nombre, callback){
        $.ajax({
            url: 'http://localhost:8080/jugadores',
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                playerKey: playerKey,
                name: nombre
            }),
            success: function(data){
                console.log(`Jugador creado: `, data);
                if(callback){
                    callback(data);
                }
            },
            error: function(xhr, status, error){
                console.error(`Error al crear el jugador ${playerKey}`, error);
            }
        });
    }

    function obtenerVidas(playerKey, callback){
        $.ajax({
            url:`http://localhost:8080/jugadores/${playerKey}/vidas`,
            method: "GET",
            success: function(vidas){
                console.log(`Vidas para ${playerKey}`, vidas);
                if(callback){
                    callback(vidas);
                }
            },
            error: function(xhr, status, error){
                console.error(`Error al obtener las vidas para ${playerKey}:`, error);
            }
        });
    }

    function actualizarVidas(playerKey, vidas, callback){
        $.ajax({
            url:`http://localhost:8080/jugadores/${playerKey}/vidas`, 
            method: "PUT",
            contentType: "application/json",
            data: JSON.stringify({vidas: vidas}),
            success: function(){
                console.log(`Vidas actualizadas para ${playerKey}: `, vidas);
                if(callback){
                    callback();
                }
            }, 
            error: function(xhr, status, error){
                console.error(`Error al actualizar las vidas para ${playerKey}:`, error);
            }
        });
    }

})