$('button').disabled = true;

if (typeof(document.getElementById('id_habitToUpdate')) && document.getElementById('id_habitToUpdate') != null) {
  var habitToUpdate = document.getElementById('id_habitToUpdate');
  var habitToUpdate_id = habitToUpdate.parentElement.id;
  sessionStorage.setItem("habitToUpdate_id", habitToUpdate_id);
  habitToUpdate.classList.toggle("active");
  var panel = habitToUpdate.nextElementSibling;
  if (panel.style.maxHeight){
    panel.style.maxHeight = null;
  } else {
    // panel.style.maxHeight = panel.scrollHeight + "px";
    panel.style.maxHeight = 240 + "px";
  }

  // $('#no-delete-habit-btn').prop('disabled', false);

}

$("#update-habit-icon").click(function(e) {
  console.log('update-habit-icon is fired');
  e.preventDefault();


  var csrftoken = getCookie('csrftoken');

  var habitToUpdate_id = sessionStorage.getItem('habitToUpdate_id');
  var habit_title = document.getElementById('habit-title').value;
  var habit_trigger = document.getElementById('carousel-input-trigger').value;
  var habit_routine = document.getElementById('carousel-input-routine').value;
  var habit_targetbehavior = document.getElementById('carousel-input-targetbehavior').value;
  var habit_image = document.getElementById('create-habit-img').src  ;
  // alert(habit_image);

 //This is the Ajax post.Observe carefully. It is nothing but details of where_to_post,what_to_post
  $.ajax({
      url : "/overview/habit/update/complete", // the endpoint,commonly same url manuell eingeben!
      type : "POST", // http method
      data : { csrfmiddlewaretoken : csrftoken,
                habitToUpdate_id: habitToUpdate_id,
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
           sessionStorage.removeItem('habitToDelete_id');
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

function targetbehaviorActionLeft_update() {
  console.log('targetbehaviorActionLeft_update is fired!');
  var isOption = false;
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
        // habit_title.value = targetbehaviorInput.value;
        console.log(targetbehaviorInput.value);
        break;
      } else {
        targetbehaviorInput.value = myOpts[i+1].value;
        console.log(targetbehaviorInput.value);
        // habit_title.value = targetbehaviorInput.value;
        break;
      }


    }
  }

  if (!isOption) {
    targetbehaviorInput.value = myOpts[0].value;
    habit_title.value = targetbehaviorInput.value;
  }
}

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
