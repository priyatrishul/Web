/*  Form processing with AJAX.  The file upload function is done with
    jQuery.  The form data other than the image is handled manually.
    Alan Riggins
    CS645 Spring 2015
*/    

    $(document).ready(function()  {
        $('#submit_button').bind('click', function() {
    	$('#busyDiv').show();	
        processUpload();
            }
        );});

    function processUpload() {
        send_file();    // picture upload takes longer, get it going
        send_form_data();
        }
        
    function send_form_data() {
        var loc = $('input:text[name=location]').val();
        var dt = $('input:text[name=date]').val();
        var taker = $('input:text[name=photographer]').val();        
        var url = "/perl/jadrn000/proj1/ajax_upload/ajax_echo.cgi";
        url += "?location="+loc+"&date=" + dt + "&photographer="+taker;
        var req = new HttpRequest(url, handleData);
        req.send();
        }
        
    function handleData(response) {
        $('#status').css('color','blue');
        $('#answer').html(response);  
    	$('#busyDiv').hide();	         
               }
        
    function send_file() {    
        var form_data = new FormData($('form')[0]);       
        form_data.append("image", document.getElementById("product_image").files[0]);
        $.ajax( {
            url: "/perl/jadrn000/proj1/ajax_upload/upload.cgi",
            type: "post",
            data: form_data,
            processData: false,
            contentType: false,
            success: function(response) {
               $('#status').css('color','blue');
               $('#status').html("Your file has been received.");
               var fname = $("#product_image").val().toLowerCase();
               var toDisplay = "<img src=\"/~jadrn000/proj1_examples/ajax_upload/_p_images/" + fname + "\" />";               
               $('#pic').html(toDisplay);
                },
            error: function(response) {
               $('#status').css('color','red');
               $('#status').html("Sorry, an upload error occurred, "+response.statusText);
                }
            });
        }
