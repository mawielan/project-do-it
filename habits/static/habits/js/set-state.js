// Set state of habit
function setState(id) {
  console.log('toggleBtn is fired!');
  var setActive;
  var habitWhichChangeID = id;
  console.log(document.getElementById('section-icon-bottom-toggle_' + id).firstChild.nextElementSibling.classList[1]);
  if (document.getElementById('section-icon-bottom-toggle_' + id).firstChild.nextElementSibling.classList[1] == 'fa-toggle-off') {
    console.log('Habit wird aktiviert!');
    setActive = true;
  } else {
    console.log('Habit wird deaktiviert');
    setActive = false;
  }

  for (var i = 0; i < sessionStorage.length; i++) {
    var acc = 'accordion_' + habitWhichChangeID;

    if (sessionStorage.key(i) == acc) {
      var csrftoken = getCookie('csrftoken');

     //This is the Ajax post.Observe carefully. It is nothing but details of where_to_post,what_to_post

      $.ajax({
              url : "/overview/habit/state/", // the endpoint,commonly same url
              type : "POST", // http method
              data : { csrfmiddlewaretoken : csrftoken,
                  habit_id : habitWhichChangeID,
                  state : setActive

      }, // data sent with the post request

      // handle a successful response
      success : function(json) {
         console.log(json); // another sanity check
         sessionStorage.removeItem('accordion_' + json['habitWhichChangeID']);
         console.log(sessionStorage);
         window.location.href = "/overview/";

      },

      // handle a non-successful response
      error : function(xhr,errmsg,err) {
        console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
      }
      });
    }
  }

}
