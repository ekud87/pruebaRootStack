/**
 * Metodo generico que sirve para realizar peticiones ajax
 * @param {*} parametros : un arreglo donde se indica el tipo de peticion 'GET, POST' y su url
 * @param {*} resultado : una funcion anonima donde se indica que hacer con el resultado de la peticion
 */
function peticion(parametros, resultado){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var dataConverter = JSON.parse(this.responseText);
        var persona = new Persona(dataConverter["results"][0]);
        resultado(persona);
      }
    };
    xhttp.open(parametros[0], parametros[1], true);
    xhttp.send();
}

/**
 * retorna un arreglo de personas ordenado de forma desendente
 * @param {*} data 
 */
function fetchAndOrder(data){
    return data.sort((a, b) => b.name.localeCompare(a.name));
}

