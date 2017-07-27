
var acc = document.getElementsByClassName("accordion");
var i;
var isAddCommentModeActive = false;
var isDisplayCommentsModeActive = false;

// Dictionary for  habit - numberOfComments
var referenceList_numberOfComments = {};

for (i = 0; i < acc.length; i++) {
  acc[i].onclick = function() {
    console.log(this.id);
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {                // If panel is open
      console.log('Panel wird geschlossen.');

      $('.accordion').prop('disabled', false);

      for (j = 0; j < sessionStorage.length; j++) {
        console.log(sessionStorage.key(j));
        if (sessionStorage.key(j) == this.id) {
          sessionStorage.removeItem(this.id);
        }
      }
      panel.style.maxHeight = null;
      panel.style.minHeight = 0 + "px";
      var panel2 = panel.nextElementSibling;
      if (panel2 != null) {
        panel2.hidden = true;
      }

      isAddCommentModeActive = false;
      isDisplayCommentsModeActive = false;
      console.log(sessionStorage);

    } else {                                   // If panel is closed
      console.log('Panel wird geöffnet.')
      sessionStorage.setItem(this.id, this.id);
      var csrftoken = getCookie('csrftoken');

      $.ajax({
        url : "/overview/habit/comments/", // the endpoint,commonly same url
        type : "POST", // http method
        data : { csrfmiddlewaretoken : csrftoken,
                  habit_id: panel.id.split('panel_')[1],

         }, // data sent with the post request

        // handle a successful response
        success : function(json) {
          console.log(json); // another sanity check
          numberOfComments = json['numberOfComments'];
          console.log('numberOfComments: ' + numberOfComments);


          panel.style.maxHeight = panel.scrollHeight + "px";
          panel.style.minHeight = 255 + "px";

          document.getElementById('numberOfComments_' + panel.id.split('panel_')[1]).innerHTML = numberOfComments;
          referenceList_numberOfComments['numberOfComments_' + panel.id.split('panel_')[1]] = numberOfComments;
          console.log(referenceList_numberOfComments);
          // document.getElementById('numberOfComments_' + habit_ID).innerHTML = json['numberOfComments']
        },

        // handle a non-successful response
        error : function(xhr,errmsg,err) {
          console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
        }
      });
    }


  }
}



window.onload = function() {
  console.log('window.onload was clicked');
  // console.log(referenceList_numberOfComments);
  // console.log(window.location.pathname);
  // console.log(sessionStorage);
  // console.log(sessionStorage.getItem('habitToDeleteGetFocusBack'));
  // console.log(sessionStorage.getItem('habitAfterPostComment'));
  // if (sessionStorage['habitToDeleteGetFocusBack'] && window.location.pathname == "/overview/") {
  //   console.log("There is 'habitToDeleteGetFocusBack' in session storage ");
  //   if (typeof(document.getElementById(sessionStorage.getItem('habitToDeleteGetFocusBack'))) != undefined && document.getElementById(sessionStorage.getItem('habitToDeleteGetFocusBack')) != null) {
  //     document.getElementById(sessionStorage.getItem('habitToDeleteGetFocusBack')).classList.toggle("active");
  //     var panel =   document.getElementById(sessionStorage.getItem('habitToDeleteGetFocusBack')).nextElementSibling;
  //     if (panel.style.maxHeight){
  //       panel.style.maxHeight = null;
  //     } else {
  //       panel.style.maxHeight = panel.scrollHeight + "px";
  //     }
  //   }
  //   sessionStorage.removeItem("habitToDeleteGetFocusBack");
  // }


  // if (sessionStorage.length > 0) {
  //   for (i = 0; i < sessionStorage.length; i++) {
  //     console.log(sessionStorage.key(i));
  //     document.getElementById(sessionStorage.key(i)).classList.toggle('active');
  //     var panel =   document.getElementById(sessionStorage.key(i)).nextElementSibling;
  //
  //     console.log(referenceList_numberOfComments['numberOfComments_' + sessionStorage.key(i).split('accordion_')[1]]);
  //     if (referenceList_numberOfComments['numberOfComments_' + sessionStorage.key(i).split('accordion_')[1]]) {
  //       console.log("asas");
  //       document.getElementById('numberOfComments_' + sessionStorage.key(i).split('accordion_')[1]).innerHTML = 1;
  //
  //     }
  //
  //     panel.style.maxHeight = panel.scrollHeight + "px";
  //
  //   }
  // } else {
  //   console.log('sessionStorage is empty');
  // }

}


