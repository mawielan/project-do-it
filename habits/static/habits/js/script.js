// jquery
var $accordions = $('.accordion');


var acc = document.getElementsByClassName("accordion");

var i;
var isAddCommentModeActive = false;
var isDisplayCommentsModeActive = false;

// Dictionary for  habit - numberOfComments
var referenceList_numberOfComments = {};

// New Version of "open collapse"
// #############################

var items = document.querySelectorAll('.sort > li > button');
var forEach = Array.prototype.forEach;

forEach.call(items, function(item) {
  mc = new Hammer(item);
  mc.on('tap', function(event) {
    console.log('Tap');
    // alert('HI');
    console.log(event);
    console.log(event.target.id);
    console.log(item.id);
    item.classList.toggle("active");
    var panel = item.nextElementSibling;
    if (panel.style.maxHeight) { // If panel is open
      console.log('Panel wird geschlossen.');

      $accordions.prop('disabled', false);

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

    } else { // If panel is closed
      console.log('Panel wird geöffnet.')
      sessionStorage.setItem(this.id, this.id);
      var csrftoken = getCookie('csrftoken');

      $.ajax({
        url: "/overview/habit/comments/", // the endpoint,commonly same url
        type: "POST", // http method
        data: {
          csrfmiddlewaretoken: csrftoken,
          habit_id: panel.id.split('panel_')[1],

        }, // data sent with the post request

        // handle a successful response
        success: function(json) {
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
        error: function(xhr, errmsg, err) {
          console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
        }
      });
    }
  })
})

// #############################


  // for (i = 0; i < acc.length; i++) {
  //   mc = Hammer()
  //   console.log(acc[i].id);
  //   $('#' + acc[i].id).on('touchend', function() {
  //       console.log('CLICK');
  //       console.log(this.id);
  //
  //
  //       this.classList.toggle("active");
  //       var panel = this.nextElementSibling;
  //
  //       if (panel.style.maxHeight) { // If panel is open
  //         console.log('Panel wird geschlossen.');
  //
  //         $accordions.prop('disabled', false);
  //
  //         for (j = 0; j < sessionStorage.length; j++) {
  //           console.log(sessionStorage.key(j));
  //           if (sessionStorage.key(j) == this.id) {
  //             sessionStorage.removeItem(this.id);
  //           }
  //         }
  //         panel.style.maxHeight = null;
  //         panel.style.minHeight = 0 + "px";
  //         var panel2 = panel.nextElementSibling;
  //         if (panel2 != null) {
  //           panel2.hidden = true;
  //         }
  //
  //         isAddCommentModeActive = false;
  //         isDisplayCommentsModeActive = false;
  //         console.log(sessionStorage);
  //
  //       } else { // If panel is closed
  //         console.log('Panel wird geöffnet.')
  //         sessionStorage.setItem(this.id, this.id);
  //         var csrftoken = getCookie('csrftoken');
  //
  //         $.ajax({
  //           url: "/overview/habit/comments/", // the endpoint,commonly same url
  //           type: "POST", // http method
  //           data: {
  //             csrfmiddlewaretoken: csrftoken,
  //             habit_id: panel.id.split('panel_')[1],
  //
  //           }, // data sent with the post request
  //
  //           // handle a successful response
  //           success: function(json) {
  //             console.log(json); // another sanity check
  //             numberOfComments = json['numberOfComments'];
  //             console.log('numberOfComments: ' + numberOfComments);
  //
  //
  //             panel.style.maxHeight = panel.scrollHeight + "px";
  //             panel.style.minHeight = 255 + "px";
  //
  //             document.getElementById('numberOfComments_' + panel.id.split('panel_')[1]).innerHTML = numberOfComments;
  //             referenceList_numberOfComments['numberOfComments_' + panel.id.split('panel_')[1]] = numberOfComments;
  //             console.log(referenceList_numberOfComments);
  //             // document.getElementById('numberOfComments_' + habit_ID).innerHTML = json['numberOfComments']
  //           },
  //
  //           // handle a non-successful response
  //           error: function(xhr, errmsg, err) {
  //             console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
  //           }
  //         });
  //       }
  //
  //
  //   });
  // }


//       if (!isSortable) {
//       } else {
//         console.log('Sorting');
//         isSortable = false;
//       }

  window.onload = function() {
    console.log('window.onload was clicked');
    console.log(window.location.href);
    console.log(window.location);
  }


  var accToCreate = document.getElementById('id_habitToCreate');
  if (typeof(accToCreate) != undefined && accToCreate != null) {
    accToCreate.classList.toggle("active");
    var panel = accToCreate.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      // panel.style.maxHeight = panel.scrollHeight + "px";
      panel.style.maxHeight = 236 + "px";
    }
  }
