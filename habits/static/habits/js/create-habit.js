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
