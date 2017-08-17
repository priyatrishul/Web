$(document).ready( function() {
    $("[name='username']").focus();

    
    $(':submit').on('click', function(e) {
        if($("[name='username']").val().trim() == "") {
            $('#status').text('Please enter your username/password.');
            $("[name='username']").focus();
            e.preventDefault(); 
            }
        else if($("[name='password']").val().trim() == "") { 
            $('#status').text('Please enter your username/password.');
            $("[name='password']").focus();
            e.preventDefault(); 
            }         
        else
            return;
        });      
    });



