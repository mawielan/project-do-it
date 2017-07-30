var nameOfImage_create = null;

$('button').prop('disabled', true);

function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            console.log(input.files[0]);
            nameOfImage_create = input.files[0].name;
      
            reader.onload = function (e) {
                $('#create_habit_img')
                    .attr('src', e.target.result)
                    .width(75)
                    .height(75);
                console.log(e.target.result);
            };

            reader.readAsDataURL(input.files[0]);
        }
}

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

// Create new habit
$("#save-habit-icon").click(function(e) {

 e.preventDefault();

 var csrftoken = getCookie('csrftoken');

 var habit_title = document.getElementById('habit-title').value;
 var habit_trigger = document.getElementById('carousel-input-trigger').value;
 var habit_routine = document.getElementById('carousel-input-routine').value;
 var habit_targetbehavior = document.getElementById('carousel-input-targetbehavior').value;
 var habit_image = document.getElementById('create_habit_img').src  ;
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
             habit_image_name : nameOfImage_create

    }, // data sent with the post request

 // handle a successful response
 success : function(json) {
    console.log(json); // another sanity check
    alert(json['habit_title'], json['habit_trigger'], json['habit_routine'], json['habit_targetbehavior'])
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
