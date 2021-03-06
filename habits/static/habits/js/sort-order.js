var isSortable = false;

// Sort & save order of habits
$(function () {
    $('.sort').sortable({
        axis: 'y',
        handle: 'button',
        revert: 'true',
        containment: 'parent',
        tolerance: 'pointer',
        items: 'li:not(.non-sortable)',
        // cancel: '.custom-accordion-inactive',
        cancel: '',
        update: function(event, ui) {
          isSortable = true;
          console.log('isSortable' + isSortable);
          var result = $(this).sortable( "serialize", {key: event.target.id});
          console.log('RESULT');
          console.log(result);
          // TODO:   inaktive habits von result rausschmeißen
          // alert(result);

          var csrftoken = getCookie('csrftoken');


          $.ajax({
                  url : "/overview/saveOrder/", // the endpoint,commonly same url
                  type : "POST", // http method
                  data : { csrfmiddlewaretoken : csrftoken,
                  result : result,
          }, // data sent with the post request

          // handle a successful response
          success : function(json) {
               console.log(json); // another sanity check
               isSortable = false;
               //On success show the data posted to server as a message

              //  alert('Your list '+json['result']);
          },

          // handle a non-successful response
          error : function(xhr,errmsg,err) {
          console.log("FAILURE");
          console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
          }
          });



        }
    });

    // var sorted = $( ".selector" ).sortable( "serialize", { key: "sort" } );
    // console.log(sorted)
})