var accToCreate = document.getElementById('id_habitToCreate');
if (typeof(accToCreate) != undefined && accToCreate != null) {
  accToCreate.classList.toggle("active");
  var panel = accToCreate.nextElementSibling;
  if (panel.style.maxHeight){
    panel.style.maxHeight = null;
  } else {
    // panel.style.maxHeight = panel.scrollHeight + "px";
    panel.style.maxHeight = 236 + "px";
  }
}
//
// if (document.getElementById('habit-title') != null &&   document.getElementById('habit-title').value == "" ) {
//   console.log('FIRE');
//   document.getElementById('habit-title').value = document.getElementById('carousel-input-targetbehavior').value;
// }

// if (document.getElementById('carousel-input-targetbehavior') != null && document.getElementById('habit-title') != null) {
//
//     addEvent(document.getElementById('carousel-input-targetbehavior'), 'keyup', function () {
//       if (document.getElementById('habit-title')) {
//         document.getElementById('habit-title').value = this.value.replace(' ', '_');
//       }
//
//     });
//
// }



// $('#file').on('click touchstart' , function(){
//     $(this).val('');
// });
//
//
// //Trigger now when you have selected any file
// $("#file").change(function(e) {
//
// }
// //For image uploading
// function previewFile(){
//     var preview = document.getElementById('create-habit-img'); //selects the query named img
//     var file    = document.querySelector('input[type=file]').files[0]; //sames as here
//     var reader  = new FileReader();
//
//     reader.onloadend = function () {
//         preview.src = reader.result;
//     }
//
//     if (file) {
//         reader.readAsDataURL(file); //reads the data as a URL
//     } else {
//         preview.src = "/media/habit_image/no_image_placeholder.png";
//     }
// }
//
// // previewFile();  //calls the function named previewFile()


//Connect habit title and target behavior
function addEvent(ele, evnt, funct) {
  if (ele.addEventListener) // W3C
    return ele.addEventListener(evnt,funct,false);
  else if (ele.attachEvent)  // IE
    return ele.attachEvent("on"+evnt,funct);
}




function routineActionLeft() {
  console.log('routineActionLeft is fired!');
  isOption = false;
  var myOpts = document.getElementById('select-routines').options;
  console.log(myOpts);
  var routineInput = document.getElementById('carousel-input-routine');

  routineInput.disabled = true;

  for (var i = 0; i < myOpts.length; i++) {

    if (routineInput.value == myOpts[i].value) {
      isOption = true;
      if (i == (myOpts.length -1)) {
        console.log('Last Element of the list');
        routineInput.value = myOpts[0].value;
        break;
      } else {
        routineInput.value = myOpts[i+1].value;
        break;
      }
    }
  }

  if (!isOption) {
    routineInput.value = myOpts[0].value;
  }
}

function routineActionRight() {
  console.log('routineActionRight is fired!');
  var routineInput = document.getElementById('carousel-input-routine');
  routineInput.disabled = false;
  routineInput.focus();
  routineInput.value = "";
  routineInput.placeholder = "Neue Routine";

}

function targetbehaviorActionLeft() {
  console.log('targetbehaviorActionLeft is fired!');
  isOption = false;
  var myOpts = document.getElementById('select-targetbehaviors').options;
  var targetbehaviorInput = document.getElementById('carousel-input-targetbehavior');
  var habit_title = document.getElementById('habit-title');
  targetbehaviorInput.disabled = true;

  for (var i = 0; i < myOpts.length; i++) {
    console.log(i);
    console.log('targetbehaviorInput: ' + targetbehaviorInput.value);

    if (targetbehaviorInput.value == myOpts[i].value) {
      isOption = true;
      if (i == (myOpts.length -1)) {
        console.log('Last Element of the list');
        targetbehaviorInput.value = myOpts[0].value;
        habit_title.value = targetbehaviorInput.value;
        console.log(targetbehaviorInput.value);
        break;
      } else {
        targetbehaviorInput.value = myOpts[i+1].value;
        console.log(targetbehaviorInput.value);
        habit_title.value = targetbehaviorInput.value;
        break;
      }


    }
  }

  if (!isOption) {
    targetbehaviorInput.value = myOpts[0].value;
    habit_title.value = targetbehaviorInput.value;
  }
}



function targetbehaviorActionRight() {
  console.log('targetbehaviorActionRight is fired!');
  var targetbehaviorInput = document.getElementById('carousel-input-targetbehavior');
  targetbehaviorInput.disabled = false;
  targetbehaviorInput.focus();
  targetbehaviorInput.value = "";
  targetbehaviorInput.placeholder = "Neues Zielverhalten";
}

