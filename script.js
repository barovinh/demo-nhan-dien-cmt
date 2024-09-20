let api_key = "SYe4cuLbzfvZW4iEBSlZWg51HFTwRrH2";
// UsEA0pVkPG4vUNZTEaopbsjjQdINjwzU
// xtGfasUmgcFqtOxsk2imP9gkkPRyzJyb
// MInu2QYAUyZDHpsJ4wGMj0YjLJtMAEg4
// Bảo Vinh làm ơn úp đết cái api key này, sắp hết lượt dùng rồi

$(document).ready(function(){
    $("#input-file").change(function(e) {
        for (var i = 0; i < e.originalEvent.srcElement.files.length; i++) {
            var file = e.originalEvent.srcElement.files[i]
    
            var img = $('#uploaded-img')
            var reader = new FileReader()
            reader.onloadend = function() {
                 img.attr('src', reader.result)
            }
            reader.readAsDataURL(file);
            
        }
        $("#uploaded-section").removeClass('d-none')
    });

    $('#submit').on("click", function(){
        var formData = new FormData();
        var imageFile = $('#input-file')[0].files[0];
        if (!imageFile) {
            alert('Vui lòng chọn ảnh!')
            return;
        }
        formData.append("image", imageFile);
        formData.append("face", 1);
        $('#loading').removeClass('d-none')
        $.ajax({
            url: "https://api.fpt.ai/vision/idr/vnm",
            type: "POST",
            data: formData,
            processData: false, // Prevent jQuery from processing the data
            contentType: false, // Prevent jQuery from setting the content type
            headers: {
                'api_key': api_key
            },
            success: function(data, status){
                // alert("Data: " + JSON.stringify(data) + "\nStatus: " + status);
                console.log(data)
                var rd = data.data[0]
                $('#info').empty()
                $('#info').append('<p>MÃ CCCD: ' + '<span class="fw-bold">' + rd.id + '</span>' + '</p>')
                $('#info').append('<p>HỌ VÀ TÊN: ' + '<span class="fw-bold">' + rd.name + '</span>' + '</p>')
                $('#info').append('<p>NGÀY THÁNG NĂM SINH: ' + '<span class="fw-bold">' + rd.dob + '</br>' + '</p>')
                $('#info').append('<p>GIỚI TÍNH: ' + '<span class="fw-bold">' + rd.sex + '</span>' + '</p>')
                $('#info').append('<p>QUỐC TỊCH: ' + '<span class="fw-bold">' + rd.nationality + '</br>' + '</p>')
                $('#info').append('<p>QUÊ QUÁN: ' + '<span class="fw-bold">' + rd.home + '</span>' + '</p>')
                $('#info').append('<p>Đ/C THƯỜNG TRÚ: ' + '<span class="fw-bold">' + rd.address + '</span>' + '</p>')
                $('#info').append('<p>NGÀY HẾT HẠN: ' + '<span class="fw-bold">' + rd.doe + '</span>' + '</p>')
                $('#info').append('<p>HÌNH ẢNH KHUÔN MẶT: </p>')
                $('#info').append('<img width="155" height="187" alt="" src="data:image/png;base64,' + rd.face_base64 + '">')
                $('#loading').addClass('d-none')
            },
            error: function(xhr, status, error){
                alert('Ảnh không đủ tiêu chuẩn nhận diện (Mờ, thiếu góc, thiếu thông tin, không phải CCCD Việt Nam,...)')
            }
        });
    });
});
