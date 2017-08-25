$('#profile_image').on("click", function() {
  $('#id_image').click();
});


function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            console.log(input.files[0]);
            nameOfImage = input.files[0].name;
            console.log(nameOfImage);
            reader.onload = function (e) {
                $('#profile_image')
                    .attr('src', e.target.result)
                    .width(90)
                    .height(90);
                console.log(e.target.result);
            };

            reader.readAsDataURL(input.files[0]);
        }
}
