function getPlanet(tipoTerreno){
	a = [];
	fetch('https://swapi.co/api/planets/').then(function(response) {
		return response.json();
	}).then(function(myJson) {
		myJson.results.forEach(obj => {
			Object.entries(obj).forEach(([key, value]) => {
				if(`${key}` == 'terrain'){
					if(`${value}`.includes(tipoTerreno)){
						a.push(obj);
					}
				}
				
			});
		});
		a.sort(function (x, y) {
			if (parseInt(x.population) > parseInt(y.population)) {
				return -1;
			}
			if (parseInt(x.population) < parseInt(y.population)) {
				return 1;
			}
			return 0;
		});
		console.log(a);
		if(a.length > 0){
			console.log(a[0]);
			document.getElementById("labelResultadoPlaneta").innerHTML = "El nombre del planeta que coincide con el parametro solicitado es:";
			document.getElementById("resultadoPlaneta").innerHTML = a[0]['name'];
		}
	});
}
