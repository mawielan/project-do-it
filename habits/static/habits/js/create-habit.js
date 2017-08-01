var nameOfImage_create = null;

var otherAccordions = document.getElementsByClassName("accordion");
for (i = 0; i < otherAccordions.length; i++) {        // Disable other accordions
  otherAccordions[i].disabled = true;
}

var sectionButtonsButtom = document.getElementsByClassName("section-icon-bottom");
for (i = 0; i <sectionButtonsButtom.length; i++) {   // Disable section buttons at bottom
  sectionButtonsButtom[i].disabled = true;
}

var sectionButtonsTop = document.getElementsByClassName("section-icon-top");
for (i = 0; i <sectionButtonsTop.length; i++) {   // Disable section buttons at bottom
  sectionButtonsTop[i].disabled = true;
}

$('#create_habit_img').on("click", function() {
  $('#create_file').click();
});


$('#carousel-input-targetbehavior').bind('input propertychange', function() {
  var habit_title_input = document.getElementById('habit-title');
  habit_title_input.value = this.value;
});

var habitToCreate = document.getElementById("id_habitToCreate");
habitToCreate.classList.toggle("active");


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

// ROUTINE ACTION LEFT
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

// ROUTINE ACTION RIGHT
function routineActionRight() {
  console.log('routineActionRight is fired!');
  var routineInput = document.getElementById('carousel-input-routine');
  routineInput.disabled = false;
  routineInput.focus();
  routineInput.value = "";
  routineInput.placeholder = "Neue Routine";

}

// TARGETBEHAVIOR ACTION RIGHT
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


// TARGETBEHAVIOR ACTION LEFT
function targetbehaviorActionRight() {
  console.log('targetbehaviorActionRight is fired!');
  var targetbehaviorInput = document.getElementById('carousel-input-targetbehavior');
  targetbehaviorInput.disabled = false;
  targetbehaviorInput.focus();
  targetbehaviorInput.value = "";
  targetbehaviorInput.placeholder = "Neues Zielverhalten";
}

// Create new habit
$("#save_habit_icon").click(function(e) {

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
