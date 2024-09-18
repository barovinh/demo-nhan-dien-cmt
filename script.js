$(document).ready(function(){
    $('#submit').on("click", function(){
        var formData = new FormData();
        var imageFile = $('#input-file')[0].files[0]; // Assuming you have an input field for image
        formData.append("image", imageFile);

        $.ajax({
            url: "https://api.fpt.ai/vision/idr/vnm",
            type: "POST",
            data: formData,
            processData: false, // Prevent jQuery from processing the data
            contentType: false, // Prevent jQuery from setting the content type
            headers: {
                'api_key': "SYe4cuLbzfvZW4iEBSlZWg51HFTwRrH2"
            },
            success: function(data, status){
                alert("Data: " + JSON.stringify(data) + "\nStatus: " + status);
            },
            error: function(xhr, status, error){
                alert("Error: " + error + "\nStatus: " + status);
            }
        });
    });
});
