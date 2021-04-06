mapboxgl.accessToken = 'pk.eyJ1IjoiYm9vc3Rlcm1hbmlhIiwiYSI6ImNrbWtsN2p6eDB4YXUzMG1rbWUxY3Q4bjEifQ.s03iC6xfkmuFKnYLzQOZog';
var localisation = [5.812432, 52.849904] //long lat van grote ruime akker bij Bantega, Friesland , kan je gelijk aan de speciaal pils
var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/streets-v11',
center: localisation, 
zoom: 7,
essential: true,
speed: 0.9,
});

//geeft een leuke animatie, niet perse nodig maar wel grappig
map.flyTo({
center: [5.812432, 52.849904],
zoom: 13,
speed: 1.5,
curve: 1,
easing(t){
return t;
}
});
 
// Add the control to the map.
var geocoder = new MapboxGeocoder({
accessToken: mapboxgl.accessToken,
mapboxgl: mapboxgl
});

// Plant een markertje op de geweldig uitgekozen locatie.
var popup = new mapboxgl.Popup().setHTML('<h3>SpaceX Secret Landing Location</h3>');
var mark = new mapboxgl.Marker({ color: '#0101BA'})
.setLngLat(localisation)
.setPopup(popup)
.addTo(map);
 
document.getElementById('geocoder').appendChild(geocoder.onAdd(map));


//voor het veranderen van de map in andere kleurtjes.
var layerList = document.getElementById('menu');
var inputs = layerList.getElementsByTagName('input');
 
function switchLayer(layer) {
var layerId = layer.target.id;
map.setStyle('mapbox://styles/mapbox/' + layerId);
}
 
for (var i = 0; i < inputs.length; i++) {
inputs[i].onclick = switchLayer;
}


//kijken of je je bondjas aan moet houden.
function getAPIdata() {

	// construct request
	var request = 'https://api.openweathermap.org/data/2.5/weather?appid=35df706845e78503b65cd04f528ab9e8&q=the%20Hague,nl';

	// get current weather
	fetch(request)	
	
	// parse response to JSON format
	.then(function(response) {
		return response.json();
	})
	
	// do something with response
	.then(function(response) {
		
		var weatherBox = document.getElementById('weather');
		 var graden = Math.floor(response.main.temp - 273.15);
		 weatherBox.innerHTML = graden + '&#176;C';
	});
}

// init data stream
getAPIdata();

