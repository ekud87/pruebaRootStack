var cantidadPersonas = 5;
var listaPersonas = [];
var cantidadCaracterMayor = 0;


function getListaPersonas() {
  listaPersonas = [];
  peticion( ['GET', 'https://randomuser.me/api/'], function(data){
    listaPersonas.push(data);
    if(listaPersonas.length == cantidadPersonas){
      llenarTabla(listaPersonas);
      var caracter = calcularLetraMasUsada();
      document.getElementById("respuesta").innerHTML= "'"+caracter+"' se repite "+cantidadCaracterMayor+" veces";
    }else{
      peticionRecursiva();
    }
  });
}

function peticionRecursiva(){
peticion( ['GET', 'https://randomuser.me/api/'], function(data){
  listaPersonas.push(data);
    if(listaPersonas.length == cantidadPersonas){
      llenarTabla(listaPersonas);
      var caracter = calcularLetraMasUsada();
      document.getElementById("respuesta").innerHTML= "'"+caracter+"' se repite "+cantidadCaracterMayor+" veces";
    }else{
      peticionRecursiva();
    }
});
}

/**
 * retorna el caracter que mas se repite
 */
function calcularLetraMasUsada(){
  var caracterMayor;
  cantidadCaracterMayor = 0;
  
  //concatena todos los nombres
  var todosCaracteres = "";
  for (let index = 0; index < listaPersonas.length; index++) {
    var persona = listaPersonas[index];
    todosCaracteres+= persona.name;
  }

  //obtiene todos los caracteres a analizar sin que esten repetidos
  var sinRepetir = todosCaracteres.replace(/(.)(?=.*\1)/g, "");

  //obtiene un arreglo con todos los caracteres disponibles en la lista
  var arregloCaracteres = sinRepetir.substring(0,sinRepetir.length);
    for (let j = 0; j < arregloCaracteres.length; j++) {
      var caracter = arregloCaracteres[j];
      console.log(caracter);
      var cuenta = 0;
      var posicion = todosCaracteres.indexOf(caracter);
      while ( posicion != -1 ) {
        cuenta++;
        posicion = todosCaracteres.indexOf(caracter,posicion+1);
      }

      //verifica cual es el caracter que mas se repite
      if(cuenta > cantidadCaracterMayor){
        cantidadCaracterMayor = cuenta;
        caracterMayor = caracter;
      }
  }
  return caracterMayor;
};

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