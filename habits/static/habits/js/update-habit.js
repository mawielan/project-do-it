var nameOfImage;

var habitToUpdate = document.getElementById('id_habitToUpdate');
habitToUpdate.classList.toggle("active");
//
// // var otherAccordions = document.getElementsByClassName("accordion");
// // for (i = 0; i < otherAccordions.length; i++) {        // Disable other accordions
// //   otherAccordions[i].disabled = true;
// // }
var sectionButtonsButtom = document.getElementsByClassName("section-icon-bottom");
for (i = 0; i <sectionButtonsButtom.length; i++) {   // Disable section buttons at bottom
  sectionButtonsButtom[i].disabled = true;
}

var sectionButtonsTop = document.getElementsByClassName("section-icon-top");
for (i = 0; i <sectionButtonsTop.length; i++) {   // Disable section buttons at bottom
  sectionButtonsTop[i].disabled = true;
}

$('#update_habit_img').on("click", function() {
  $('#edit_file').click();
});

function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            console.log(input.files[0]);
            nameOfImage = input.files[0].name;
            console.log(nameOfImage);
            reader.onload = function (e) {
                $('#update_habit_img')
                    .attr('src', e.target.result)
                    .width(75)
                    .height(75);
                console.log(e.target.result);
            };

            reader.readAsDataURL(input.files[0]);
        }
}


if (typeof(document.getElementById('id_habitToUpdate')) && document.getElementById('id_habitToUpdate') != null) {
  var habitToUpdate = document.getElementById('id_habitToUpdate');
  var habitToUpdate_id = habitToUpdate.parentElement.id;
  sessionStorage.setItem("habitToUpdate_id", habitToUpdate_id);
}
//
//
//
//
//   habitToUpdate.classList.toggle("active");
//   var panel = habitToUpdate.nextElementSibling;
//   if (panel.style.maxHeight){
//     panel.style.maxHeight = null;
//   } else {
//     // panel.style.maxHeight = panel.scrollHeight + "px";
//     panel.style.maxHeight = 240 + "px";
//   }
//
//   // $('#no-delete-habit-btn').prop('disabled', false);
//
// }
//
$("#update-habit-icon").click(function(e) {
  console.log('update-habit-icon is fired');
  e.preventDefault();


  var csrftoken = getCookie('csrftoken');

  var habitToUpdate_id = sessionStorage.getItem('habitToUpdate_id');
  var habit_title = document.getElementById('habit-title').value;
  var habit_trigger = document.getElementById('carousel-input-trigger').value;
  var habit_routine = document.getElementById('carousel-input-routine').value;
  var habit_targetbehavior = document.getElementById('carousel-input-targetbehavior').value;
  var habit_image = document.getElementById('update_habit_img').src;

  // filename = document.getElementById('edit_file').input.files[0].name;
  // type = document.getElementById('edit_file').input.files[0].type;
  // alert(filename);
  // alert(type);
  // document.getElementById('edit_file')

  // Get name of image
  console.log(nameOfImage);

  // Get type of image
  // type = document.getElementById('update_habit_img').src.split('data:image/');
  // console.log(type);
  // if (type == undefined) {
  //   type = null;
  // } else {
  //   type = type[1].split(';');
  //   console.log(type[0]);
  // }
  type = null;


 // //This is the Ajax post.Observe carefully. It is nothing but details of where_to_post,what_to_post
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
                image_name : nameOfImage,
                image_type : type,

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


// TARGETBEHAVIOR ACTION RIGHT
function targetbehaviorActionRight_update() {
  console.log('targetbehaviorActionRight is fired!');
  var targetbehaviorInput = document.getElementById('carousel-input-targetbehavior');
  targetbehaviorInput.disabled = false;
  targetbehaviorInput.focus();
  targetbehaviorInput.value = "";
  targetbehaviorInput.placeholder = "Neues Zielverhalten";
}


// TARGETBEHAVIOR ACTION LEFT
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


// ROUTINE ACTION RIGHT
function routineActionRight_update() {
  console.log('routineActionRight is fired!');
  var routineInput = document.getElementById('carousel-input-routine');
  routineInput.disabled = false;
  routineInput.focus();
  routineInput.value = "";
  routineInput.placeholder = "Neue Routine";

}


// ROUTINE ACTION LEFT
function routineActionLeft_update() {
  console.log('routineActionLeft_update is fired!');
  var myOpts = document.getElementById('select-routines').options;
  var routineInput = document.getElementById('carousel-input-routine');
  isOption = false;

  routineInput.disabled = true;

  console.log(myOpts);
  for (var i = 0; i < myOpts.length; i++) {
    console.log(i);
    console.log('routineInput: ' + routineInput.value);

    if (routineInput.value == myOpts[i].value) {
      isOption = true;
      if (i == (myOpts.length -1)) {
        console.log('Last Element of the list');
        routineInput.value = myOpts[0].value;
        // habit_title.value = targetbehaviorInput.value;
        console.log(routineInput.value);
        break;
      } else {
        routineInput.value = myOpts[i+1].value;
        console.log(routineInput.value);
        // habit_title.value = targetbehaviorInput.value;
        break;
      }
    }
  }

  if(!isOption) {
    console.log('isOption: ' + isOption)
    routineInput.value = myOpts[0].value;
  }
}


// TRIGGER ACTION RIGHT
function triggerActionRight_update() {
  console.log('triggerActionRight is fired!');
  var triggerInput = document.getElementById('carousel-input-trigger');
  triggerInput.disabled = false;
  triggerInput.focus();
  triggerInput.value = "";
  triggerInput.placeholder = "Neuer Trigger";
}


// TRIGGER ACTION LEFT
function triggerActionLeft_update () {
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
