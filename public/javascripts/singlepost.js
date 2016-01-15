$(document).ready(function() {
  formatGeo($('[data-js~=geolocation]'));
  $deletePost = $('.delete-post');
  $postId = $('.single-post-delete-container').attr('id');
  $deletePost.on('click', function(event) {
    $.ajax({
      url: '/post/' + $postId,
      method: 'DELETE',
      success: function() {
        location.pathname = '/timeline';
      },
      error: function(data) {
        console.error('delete post failed');
      }
    });
  });
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
