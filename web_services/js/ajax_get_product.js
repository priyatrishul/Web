
valid = false;

$(document).ready(function() {
	
	$.get("/jadrn043/servlet/AjaxCheckSession",handler);
    $('#tainted').val("1");
    
    history.go(1);
    history.navigationMode = 'compatible';
    $(window).unload(function(e) { return " "; });
    
    $(window).on('beforeunload', function() {
    	$('#main').html(" ");
	});
	 
    function handler(answer) {
    	answer = $.trim(answer);
	if(answer == "OK") return;
	window.location("http://jadran.sdsu.edu/jadrn043/login.html");
	}

    
    $.get('http://jadran.sdsu.edu/jadrn043/servlet/GetVendorList',
        handleVendor);
        
    $('[name="sku"]').focus();
        
    $('[name="sku"]').on('blur', function() {
    	var pattern = /^[A-Z]{3}-[0-9]{3}$/;
	if(!pattern.test($('[name="sku"]').val())) {
		$('[name="sku"]').addClass("error");
		valid = false;
		return;
		}
        var url = 'http://jadran.sdsu.edu/jadrn043/servlet/CheckDup';
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
    response = $.trim(response);
    if(response == "not_authorized")
    	window.location("http://jadran.sdsu.edu/jadrn043/login.html");
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
    response = $.trim(response);
    if(response == "not_authorized")
    	window.location("http://jadran.sdsu.edu/jadrn043/login.html");
    if($.trim(response) == "duplicate") {
    	valid = true;
	var url = "/jadrn043/servlet/GetProductInfo?sku=" +
			$('[name="sku"]').val()
	$.get(url, handleProduct);
	return;
	}
    $('[name="sku"]').addClass("error");  
    $('#product').html("SKU was not found");      
    }
    
function handleProduct(answer) {    
	$('#product').html(answer);
	}
