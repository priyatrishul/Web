
validSku=false;
fileName="";
$(document).ready(function() {
	
	$.get('http://jadran.sdsu.edu/perl/jadrn043/proj1/fetch_vendor.cgi',
        handleVendor);
		
	$.get('http://jadran.sdsu.edu/perl/jadrn043/proj1/fetch_category.cgi',
        handleCategory);

    document.getElementById("sch_button").addEventListener("click", function() {
        fetch_form_data();
        }); 
		
		$('#sku').focus();
		$('#busyDiv').hide();
		
		hide_labels();
		
		$(':reset').on('click', function() {
            hide_labels();
			$('#skuerror').html("");
			$('#status').html("");
			$('#dbase').html("");
			document.getElementById("sku").readOnly=false;
			$('#sku').focus();
			fileName="";
            });
			
			
			
$('#submit_button').bind('click', function() {
	
	if(($('[name="sku"]').val()!="") && ($('[name="vendor"]').val()>='1') && ($('[name="category"]').val()>='1') && 
			($('[name="vendor_model"]').val()!="") && ($('[name="description"]').val()!="") && ($('[name="features"]').val()!="") && 
			($('[name="cost"]').val()!="") &&($('[name="retail"]').val()!="")){
			$('#info').html("");	
			$('#busyDiv').show();
				
			check();
			}
			else
				showUpdateError();

            });
				

		
});

	function check(){
		
		if($('[name="product_image"]').val()!=""){
			
			update_form_data();
			send_file();
			$('#busyDiv').hide();
			
		}
		else{
			
			
			update_form_data1();
			$('#busyDiv').hide();
		}
	}	
	
	function showUpdateError() {

	$('#info').html("One or more Fields are empty");
	}


function hide_labels(){
		$('#vendor').hide();
		$('#category').hide();
		$('#vendor_model').hide();
		$('#description').hide();
		$('#features').hide();
		$('#cost').hide();
		$('#retail').hide();
		$('#product_image').hide();
		$('#l1').hide();
		$('#l2').hide();
		$('#l3').hide();
		$('#l4').hide();
		$('#l5').hide();
		$('#l6').hide();
		$('#l7').hide();
		$('#l8').hide();
		$('#clear_button').hide();
		$('#submit_button').hide();
		$('#pic').html("");
}


function display_labels(){
		$('#vendor').show();
		$('#category').show();
		$('#vendor_model').show();
		$('#description').show();
		$('#features').show();
		$('#cost').show();
		$('#retail').show();
		$('#product_image').show();
		$('#l1').show();
		$('#l2').show();
		$('#l3').show();
		$('#l4').show();
		$('#l5').show();
		$('#l6').show();
		$('#l7').show();
		$('#l8').show();
		$('#clear_button').show();
		$('#submit_button').show();
}

function fetch_form_data() {
	
		var url = 'http://jadran.sdsu.edu/perl/jadrn043/proj1/fetch_sku_record.cgi';
        url += '?sku=' + $('[name="sku"]').val();
        $.get(url, handleRecord);
		
    }
	
	function handleRecord(response) {
		if($.trim(response) == "no") {
			location.href="http://jadran.sdsu.edu/~jadrn043/proj1/login/login.html";
			return;
		}

		if(response) {
			display_labels();
			var values = new Array();
			var records = new Array();    
			records = response.split("||");
			for(i=0; i < records.length; i++) {
			var fields = new Array();
			fields = records[i].split("|");
			for(j=0; j < fields.length; j++) 
				values[j]=fields[j];
			}	
		
		$('[name="vendor"]').val(values[1]);
		$('[name="category"]').val(values[2]);
		$('[name="vendor_model"]').val(values[3]);
		$('[name="description"]').val(values[4]);
		$('[name="features"]').val(values[5]);
		$('[name="cost"]').val(values[6]);
		$('[name="retail"]').val(values[7]);
		fileName=values[8].toLowerCase();
		
		var toDisplay = "<img src=\"/~jadrn043/proj1/ajax_upload/_product_visual/" + fileName + "\" />"; 
		$('#pic').html(toDisplay);
		$('#skuerror').html("");
		document.getElementById("sku").readOnly=true;
			}else{
		$('[name="sku"]').addClass("error");
		$('#skuerror').html("SKU does not exits");
			}
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
		
		
	function update_form_data() {       
        var url = 'http://jadran.sdsu.edu/perl/jadrn043/proj1/update_record.cgi';
        url += '?sku=' + $('[name="sku"]').val()+'&vendor=' + $('[name="vendor"]').val()+'&category=' + $('[name="category"]').val()+
		'&vendor_model=' + $('[name="vendor_model"]').val()+'&description=' + $('[name="description"]').val()+'&features=' + $('[name="features"]').val()+
		'&cost=' + $('[name="cost"]').val()+'&retail=' + $('[name="retail"]').val()+
		'&product_image=' + $('[name="product_image"]').val();
        $.get(url, handleForm);
		
	}
	
	function update_form_data1() {       
        var url = 'http://jadran.sdsu.edu/perl/jadrn043/proj1/update_record.cgi';
        url += '?sku=' + $('[name="sku"]').val()+'&vendor=' + $('[name="vendor"]').val()+'&category=' + $('[name="category"]').val()+
		'&vendor_model=' + $('[name="vendor_model"]').val()+'&description=' + $('[name="description"]').val()+'&features=' + $('[name="features"]').val()+
		'&cost=' + $('[name="cost"]').val()+'&retail=' + $('[name="retail"]').val()+
		'&product_image=' + fileName;
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
			$('#dbase').html(response+"updating record");   
        }
	}
	
	
	
	
	
	
	
	
	