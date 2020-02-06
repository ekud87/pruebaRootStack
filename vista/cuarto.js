a = [];
b = [];
c = [];

async function calcularNaves(cantidadPasajeros){
	await getNave(cantidadPasajeros);
	await getEpisodes(b);
	await finProceso();
}

async function getNave(cantidadPasajeros){
	a = [];
	b = [];
	c = [];
	//se realiza la peticion para obtener todas las naves disponibles
	await fetch('https://swapi.co/api/starships/').then(function(response) {
		return response.json();
	}).then(function(myJson) {
		myJson.results.forEach(obj => {
			Object.entries(obj).forEach(([key, value]) => {
				if(key == 'passengers'){
					//se filtran las naves para buscar solo aquellas que tengan la capacidad de pasajeros
					if(parseInt(value,10) >= parseInt(cantidadPasajeros,10)){
						a.push(obj);
					}
				}
			});
		});
		
		a.forEach(obj => {
			Object.entries(obj).forEach(([key, value]) => {
				if(`${key}` == 'consumables'){
					//se filtran las naves para buscar solo aquellas que tengan la capacidad de viajar por lo menos 7 dias
					if(!`${value}`.includes('days')){
						b.push(obj);
					} else {
						days = parseInt(value.split(' ')[0],10);
						if (days >= 7){
							b.push(obj);
						}
					}
				}
			});
		});		
	});
}

async function getEpisodes(arrayNaves){
	await arrayNaves.forEach(obj => {
		Object.entries(obj).forEach(([key, value]) => {
			if(`${key}` == 'films'){	
				var d = [];
				d = `${value}`.split(',');
				for (i = 0; i < d.length; i++) {
					callfilm(d[i],obj);
				}
			}
		});
	});
}

async function callfilm(url,obj){
	await fetch(url).then(function(response) {
		return response.json();
	}).then(function(myJson2) {
		console.log("episode_id", myJson2['episode_id']);
		if(myJson2['episode_id'] == 4 ||
			myJson2['episode_id'] == 5 ||
			myJson2['episode_id'] == 6){
				if(!c.includes(obj)){
					c.push(obj);
					finProceso();
				}
		}
	});
}

async function finProceso(){
		
		//Se organizan los valores que cumplen con todos los criterios...
		c.sort(function (x, y) {
			if (parseInt(x.max_atmosphering_speed) > parseInt(y.max_atmosphering_speed)) {
				return -1;
			}
			if (parseInt(x.max_atmosphering_speed) < parseInt(y.max_atmosphering_speed)) {
				return 1;
			}
			return 0;
		});
		
		if(c.length > 0){
			console.log(c[0]);
			document.getElementById("labelResultadoNave").innerHTML = "El nombre de la nave que coincide con el parametro solicitado es:";
			document.getElementById("resultadoNave").innerHTML = c[0]['name'];
		}else{
			console.log('No Hay Coincidencias');
			document.getElementById("labelResultadoNave").innerHTML = "No Hay Coincidencias";
			document.getElementById("resultadoNave").innerHTML = "";
		}
}
