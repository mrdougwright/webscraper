$(window).load(function() {
  loadScript()
})

var map, marker;
var infoWindows = [];

function initialize() {
  var mapOptions = {
    center: new google.maps.LatLng(37.7919615,-122.2287941), // Oakland
    zoom: 12,
    mapTypeId: google.maps.MapTypeId.NORMAL
  }
  // initializing map
  map = new google.maps.Map(document.getElementById("map-canvas"),mapOptions)
  places.forEach(mapPoints) // window.places from db
}

function mapPoints(loc_data, index, array) {
  createMarker(loc_data, map)
}

function closeAllDumbWindows() {
  for (var i=0; i < infoWindows.length; i++) {
    infoWindows[i].close();
  }
}

function renderLegend(loc_data,infowindow) {
  var $legend = $('#legend')
  $legend.find('.name').text(loc_data.name)
  $legend.find('.address').text(loc_data.address)
  $legend.find('.city').text(loc_data.city)
  $legend.find('.time').text(loc_data.time)
  $legend.find('.day').text(loc_data.day)
}

function createMarker(data, map){
  var coordinates = new google.maps.LatLng(data.latitude, data.longitude)
  marker = new google.maps.Marker({
    position: coordinates,
    map: map,
    draggable: false,
    animation: google.maps.Animation.DROP,
    data: data
  })

  google.maps.event.addListener(marker, 'click', function() {
    infowindow = infoWindow(this.data.name)
    infoWindows.push(infowindow)
    closeAllDumbWindows()
    infowindow.open(map,this)
    return renderLegend(this.data,infowindow)
  })
  return marker
}

function infoWindow(text){
  return new google.maps.InfoWindow({ content: text })
}


function loadScript() {
	console.log("map loading ...")
  var script = document.createElement('script')
  script.type = 'text/javascript'
  script.src = 'https://maps.googleapis.com/maps/api/js?sensor=false&callback=initialize'
  document.body.appendChild(script)
}