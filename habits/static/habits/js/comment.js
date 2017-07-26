/*
Document contains following functions:
  - Function to get number of comments
  - Function to display comments sector
  - Function to display add-comment sector
  - Function to post comment
*/


// Get number of comments
function getComments(habit_id) {
  console.log('getComments is fired')
  console.log(habit_id);
  var csrftoken = getCookie('csrftoken');
  var habit_ID = habit_id;

  $.ajax({
    url : "/overview/habit/comments/", // the endpoint,commonly same url
    type : "POST", // http method
    data : { csrfmiddlewaretoken : csrftoken,
              habit_id: habit_ID,

     }, // data sent with the post request

    // handle a successful response
    success : function(json) {
      console.log(json); // another sanity check
      console.log('numberOfComments:' + '' + json['numberOfComments']);
      numberOfComments = json['numberOfComments'];
      // document.getElementById('numberOfComments_' + habit_ID).innerHTML = json['numberOfComments']
    },

    // handle a non-successful response
    error : function(xhr,errmsg,err) {
      console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
    }
  });
}

// Function works only on click
// $(document).on('click','.accordion', function(e) {
//   console.log('An accordion was clicked!');
//   var habit = null;
//   var habit_ID = null;
//
//   if (e.target.classList[0] == 'accordion') {
//     console.log('ACCORDION');
//     habit = e.target.id;
//     habit_ID = habit.split('accordion_')[1];
//
//   } else if (e.target.classList[0] == 'media-body') {
//     console.log('MEDIA-BODY');
//     habit = e.target.parentNode.parentNode.id;
//     habit_ID = habit.split('accordion_')[1];
//
//   } else if (e.target.classList[0] == 'media-heading') {
//     console.log('MEDIA-HEADING');
//     habit = e.target.parentNode.parentNode.parentNode.id;
//     habit_ID = habit.split('accordion_')[1];
//   }
//
//   console.log('habit: ' + habit);
//   console.log('habit_id: ' + habit_ID);
//
//   for (i = 0; i < sessionStorage.length; i++) {
//     if (sessionStorage.key(i) == habit) {
//       console.log('Item in session storage');
//       var csrftoken = getCookie('csrftoken');
//
//       $.ajax({
//         url : "/overview/habit/comments/", // the endpoint,commonly same url
//         type : "POST", // http method
//         data : { csrfmiddlewaretoken : csrftoken,
//                   habit_id: habit_ID,
//
//          }, // data sent with the post request
//
//         // handle a successful response
//         success : function(json) {
//           console.log(json); // another sanity check
//           console.log('numberOfComments:' + '' + json['numberOfComments']);
//           document.getElementById('numberOfComments_' + habit_ID).innerHTML = json['numberOfComments']
//         },
//
//         // handle a non-successful response
//         error : function(xhr,errmsg,err) {
//           console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
//         }
//       });
//     }
//   }
// });

// Display comments
$(document).on('click','#section-icon-bottom-displayComments', function(e) {
  console.log('displayComments is fired!');
  console.log('isDisplayCommentsModeActive: ' + isDisplayCommentsModeActive);
  e.preventDefault();

  var habit = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.id;
  var habit_ID = habit.split('panel_')[1];
  var acc_id = 'accordion_' + habit_ID;

  for (i = 0; i < sessionStorage.length; i++) {
    if (sessionStorage.key(i) == acc_id) {
      console.log('Item in session storage');
      var csrftoken = getCookie('csrftoken');

      $.ajax({
        url : "/overview/habit/comments/", // the endpoint,commonly same url
        type : "POST", // http method
        data : { csrfmiddlewaretoken : csrftoken,
          habit_id : habit_ID


         }, // data sent with the post request

        // handle a successful response
        success : function(json) {
          console.log(json); // another sanity check
          // Create lag time before redirecting
          var panel = document.getElementById(sessionStorage.getItem(acc_id)).nextElementSibling;
          panel.style.marginBottom = 1 + "px";
          var panel2 = panel.nextElementSibling;
          console.log(panel2);
          panel2.innerHTML = "";
          panel2.style.paddingTop = 5 + "px";

          var obj = JSON.parse(json['comments_json']);
          console.log(obj);
          var length = Object.keys(obj).length;

          if (length > 0) {
            console.log('json[comments_json] has at least one element.');

            var tableString = "<table class='table  '>";
            // div = document.createElement('div');
            tableString += "<thead>";
            tableString += "<tr>";
            tableString += "<th>#</th>";
            tableString += "<th>Date</th>";
            tableString += "<th>Comment</th>";
            tableString += "</tr>";
            tableString += "</thead>";

            tableString += "<tbody>";

            for (i = 0; i < length; i++) {
              tableString += "<tr>";
              tableString += "<td>" + (i+1) + "</td>";
              tableString += "<td>" + obj[i].fields.created_at + "</td>";
              tableString += "<td>" + obj[i].fields.comment + "</td>";
              tableString += "</tr>";
            }

            tableString += "</tbody>";
            tableString += "</table>";
            panel2.innerHTML = tableString;


          } else {
            console.log('json[comments_json] has no element.');
            console.log(document.getElementById('h4-habit-title_' + habit_ID));
            var title = document.getElementById('h4-habit-title_' + habit_ID).innerHTML;
            console.log(title);
            panel2.style.textAlign = "center";
            panel2.innerHTML = '<br><p>Für das Habit ';
            panel2.innerHTML += title;
            panel2.innerHTML += ' sind keine Kommentare vorhanden.</p>';
          }


          if (isDisplayCommentsModeActive) {
            panel2.hidden = true;
            isDisplayCommentsModeActive = false;
            console.log('DisplayCommentsMode is inactive');
            $('.accordion').prop('disabled', false);

          } else {
            panel2.hidden = false;
            panel2.style.overflowY = "scroll";
            isDisplayCommentsModeActive = true;
            isAddCommentModeActive = false;
            console.log('DisplayCommentsMode is active');

            $('.accordion').prop('disabled', true);
            document.getElementById(acc_id).disabled = false;

          }
          console.log('DisplayCommentsMode is ' + isDisplayCommentsModeActive);



        },

        // handle a non-successful response
        error : function(xhr,errmsg,err) {
          console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
        }
      });

    }
  }
});


