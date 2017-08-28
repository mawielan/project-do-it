// Sort & save order of habits
$(function () {
    $('.sort').sortable({
        handle: 'button',
        cancel: '',
        update: function(event, ui) {
          var result = $(this).sortable( "serialize", {key: event.target.id});
          console.log('RESULT');
          console.log(result);
          // TODO: inaktive habits von result rausschmeißen
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
