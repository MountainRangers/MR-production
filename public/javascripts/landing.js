$(document).ready(function(){
  $('.google-button').mouseover(function(){
    $('.shape-one').css('fill', 'white')
  });

  $('[data-js~=login-button]').on('click', function(event) {
    window.location = "/auth/google";
  });
})

//clock
$(document).ready(function(){
	setInterval(function(){
		var now = new Date();
		var hours = now.getHours();
		var minutes = now.getMinutes();
		if (hours < 10) {
			hours = "0" + hours;
		}
		if (minutes < 10) {
			minutes = "0" + minutes;
		}
		if (hours > 12){
			var hours = hours - 12;
			var ap = "p";
		}else if (hours == 12) {
			var ap = "p";
		}else if (hours == 24) {
			var hours = hours - 12;
			var ap = "a";
		}else {
			var ap = "a";
		}
	}, .0001);
});

//color settings
$(document).ready(function(){
	setInterval(function(){
		var dawn = '#78d';
		var day = '#1bf';
		var dusk = '#036';
		var mood = new Date();
		var second = mood.getSeconds();
		if(second < 5){
			// $('body').css('background', dawn);
			$('.shape-one').css('fill', dawn);
			$('.sky-dawn').css('opacity','1');
			$('.sky-day').css('opacity','1');
		} else if(second < 10) {
			// $('body').css('background', day);
			$('.shape-one').css('fill', dawn);
			$('.sky-dawn').css('opacity','0');
			$('.sky-day').css('opacity','1');
			$('.hills').css('fill','#db9');
  	} else if(second < 15){
  		// $('body').css('background', dawn);
  		$('.shape-one').css('fill', dawn);
  		$('.sky-dawn').css('opacity','1');
  		$('.sky-day').css('opacity','1');
  	} else if(second < 20) {
  		// $('body').css('background', day);
  		$('.shape-one').css('fill', dawn);
  		$('.sky-dawn').css('opacity','0');
  		$('.sky-day').css('opacity','1');
  		$('.hills').css('fill','#db9');
    } else if (second < 25){
      // $('body').css('background', dawn);
      $('.shape-one').css('fill', dawn);
      $('.sky-dawn').css('opacity','1');
      $('.sky-day').css('opacity','1');
    } else if(second < 30) {
      // $('body').css('background', day);
      $('.shape-one').css('fill', dawn);
      $('.sky-dawn').css('opacity','0');
      $('.sky-day').css('opacity','1');
      $('.hills').css('fill','#db9');
    } else if (second < 35){
      // $('body').css('background', dawn);
      $('.shape-one').css('fill', dawn);
      $('.sky-dawn').css('opacity','1');
      $('.sky-day').css('opacity','1');
    } else if(second < 40) {
      // $('body').css('background', day);
      $('.shape-one').css('fill', dawn);
      $('.sky-dawn').css('opacity','0');
      $('.sky-day').css('opacity','1');
      $('.hills').css('fill','#db9');
    } else if(second < 45){
      // $('body').css('background', dawn);
      $('.shape-one').css('fill', dawn);
      $('.sky-dawn').css('opacity','1');
      $('.sky-day').css('opacity','1');
    } else if(second < 50) {
      // $('body').css('background', day);
      $('.shape-one').css('fill', dawn);
      $('.sky-dawn').css('opacity','0');
      $('.sky-day').css('opacity','1');
      $('.hills').css('fill','#db9');
    } else if(second < 55) {
      // $('body').css('background', day);
      $('.shape-one').css('fill', dawn);
      $('.sky-dawn').css('opacity','0');
      $('.sky-day').css('opacity','1');
      $('.hills').css('fill','#db9');
    }  else {
			// $('body').css('background', dusk);
			$('.shape-one').css('fill', dawn);
			$('.sky-day').css('opacity','0');
			$('.hills').css('fill','#0be');
		}
	});
});
