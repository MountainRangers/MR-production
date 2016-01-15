function initMap() {
  var myLatLng = {
    lat: $('#google-map').data('lat'),
    lng: $('#google-map').data('long')
  };

  var map = new google.maps.Map(document.getElementById('google-map'), {
    zoom: 15,
    center: myLatLng,
    scrollwheel: false
  });

  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: 'Hello World!'
  });
}
