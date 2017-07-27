$('button').prop('disabled', true);

if (typeof(document.getElementById('id_habitToCreate')) != undefined && document.getElementById('id_habitToCreate') != null) {
  $('.btn-arrow').prop('disabled', false);
  document.getElementById('save-habit-icon').disabled = false;
    console.log($('#carousel-btn-right').offset());
    console.log($('#carousel-btn-left').offset());

    setTimeout(function(e) {
      console.log($('#carousel-btn-right').offset());
      console.log($('#carousel-btn-left').offset());

    }, 1000)
    // $('#carousel-btn-right').each(function() {
  //   $('#carousel-btn-right').prop('disabled', false);
  //   // do something
  // });
  // $('#carousel-btn-right').prop('disabled', false);
}


// TRIGGER ACTION LEFT
function triggerActionLeft () {
  console.log('triggerActionLeft is fired');
  isOption = false;
  myOpts = document.getElementById('id_trigger').options;
  caroInput = document.getElementById('carousel-input-trigger');
  caroInput.disabled = true;

  for (var i = 0; i < myOpts.length; i++) {

    if (caroInput.value == myOpts[i].value) {
      isOption = true;
      if (i == (myOpts.length -1)) {
        console.log('Last Element of the list');
        caroInput.value = myOpts[0].value;
        break;
      } else {
        caroInput.value = myOpts[i+1].value;
        break;
      }
    }
  }

  if (!isOption) {
    caroInput.value = myOpts[0].value;
  }
}

// TRIGGER ACTION RIGHT
function triggerActionRight() {
  console.log('triggerActionRight is fired!');
  var triggerInput = document.getElementById('carousel-input-trigger');
  triggerInput.disabled = false;
  triggerInput.focus();
  triggerInput.value = "";
  triggerInput.placeholder = "Neuer Trigger";
}
