
valid = false;

$(document).ready(function() {

    
    $.get('http://jadran.sdsu.edu/perl/jadrn043/proj1/fetch_vendor.cgi',
        handleVendor);
        
    $('[name="sku"]').focus();
        
    $('[name="sku"]').on('blur', function() {
    	var pattern = /^[A-Z]{3}-[0-9]{3}$/;
	if(!pattern.test($('[name="sku"]').val())) {
		$('[name="sku"]').addClass("error");
		valid = false;
		return;
		}
        var url = 'http://jadran.sdsu.edu/perl/jadrn043/proj1/check_dup_sku.cgi';
        url += '?sku=' + $('[name="sku"]').val();
        $.get(url, handleSKU);
        });
    
    $(':reset').on('click', function() {
            $('[name="sku"]').removeClass("error");
            });
            
    $('[name="sku"]').on('focus', function() {
            $('[name="sku"]').removeClass("error");
	    valid = false;
            });   
	    
    $(':submit').on('click', function() {
           if(!valid) return false;
	   return true;
            });	                             
    });
        
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
        
function handleSKU(response) {
alert(response);
    if($.trim(response) == "ok") {
		valid = true;
		 document.getElementById("message").innerHTML=response;
	return;
	}
    $('[name="sku"]').addClass("error");
    }
