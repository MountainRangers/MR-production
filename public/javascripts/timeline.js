if (window.location.href[window.location.href.length - 1] === '#') {
  window.location.href = window.location.href.substring(0, window.location.href.length - 1);
}

$(document).ready(function() {
  formatGeo($('[data-js~=geolocation]'));
  $('.down-arrow').on('click', function() {
    $('.drop-down').toggleClass('hidden');
  });

  $('[data-js~=tl-tag]').on('click', function(event) {
    filterTags(event.currentTarget.dataset.tag);
  });

  $('[data-js~=tag-icon]').on('click', function(event) {
    filterTags(event.currentTarget.dataset.tag);
    $('[data-js~=drop-down]').toggleClass('hidden');
  });
})

function filterTags(tag) {
  var $posts = $('[data-js~=post]');
  for (var i = 0; i < $posts.length; i++) {
    if (tag === 'all') {
      $posts[i].style.display = '';
    } else {
      if ($posts[i].dataset.tag != tag) {
        $posts[i].style.display = 'none';
      } else {
        $posts[i].style.display = '';
      }
    }
  }
}


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
