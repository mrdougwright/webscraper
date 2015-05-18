$(window).load(function() {
  loadScript();
});

var map;

function initialize() {
  var markerCoords1 = new google.maps.LatLng(37.7919615,-122.2287941);
  var markerCoords2 = new google.maps.LatLng(38.2919615,-122.7287941);
  var mapOptions = {
    center: new google.maps.LatLng(37.7919615,-122.2287941), // Oakland
    zoom: 12,
    mapTypeId: google.maps.MapTypeId.NORMAL
  };
  // initializing map
  map = new google.maps.Map(document.getElementById("map-canvas"),mapOptions);

  // simple marker
  var marker = createMarker(markerCoords1, map, "Hi");

  // custom marker
  var customMarker = createCustomMarker(markerCoords2, map, "Hi");

  // add infowindow when clicking on the simple marker marker
  var info = createInfoWindow("Mtg title");
  google.maps.event.addListener(marker, 'click', function() {
    info.open(map,marker);
  });
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

var marker;
function createMarker(coords, map, title){
    marker = new google.maps.Marker({
    position: coords,
    map: map,
    title: title,
    draggable: false,
    animation: google.maps.Animation.DROP
  });
    return marker;
}
function createCustomMarker(coords,map,title){
    marker = new google.maps.Marker({
    position: coords,
    map: map,
    title: title,
    icon: createImage("/assets/icon.png"),
    draggable: false,
    animation: google.maps.Animation.DROP
  }); 
    return marker;
}

function createImage(url){
    var image = {
    url: url,
    // This marker is 20 pixels wide by 32 pixels tall.
    size: new google.maps.Size(32, 32),
    // The origin for this image is 0,0.
    origin: new google.maps.Point(0,0),
    // The anchor for this image is the base of the flagpole at 0,32.
    anchor: new google.maps.Point(0, 32)
  };
  return image;
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