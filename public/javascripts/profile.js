
$(document).ready(function() {
  formatGeo($('[data-js~=geolocation]'));
});

function formatGeo(geoObjects) {
  for (var i = 0; i < geoObjects.length; i++) {
    geoObjects[i].textContent = formatGeostring(geoObjects[0].textContent);
  }

  function formatGeostring(stringCoords) {
    var coords = stringCoords.split(', ');
    coords[0] = coords[0].substr(0, 7);
    coords[1] = coords[1].substr(0, 7);
    return coords.join(', ');
  }
}
