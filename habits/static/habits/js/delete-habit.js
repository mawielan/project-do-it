$('button').prop('disabled', true);
// Set deleting habit to active state
if (typeof(document.getElementById('delete-habit-btn')) != undefined && document.getElementById('delete-habit-btn') != null) {
  var deleteBtn = document.getElementById('delete-habit-btn');
  habitToDelete = document.getElementById('accordion_' + deleteBtn.parentElement.id)
  sessionStorage.setItem("habitToDeleteGetFocusBack", habitToDelete.id);
  habitToDelete.classList.toggle("active");
  var panel = habitToDelete.nextElementSibling;
  if (panel.style.maxHeight){
    panel.style.maxHeight = null;
  } else {
    panel.style.maxHeight = panel.scrollHeight + "px";
  }

  $('#no-delete-habit-btn').prop('disabled', false);

}

function takeMeToOverview() {

  console.log('NoTakeMeBackButton was clicked');
  console.log(sessionStorage.getItem('habitToDeleteGetFocusBack'));
  setTimeout(function() {
    window.location.href = "/overview";
  }, 1000);
}
