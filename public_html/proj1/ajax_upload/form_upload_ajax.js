validSku = false;
validCost=false;
validRetail=false;

$(document).ready(function() {
		
    $.get('http://jadran.sdsu.edu/perl/jadrn043/proj1/fetch_vendor.cgi',
        handleVendor);
		
	$.get('http://jadran.sdsu.edu/perl/jadrn043/proj1/fetch_category.cgi',
        handleCategory);

        
    $('[name="sku"]').focus();
	$('#busyDiv').hide();
	
	$('[name="cost"]').on('blur', function() {
		var pattern = /^[0-9]+.?[0-9]*$/;
		if(!pattern.test($('[name="cost"]').val())) {
		$('[name="cost"]').addClass("error");
		$('#costError').html("Numbers only for cost and Retail");
		validCost = false;
		return;
		}
		validCost = true;
		$('[name="cost"]').removeClass("error");
			$('#costError').html("");
			return;

	});
	
	$('[name="cost"]').on('focus', function() {
            $('[name="cost"]').removeClass("error");
			
	    validCost = false;
            });  
			
	$('[name="retail"]').on('blur', function() {
		var pattern = /^[0-9]+.?[0-9]*$/;
		if(!pattern.test($('[name="retail"]').val())) {
		$('[name="retail"]').addClass("error");
		$('#costError').html("Numbers only for cost and Retail");
		validRetail = false;
		return;
		}
		validRetail = true;
		$('[name="retail"]').removeClass("error");
			$('#costError').html("");
			return;

	});
	
	$('[name="retail"]').on('focus', function() {
            $('[name="retail"]').removeClass("error");
			
	    validRetail = false;
            }); 
	
        
    $('[name="sku"]').on('blur', function() {
    	var pattern = /^[A-Z]{3}-[0-9]{3}$/;
	if(!pattern.test($('[name="sku"]').val())) {
		$('[name="sku"]').addClass("error");
		$('#skuerror').html("Invalid or Empty SKU");
		valid = false;
		return;
		}
        var url = 'http://jadran.sdsu.edu/perl/jadrn043/proj1/check_dup_sku.cgi';
        url += '?sku=' + $('[name="sku"]').val();
        $.get(url, handleSKU);
        });
    
    $(':reset').on('click', function() {
            $('[name="sku"]').removeClass("error");
			$('#status').html("");
			$('#pic').html("");
			$('#skuerror').html("");
			$('#info').html("");
			$('#dbase').html("");
            });
            
    $('[name="sku"]').on('focus', function() {
            $('[name="sku"]').removeClass("error");
	    valid = false;
            });   
	    
               

		$('#submit_button').bind('click', function() {
			if(valid && validCost && validRetail && ($('[name="sku"]').val()!="") && ($('[name="vendor"]').val()>='1') && ($('[name="category"]').val()>='1') && 
			($('[name="vendor_model"]').val()!="") && ($('[name="description"]').val()!="") && ($('[name="features"]').val()!="") && 
			($('[name="cost"]').val()!="") &&($('[name="retail"]').val()!="") && ($('[name="product_image"]').val()!="")){
			$('#info').html("");	
			$('#busyDiv').show();	
			processUpload();
			}
			else
				showError();
            });
    });
	
	function showError() {

	$('#info').html("One or more Fields are empty");
	}
        
	function handleVendor(response) {
		var items = response.split('||');
		var vendorHandle = $('[name="vendor"]');
		vendorHandle.append($('<option value="0">Select Vendor</option>'))
		for(i=0; i < items.length; i++) {
        var pairs = items[i].split('=');     
        vendorHandle.append($('<option></option>').
            attr('value',pairs[0]).text(pairs[1]));
            }
    }
		
		
		
	function handleCategory(response) {
		var items = response.split('||');
		var categoryHandle = $('[name="category"]');
		categoryHandle.append($('<option value="0">Select Category</option>'))
		for(i=0; i < items.length; i++) {
        var pairs = items[i].split('=');     
        categoryHandle.append($('<option></option>').
            attr('value',pairs[0]).text(pairs[1]));
        }
    }
        
	function handleSKU(response) {

		if($.trim(response) == "ok") {
			valid = true;
			$('#skuerror').html("");
			return;
			}
		$('[name="sku"]').addClass("error");
		$('#skuerror').html("SKU already exits");
    }
	
	

	function processUpload() {	
        send_file();    // picture upload takes longer, get it going
        send_form_data();
		$('#busyDiv').hide();
        }
        
    function send_form_data() {       
        var url = 'http://jadran.sdsu.edu/perl/jadrn043/proj1/insert_to_database.cgi';
        url += '?sku=' + $('[name="sku"]').val()+'&vendor=' + $('[name="vendor"]').val()+'&category=' + $('[name="category"]').val()+
		'&vendor_model=' + $('[name="vendor_model"]').val()+'&description=' + $('[name="description"]').val()+'&features=' + $('[name="features"]').val()+
		'&cost=' + $('[name="cost"]').val()+'&retail=' + $('[name="retail"]').val()+
		'&product_image=' + $('[name="product_image"]').val();
        $.get(url, handleForm);
		
	}
	
	function handleForm(response){
		
		if($.trim(response) == "no") {
			location.href="http://jadran.sdsu.edu/~jadrn043/proj1/login/login.html";
			return;
		}
		if($.trim(response) == "ok") {
		 $('#dbase').html("Data Successfully Inserted"); 
		}

        if($.trim(response) == "error") {
					 $('#dbase').html(response);   
        }
	}        
        
    function send_file() {    
        var form_data = new FormData($('form')[0]);       
        form_data.append("image", document.getElementById("product_image").files[0]);
        $.ajax( {
            url: "/perl/jadrn043/proj1/upload.cgi",
            type: "post",
            data: form_data,
            processData: false,
            contentType: false,
            success: function(response) {
				 if($.trim(response) == "no") {
					location.href="http://jadran.sdsu.edu/~jadrn043/proj1/login/login.html";
					return;
					}
               $('#status').css('color','blue');
               $('#status').html("Your file has been received.");
               var fname = $("#product_image").val().toLowerCase();
               var toDisplay = "<img src=\"/~jadrn043/proj1/ajax_upload/_product_visual/" + fname + "\" />";               
               $('#pic').html(toDisplay);
                },
            error: function(response) {
				if($.trim(response) == "no") {
					location.href="http://jadran.sdsu.edu/~jadrn043/proj1/login/login.html";
					return;
					}
               $('#status').css('color','red');
               $('#status').html("Sorry, an upload error occurred, "+response.statusText);
                }
            });
        }
		

		
	