carousel = (function(){
  if (typeof(document.querySelector('.carouselbox')) != undefined && document.querySelector('.carouselbox') != null) {
    var box = document.querySelector('.carouselbox');
    var next = box.querySelector('.next');
    var prev = box.querySelector('.prev');
    var items = box.querySelectorAll('.content li');
    var counter = 0;
    var amount = items.length;
    var current = items[0];
    box.classList.add('active');
    function navigate(direction) {
      current.classList.remove('current');
      counter = counter + direction;
      if (direction === -1 &&
          counter < 0) {
        counter = amount - 1;
      }
      if (direction === 1 &&
          !items[counter]) {
        counter = 0;
      }
      current = items[counter];
      current.classList.add('current');
    }


    next.addEventListener('click', function(ev) {
      navigate(1);
      console.log('next');
    });
    prev.addEventListener('click', function(ev) {
      navigate(-1);
      console.log('prev');
    });
    navigate(0);
  }
})();

// $("input[id='id_trigger']").TouchSpin({
//           min: 0,
//           max: 100,
//           step: 0.1,
//           decimals: 2,
//           boostat: 5,
//           maxboostedstep: 10,
//           postfix: '%'
//       });

// $(function() {
//    $( "#id_trigger" ).spinner();
// });


//Check if element is an input or a textarea
// if ($(touch.target).is("input") || $(touch.target).is("textarea")) {
//   event.stopPropagation();
// } else {
//   event.preventDefault();
// }
// Create new habit
$("#section-trash-icon").click(function(e) {

 e.preventDefault();

 var csrftoken = getCookie('csrftoken');

 var habit_title = document.getElementById('habit-title').value;
 var habit_trigger = document.getElementById('carousel-input-trigger').value;
 var habit_routine = document.getElementById('carousel-input-routine').value;
 var habit_targetbehavior = document.getElementById('carousel-input-targetbehavior').value;
 var habit_image = document.getElementById('create-habit-img').src  ;
 // alert(habit_image);

//This is the Ajax post.Observe carefully. It is nothing but details of where_to_post,what_to_post

 $.ajax({
         url : "/overview/habit/save/", // the endpoint,commonly same url
         type : "POST", // http method
         data : { csrfmiddlewaretoken : csrftoken,
                   habit_title : habit_title,
                   habit_trigger : habit_trigger,
                   habit_routine : habit_routine,
                   habit_targetbehavior : habit_targetbehavior,
                   habit_image : habit_image,

          }, // data sent with the post request

 // handle a successful response
 success : function(json) {
      console.log(json); // another sanity check
      // Create lag time before redirecting
      setTimeout(function() {
        window.location.href = "/overview";
      }, 2000);


  },

  // handle a non-successful response
  error : function(xhr,errmsg,err) {
  console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
  }
 });
});

function click(id) {
  console.log(id);
}


// Create new habit
$("#save-habit-icon").click(function(e) {

 e.preventDefault();

 var csrftoken = getCookie('csrftoken');

 var habit_title = document.getElementById('habit-title').value;
 var habit_trigger = document.getElementById('carousel-input-trigger').value;
 var habit_routine = document.getElementById('carousel-input-routine').value;
 var habit_targetbehavior = document.getElementById('carousel-input-targetbehavior').value;
 var habit_image = document.getElementById('create-habit-img').src  ;
 // alert(habit_image);



//This is the Ajax post.Observe carefully. It is nothing but details of where_to_post,what_to_post

 $.ajax({
   url : "/overview/habit/save/", // the endpoint,commonly same url
   type : "POST", // http method
   data : { csrfmiddlewaretoken : csrftoken,
             habit_title : habit_title,
             habit_trigger : habit_trigger,
             habit_routine : habit_routine,
             habit_targetbehavior : habit_targetbehavior,
             habit_image : habit_image,

    }, // data sent with the post request

 // handle a successful response
 success : function(json) {
    console.log(json); // another sanity check
    // Create lag time before redirecting
    setTimeout(function() {
      window.location.href = "/overview";
    }, 2000);
  },

  // handle a non-successful response
  error : function(xhr,errmsg,err) {
    console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
  }
 });
});




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



//For getting CSRF token
function getCookie(name) {
       var cookieValue = null;
       if (document.cookie && document.cookie != '') {
         var cookies = document.cookie.split(';');
         for (var i = 0; i < cookies.length; i++) {
         var cookie = jQuery.trim(cookies[i]);
         // Does this cookie string begin with the name we want?
         if (cookie.substring(0, name.length + 1) == (name + '=')) {
             cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
             break;
          }
     }
 }
 return cookieValue;
}





