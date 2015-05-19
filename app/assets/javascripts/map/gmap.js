$(window).load(function() {
  loadScript()
})

var map, marker;
var $legend = $('#legend')

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

function renderLegend(loc_data) {
  $legend.find('.name').text(loc_data.name)
  $legend.find('.address').text(loc_data.address)
  $legend.find('.city').text(loc_data.city)
  $legend.find('.time').text(loc_data.time)
  debugger
}

function createMarker(data, map){
  var coordinates = new google.maps.LatLng(data.latitude, data.longitude)
  marker = new google.maps.Marker({
    position: coordinates,
    map: map,
    title: data.name,
    draggable: false,
    animation: google.maps.Animation.DROP
  })
  
  google.maps.event.addListener(marker, 'click', function() {
    bubbleWindow(this.title).open(map,this)
    return renderLegend(data)
  })
  return marker
}

function bubbleWindow(text){
  var infowindow = new google.maps.InfoWindow({ content: text })
  return infowindow
}


function loadScript() {
	console.log("map loading ...")
  var script = document.createElement('script')
  script.type = 'text/javascript'
  script.src = 'https://maps.googleapis.com/maps/api/js?sensor=false&callback=initialize'
  document.body.appendChild(script)
}