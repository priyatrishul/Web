
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
			
            });
			
			
			
			$('#submit_button').bind('click', function() {
			delete_form_data();

            });
				

		
});



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
	
	 
	function delete_form_data() {       
        var url = 'http://jadran.sdsu.edu/perl/jadrn043/proj1/delete_rec.cgi';
        url += '?sku=' + $('[name="sku"]').val();
        $.get(url, handleForm);
		
	}

	
	function handleForm(response){
		
		if($.trim(response) == "no") {
			location.href="http://jadran.sdsu.edu/~jadrn043/proj1/login/login.html";
			return;
		}
		if($.trim(response) == "ok") {
			
		 $('#dbase').html("Data deleted Successfully "); 
		}

        if($.trim(response) == "error") {
			$('#dbase').html(response+"deleting record");   
        }
	}
	
	
	
	
	
	
	
	
	