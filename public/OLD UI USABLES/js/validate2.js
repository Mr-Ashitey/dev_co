/*====== check all fields to make sure they are required ======*/
$('.validate-form').on('submit',function(){
    if($('#nameField').val().trim() == ''){ 
        $('#nameFieldMsg').html('Fullname is required').css('color','#e85252');
        
        return false;
    }
})

$('.validate-form').on('submit',function(){
    if($('#emailField').val().trim() == ''){ 
        $('#emailFieldMsg').html('Email is required').css('color','#e85252');
        
        return false;
    }
})

$('.validate-form').on('submit',function(){
    if($('#password').val().trim() == ''){ 
        $('#requiredPassword').html('Password is required').css('color','#e85252');
        
        return false;
    }
})

// if($('#emailField').val().trim() == ''){ 
//     $('#emailFieldMsg').html('Email is required').css('color','#e85252');

//     if($('#password').val().trim() == ''){ 
//         $('#requiredPassword').html('Password is required').css('color','#e85252');
//     }
// }

// 

/*=====
[validate inputs onkeyup(i.e. when the passwords match or do not match)
            and whether email input is right]
=====*/
$('#nameField').on('keyup',function(){
    if($('#nameField').val().trim() == ""){
        $('#nameFieldMsg').html('');
    }
    else if($('#nameField').val().trim().match(/^[a-zA-Z ]{5,30}$/)){ 
        $('#nameFieldMsg').html('Field input correct').css('color','#59b300');
    }else 
        $('#nameFieldMsg').html('The username must be at least 5 and at most 24 characters long!').css('color','#e85252');
});

$('#emailField').on('keyup', function () {
    if($('#emailField').val().trim() == ""){
        $('#emailFieldMsg').html('');
    }
    else if ($('#emailField').val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
        $('#emailFieldMsg').html('email not in right format(eg. desiredname@mail.com!').css('color', '#e85252');
    }else
        $('#emailFieldMsg').html('email in right format').css('color', '#59b300');
});    

// $('#password').on('keyup',function(){
//     if($('#password').val() == ""){
//         $('#requiredPassword').html('');
//     }
//     else if($('#password').val().trim().match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)){
//         $('#requiredPassword').html('password strong').css('color', '#59b300');
//     }else
//         $('#requiredPassword').html('password not strong(should contain at least one digit, one lowercase, one upper case and at least contain 8)').css('color', '#e85252');
// })

// $('#password, #confirmPassword').on('keyup', function () {
    //remove *field is required* alert
    // $('#requiredPassword').html('');

    // if($('#password').val().trim() == '' && $('#confirmPassword').val().trim() == ''){
    //     return $('#passwordMatchMsg').html('');
    // }
// });  

$('#password, #confirmPassword').on('keyup', function () {
    //show alert if password inputs are same or different

    if($('#password').val().trim() == ""){
        $('#requiredPassword').html('');
    }
    else if($('#password').val().trim().match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)){
        $('#requiredPassword').html('password strong').css('color', '#59b300');
    }else{ 
        $('#requiredPassword').html('password not strong(should contain at least one digit, one lowercase, one upper case, 8 characters long and no whitespaces)').css('color', '#e85252');
        return false;
    }
    
    if($('#password').val().trim() == ""){
        $('#passwordMatchMsg').html('');
    }
    else if ($('#password').val() == $('#confirmPassword').val()) {
        $('#passwordMatchMsg').html('Matching').css('color', '#59b300');
    } else 
        $('#passwordMatchMsg').html('Not Matching').css('color', '#e85252');
});  

/* ========regular expressions for passowrd field
/^
  (?=.*\d)          // should contain at least one digit
  (?=.*[a-z])       // should contain at least one lower case
  (?=.*[A-Z])       // should contain at least one upper case
  [a-zA-Z0-9]{8,}   // should contain at least 8 from the mentioned characters
$/

*/