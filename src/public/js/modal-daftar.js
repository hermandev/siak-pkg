// jQuery(function($){
//     $("#form-daftar-sekolah").submit(function(e){
//         e.preventDefault()
//         const data = {
//             token: $('input[name="_csrf"]').attr('value'),
//             npsn: $('input[name="npsn"]').val(),
//             nama: $('input[name="nama"]').val(),
//             kode_pos: $('input[name="kode_post"]').val(),
//             status: $('#status').val(), 
//             telp: $('input[name="telp"]').val(),
//             desa: $('input[name="desa"]').val(),
//             kecamatan: $('input[name="kecamatan"]').val(),
//             kabupaten: $('input[name="kabupaten"]').val(),
//             provinsi: $('input[name="provinsi"]').val(),    
//             jenjang: $('#jenjang').val(),
//         }

//         $.ajax({
//             type: "POST",
//             contentType : "application/json",
//             url: window.location,
//             data: JSON.stringify(data),
//             headers: {
//                 'X-CSRF-Token': data.token 
//             },
//             dataType: "json",
//             success: function (res) {
//                 console.log(res)
//                 $('#modal').modal().hide();
//             },
//         });
//     })
   
// })