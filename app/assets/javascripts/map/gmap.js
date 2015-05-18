$(window).load(function() {
  loadScript();
});

var map, marker;

function initialize() {
  var mapOptions = {
    center: new google.maps.LatLng(37.7919615,-122.2287941), // Oakland
    zoom: 12,
    mapTypeId: google.maps.MapTypeId.NORMAL
  };
  // initializing map
  map = new google.maps.Map(document.getElementById("map-canvas"),mapOptions);

  // places.forEach(showMapPoints)  >> Use Geocoder gem
  showMapPoints(places[0]) // temporary until geocoded....
} // <-- end of initializer

function createInfoWindow(text){
  var infowindow = new google.maps.InfoWindow({
    content: text
  });
  return infowindow;
}

function getCurrentPosition(e){
  var markercoords = new google.maps.LatLng(e.latLng.lat(),e.latLng.lng());
  return markercoords;
}

function createMarker(coords, map, title){
  marker = new google.maps.Marker({
    position: coords,
    map: map,
    title: title,
    draggable: false,
    animation: google.maps.Animation.DROP
  });
  
  // add infowindow when clicking on the simple marker marker
  google.maps.event.addListener(marker, 'click', function() {
    createInfoWindow(title).open(map,marker);
  });

  return marker;
}

function codeAddress(address){
  var geocoding = new google.maps.Geocoder();

  if(address.length > 0){
    geocoding.geocode({'address': address},function(results, status){
      if(status == google.maps.GeocoderStatus.OK){
        createMarker(results[0].geometry.location, map, "testing")
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  }
}

function showMapPoints(element, index, array){
  codeAddress(element.address) // use geocoder gem instead
}


function loadScript() {
	console.log("map loading ...");
  var script = document.createElement('script');
  script.type = 'text/javascript';
  //'https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyBJYFdplGeKUUEmGZ-vL4ydiSZ09Khsa_o&sensor=false&libraries=drawing'
  script.src = 'https://maps.googleapis.com/maps/api/js?sensor=false' +
    //'&v=3.14'+
    //'&key=AIzaSyBJYFdplGeKUUEmGZ-vL4ydiSZ09Khsa_o'+
    //'&libraries=drawing'+
    '&callback=initialize';
  document.body.appendChild(script);
}