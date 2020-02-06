var noEncontrado = true;
var edad = 0;

function buscarEdad() {
  edad = document.getElementById("txtEdad").value;

  if(edad <= 0){
    alert("ingrese una edad mayor a 0")
    return;
  }

  peticion( ['GET', 'https://randomuser.me/api/'], function(persona){
      if(persona.age > edad){
        noEncontrado = false;
        llenarTabla(persona);
      }else{
        peticionRecursiva();
      }
  });
}

function peticionRecursiva(){
  peticion( ['GET', 'https://randomuser.me/api/'], function(persona){
    console.log("peticion recursiva",persona);
      if(persona.age > edad){
        noEncontrado = false;
        llenarTabla(persona);
      }else{
        peticionRecursiva();
      }
  });
}

/**
 * Metodo que renderiza la tabla en la vista
 * @param {*} persona 
 */
function llenarTabla(persona){
  var cantidadColumnas = 5;

  document.getElementById("contenido").innerHTML = "";
  var contenido = document.getElementById("contenido");

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