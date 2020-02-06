var cantidadPersonas = 10;
var peticiones = [];


function getListaPersonasDesc() {
    peticiones = [];
    peticion( ['GET', 'https://randomuser.me/api/'], function(data){
      peticiones.push(data);
      if(peticiones.length == cantidadPersonas){
        var listaPersonas = fetchAndOrder(peticiones);
        llenarTabla(listaPersonas);
      }else{
        peticionRecursiva();
      }
    });
}

function peticionRecursiva(){
  peticion( ['GET', 'https://randomuser.me/api/'], function(data){
    peticiones.push(data);
      if(peticiones.length == cantidadPersonas){
        var listaPersonas = fetchAndOrder(peticiones);
        llenarTabla(listaPersonas);
      }else{
        peticionRecursiva();
      }
  });
}

/**
 * Metodo que renderiza la tabla en la vista
 * @param {*} listaPersonas 
 */
function llenarTabla( listaPersonas){
  var cantidadColumnas = 5;

  document.getElementById("contenido").innerHTML = "";
  var contenido = document.getElementById("contenido");
  for (var i = 0; i < listaPersonas.length; i++) {
    var persona = listaPersonas[i];

    var fila = document.createElement("tr");
    var celda = document.createElement("td");
    var textoCelda = document.createTextNode(persona.name);
    celda.appendChild(textoCelda);
    fila.appendChild(celda);

    celda = document.createElement("td");
    textoCelda = document.createTextNode(persona.gender);
    celda.appendChild(textoCelda);
    fila.appendChild(celda);

    celda = document.createElement("td");
    textoCelda = document.createTextNode(persona.age);
    celda.appendChild(textoCelda);
    fila.appendChild(celda);

    celda = document.createElement("td");
    textoCelda = document.createTextNode(persona.phone);
    celda.appendChild(textoCelda);
    fila.appendChild(celda);

    celda = document.createElement("td");
    textoCelda = document.createTextNode(persona.location.country);
    celda.appendChild(textoCelda);
    fila.appendChild(celda);

    contenido.appendChild(fila);
  }

}