$(document).ready(function(){
  $changepersonalinfo = $('[data-js~=change-personal-info]');
  $main = $('main');
  
  $changepersonalinfo.on('click', function(){
    editInfo($changepersonalinfo);
  });
  
  tapToCancel($main);

});

//Is user changing or submitting info?
function editInfo(info){
  var $changetext = info.text();
    if(info.text() == 'Change'){
      changeInfo(info);
    } else if (info.text() == 'Submit'){
      submitChange(info);
    }
}

//DOM manipulation when user presses 'Change'
function changeInfo(info){
  var $dataNearButton = info.parent('[data-js~=edit-settings]').find('h2');
  var $inputNearButton = info.parent('[data-js~=edit-settings]').find('[data-js~=hidden-edit]');
  $dataNearButton.hide();
  $inputNearButton.val($dataNearButton.text());
  $inputNearButton.show().toggleClass('.hidden');;
  info.text('Submit');
}


//DOM manipulation when user presses 'Submit'
function submitChange(submit){
  var $dataNearButton = submit.parent('[data-js~=edit-settings]').find('h2');
  var $inputNearButton = submit.parent('[data-js~=edit-settings]').find('[data-js~=hidden-edit]');
  var personalinfo = $inputNearButton.val();
  $('[data-js~=hidden-edit]').hide();
  $dataNearButton.show();
  submit.text('Change');
  $.ajax({  
    url: '/settings',
    method: 'PUT',
    data: {userinfo: personalinfo},
    success: function(data){
      location.reload();
    },
    error: function(data){
      console.error('profile update failed');
    }
  });
}

//Tap outside of input box to cancel changes in progress
function tapToCancel(main){
  main.on('click', function(event){
    if(event.target === this && main.find('[data-js~=edit-settings]').find('button').text() == 'Submit'){
      $('[data-js~=hidden-edit]').hide().toggleClass('.hidden');
      main.find('[data-js~=edit-settings]').find('h2').show();
      main.find('[data-js~=edit-settings]').find('button').text('Change');
    }
  })
}