//Post comment
$(document).on('click', '#post-comment-btn', function(e) {
  console.log('post-comment-btn is fired');
  e.preventDefault();

  var habit = e.target.parentElement.id;
  var habit_ID = habit.split('panel2_')[1];
  var acc_id = 'accordion_' + habit_ID;
  console.log(acc_id);



  for (i = 0; i < sessionStorage.length; i++) {
    if (sessionStorage.key(i) == acc_id) {
      console.log('Item in session storage');

      var commentInput = document.getElementById('comment-textarea');
      console.log(commentInput.value);
      console.log(commentInput);


      if (commentInput.value.length > 0) { // check the comment is not empty
        console.log('comment is not empty');
        var csrftoken = getCookie('csrftoken');

        $.ajax({
          url : "/overview/habit/comment/save/", // the endpoint,commonly same url
          type : "POST", // http method
          data : { csrfmiddlewaretoken : csrftoken,
                    comment : commentInput.value,
                    habit_id: habit_ID,

           }, // data sent with the post request

          // handle a successful response
          success : function(json) {
            console.log(json); // another sanity check
            // Create lag time before redirecting
            document.getElementById(habit).hidden = true;

            isAddCommentModeActive = false;
            // setTimeout(function(e) {
            //   window.location.href = "/overview/";
            // }, 1000);

            $.ajax({
              url : "/overview/habit/comments/", // the endpoint,commonly same url
              type : "POST", // http method
              data : { csrfmiddlewaretoken : csrftoken,
                        habit_id: habit_ID,

               }, // data sent with the post request

              // handle a successful response
              success : function(json) {
                console.log(json); // another sanity check
                // Create lag time before redirecting
                document.getElementById('numberOfComments_' + habit_ID).innerHTML = json['numberOfComments'];

              },

              // handle a non-successful response
              error : function(xhr,errmsg,err) {
                console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
              }
            });

          },

          // handle a non-successful response
          error : function(xhr,errmsg,err) {
            console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
          }
        });
      } else {
        alert('Comment is empty!');
      }
    }
  }
});

// Display add comment function
$(document).on('click','#section-icon-bottom-addComment', function(e) {
  console.log('addComment is fired!');
  console.log('isAddCommentModeActive: ' + isAddCommentModeActive);
  e.preventDefault();

  var habit = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.id;
  var habit_ID = habit.split('panel_')[1];
  var acc_id = 'accordion_' + habit_ID;

  if (sessionStorage.length == 0) {
    console.log("asasasasass" );
  }

  for (i = 0; i < sessionStorage.length; i++) {
    if (sessionStorage.key(i) == acc_id) {
      console.log('Item in session storage');

      var panel = document.getElementById(sessionStorage.getItem(acc_id)).nextElementSibling;
      panel.style.marginBottom = 1 + "px";
      var panel2 = panel.nextElementSibling;

      panel2.innerHTML = '<textarea id="comment-textarea" style="border-color: black; display:block;  margin-top: 20px; margin-left: auto; margin-right: auto;" rows="4" cols="50" placeholder="Write your Comment... "></textarea> ';
      panel2.innerHTML += '<div class="container">';
      panel2.innerHTML += '  <button id="section-icon-bottom" type="button" class="btn btn-default" aria-label="Left Align">';
      panel2.innerHTML += '    <i class="fa fa-file-image-o" aria-hidden="true"></i>';
      panel2.innerHTML += '  </button>';
      panel2.innerHTML += '  <button id="section-icon-bottom" type="button" class="btn btn-default" aria-label="Left Align">';
      panel2.innerHTML += '    <i class="fa fa-file-text-o" aria-hidden="true"></i>';
      panel2.innerHTML += '  </button>';
      panel2.innerHTML += '  <button id="section-icon-bottom" type="button" class="btn btn-default" aria-label="Left Align">';
      panel2.innerHTML += '    <i class="fa fa-bar-chart" aria-hidden="true"></i>';
      panel2.innerHTML += '  </button>';
      panel2.innerHTML += '  <button id="section-icon-bottom" type="button" class="btn btn-default" aria-label="Left Align">';
      panel2.innerHTML += '    <i class="fa fa-map-marker" aria-hidden="true"></i>';
      panel2.innerHTML += '  </button>';
      panel2.innerHTML += '  <button id="post-comment-btn" class="btn btn-default" >Post</button>';
      panel2.innerHTML += '</div>';

      if (isAddCommentModeActive) {
        panel2.hidden = true;
        console.log('AddComentMode is inactive');
        isAddCommentModeActive = false;
        $('.accordion').prop('disabled', false);
      } else {
        panel2.style.minHeight = 145 + "px";
        panel2.style.paddingTop = 0 + "px";
        panel2.style.paddingBottom= 0 + "px";
        panel2.hidden = false;
        isAddCommentModeActive = true;
        console.log('AddCommentMode is active');
        isDisplayCommentsModeActive = false;
        $('.accordion').prop('disabled', true);
      }

      console.log('AddComentMode is ' + isAddCommentModeActive);
    }
  }
});