// Make habit active
function makeNewHabitActive() {
  var habitToCreate_id = sessionStorage.getItem("habitToCreate");
  if (habitToCreate_id != null) {
    console.log(habitToCreate_id);
    sessionStorage.removeItem("habitToCreate");
    var habit_id = 'accordion_' + habitToCreate_id;
    console.log(habit_id);
    var habitToCreate_element = document.getElementById(habit_id);
    console.log(habitToCreate_element);

    if (typeof(habitToCreate_element) != 'undefined' && habitToCreate_element != null)
    {
      console.log('Element exists!');
      habitToCreate_element .classList.toggle("active");
      var panel = habitToCreate_element.nextElementSibling;
      if (panel.style.maxHeight){
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
      editHabit();
      // exists.
    }
    else
    {
      console.log('Element does not exist!');
    }
  }

}

function editHabit() {
  console.log('editHabit()')

   var csrftoken = getCookie('csrftoken');

  //This is the Ajax post.Observe carefully. It is nothing but details of where_to_post,what_to_post

   $.ajax({
           url : "/overview/habit/edit/", // the endpoint,commonly same url
           type : "POST", // http method
           data : { csrfmiddlewaretoken : csrftoken,

   }, // data sent with the post request

   // handle a successful response
   success : function(json) {
        console.log(json); // another sanity check
        alert(json['testNote'] + 'Edit works properly');

   },

   // handle a non-successful response
   error : function(xhr,errmsg,err) {
   console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
   }
   });
}

//If page is reloading
// window.onload = function() {
//   var reloading = sessionStorage.getItem("reloading");
//   if (reloading) {
//     sessionStorage.removeItem("reloading");
//     makeNewHabitActive();
//   }
// }

// $('#upload-image-form').submit(function(event) {
//  event.preventDefault();
//  saveImage();
//  return false;
// });
//
// function saveImage() {
//   console.log('saveImage() is fired');
//   var csrftoken = getCookie('csrftoken');
//
//   //This is the Ajax post.Observe carefully. It is nothing but details of where_to_post,what_to_post
//   var form_data =   $('#upload-image-form').serializeArray();
//   console.log(form_data);
//   $.ajax({
//           url : "/overview/habit/upload_habit_image/", // the endpoint,commonly same url
//           type : "POST", // http method
//           data : { csrfmiddlewaretoken : csrftoken,
//                   "form_data" : form_data
//
//   }, // data sent with the post request
//
//   // handle a successful response
//   success : function(json) {
//        console.log(json); // another sanity check
//        alert(json['image'] + 'Upload works properly');
//        var imageToChange = document.getElementById('create-habit-img');
//        imageToChange.url = json['image'];
//
//   },
//
//   // handle a non-successful response
//   error : function(xhr,errmsg,err) {
//   console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
//   }
//   });
//
// }

// $(document).ready(function(){
//     $("#create-habit-img").on("click",function(){
//        console.log($("#id-image").click());
//        setTimeout(function(){ console.log('Fire'); }, 1000);
//     });
// });
//
// document.getElementById('id-image').onchange = function(e) {
//   console.log('value has changed');
//   console.log(document.getElementById('id-image').value);
//   var fd = new FormData($('#upload-image-form').get(0));
//   var csrf_token = getCookie('csrftoken');
//   console.log(fd);
//   fd.append('file', document.getElementById('id-image').files[0] );
//   fd.append('csrfmiddlewaretoken', csrf_token);
//   console.log(fd);
//
// };

// if (document.getElementById('id-image') != null && typeof(document.getElementById('id-image'))) {
//   document.getElementById('id-image').addEventListener('change', function(e)
//   {
//     var csrftoken = getCookie('csrftoken');
//     console.log(csrftoken);
//     console.log('Value has changed');
//     e.preventDefault();
//
//     var form_data = new FormData($(this))
//     $.ajax({
//         url: "/overview/habit/upload_habit_image/",             // url to your upload process file
//         type: "POST",                  // type of request
//         data: {csrfmiddlewaretoken : csrftoken,
//           form_data : form_data, },                    // form data that is sent to server (key/value pairs)
//         processData: false,            // tell jQuery not to process the data
//         contentType: false,            // tell jQuery not to set contentType
//         success: function(response){   // success function
//             console.log("response");
//             console.log(response);      // Do something here if image was uploaded successfully
//         }
//     });
//
//
//   });
// }

// Set habit inactive
// if (typeof(document.getElementById('section-icon-bottom-toggle')) != undefined && document.getElementById('section-icon-bottom-toggle') != null) {
//   var toggleBtn = document.getElementById('section-icon-bottom-toggle');
//   $(toggleBtn).click(function(e) {
//     console.log(e);
//     console.log('toggleBtnSetInactive is fired');
//
//   });
// }


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
/*
$(document).on('click','#section-icon-bottom-toggle', function(e) {
  console.log('toggleBtn is fired!');
  e.preventDefault();
  var setActive;
  var habitWhichChange = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.id;
  var habitWhichChangeID = habitWhichChange.split('panel_')[1];


  if (e.target.classList[1] == 'fa-toggle-off') {
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

});

*/
