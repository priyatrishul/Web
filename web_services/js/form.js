valid = false;
valid1 = false;
validQty=false;
validQty1=false;
validDate=false;
validDate1=false;
on_hand=0;
on_hand1=0;
sku_on_hand=null;
sku_on_hand1=null;

$(document).ready( function() {
	
	$('[name="sku"]').focus();	
	$("#datepicker").datepicker({ dateFormat: 'yy-mm-dd' });
    $("#datepicker").datepicker("setDate", new Date);
	$("#datepicker1").datepicker({ dateFormat: 'yy-mm-dd' });
    $("#datepicker1").datepicker("setDate", new Date);
	$( "#accordion" ).accordion({
     
    });
	
    $("#tabs").tabs();  
	$( "#accordion" ).accordion({
      
    });
	$( "#accordion" ).hide();
  
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
	location.href("http://jadran.sdsu.edu/jadrn043/login.html");
	}


    $.get('http://jadran.sdsu.edu/jadrn043/servlet/GetVendorList',
        handleVendor);
		
	 $.get('http://jadran.sdsu.edu/jadrn043/servlet/GetCategoryList',
        handleCategory);
        

  /* check valid Sku------------------------------------------*/      
  
    $('[name="sku"]').on('blur', function() {
    	var pattern = /^[A-Z]{3}-[0-9]{3}$/;
	if(!pattern.test($('[name="sku"]').val())) {
		$('[name="sku"]').addClass("error");
		$('[name="vendor"]').val(0);
		$('[name="category"]').val(0);
		$('[name="model"]').val("");
		$('[name="qty"]').val("");	
		$('#pic').html("");
		
		valid = false;
		return;
		}
        var url = 'http://jadran.sdsu.edu/jadrn043/servlet/CheckDup';
        url += '?sku=' + $('[name="sku"]').val();
		$('#message').html("");
        $.get(url, handleSKU);
        });
		
		$('[name="sku1"]').on('blur', function() {
    	var pattern = /^[A-Z]{3}-[0-9]{3}$/;
		if(!pattern.test($('[name="sku1"]').val())) {
		$('[name="sku1"]').addClass("error");
		$('[name="vendor1"]').val(0);
		$('[name="category1"]').val(0);
		$('[name="model1"]').val("");
		$('[name="qty1"]').val("");	
		$('#pic1').html("");
			
		valid1 = false;
		return;
		}
        var url = 'http://jadran.sdsu.edu/jadrn043/servlet/CheckDup';
        url += '?sku=' + $('[name="sku1"]').val();
		$('#message1').html("");
        $.get(url, handleSKU1);
        });
	

/* check valid Quantity---------------------------*/     
	
	
	$('[name="qty"]').on('blur', function() {
    	var pattern = /^[1-9][0-9]*$/;		
	if(!pattern.test($('[name="qty"]').val())) {
		$('[name="qty"]').addClass("error");
		$('#message').html("Invalid Quantity type");
		validQty = false;
		return;
		}
		validQty = true;
		 $('#message').html("");
		 $('[name="qty"]').removeClass("error");
		});
    
	$('[name="qty1"]').on('blur', function() {
    	var pattern = /^[1-9][0-9]*$/;		
	if(!pattern.test($('[name="qty1"]').val())) {
		$('[name="qty1"]').addClass("error");
		$('#message1').html("Invalid Quantity type");
		validQty1 = false;
		return;
		}
		validQty1 = true;
		 $('#message1').html("");
		 $('[name="qty1"]').removeClass("error");
		});
	
	 /* check valid date*/  
	 
	/* $("#datepicker").on('blur', function() {
    	var validformat=/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;
		if (!validformat.test($("#datepicker").val())){
			$("#datepicker").addClass("error");
			$('#message').html("Invalid date");		
		}
	else{ 
		var monthfield=$("#datepicker").val().split("-")[1];
		var dayfield=$("#datepicker").val().split("-")[2];
		var yearfield=$("#datepicker").val().split("-")[0];
		var dayobj = new Date(yearfield, monthfield-1, dayfield);
		if ((dayobj.getMonth()+1!=monthfield)||(dayobj.getDate()!=dayfield)||(dayobj.getFullYear()!=yearfield)){
		$("#datepicker").addClass("error");
		$('#message').html("Invalid date");
		}
		else{
		validDate=true;
		$("#datepicker").removeClass("error");}
		$('#message').html("");
		}
		});
		
		
		 $("#datepicker1").on('blur', function() {
    	var validformat=/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;
		if (!validformat.test($("#datepicker1").val())){
			$("#datepicker1").addClass("error");
			$('#message1').html("Invalid date");		
		}
	else{ 
		var monthfield=$("#datepicker1").val().split("-")[1];
		var dayfield=$("#datepicker1").val().split("-")[2];
		var yearfield=$("#datepicker1").val().split("-")[0];
		var dayobj = new Date(yearfield, monthfield-1, dayfield);
		if ((dayobj.getMonth()+1!=monthfield)||(dayobj.getDate()!=dayfield)||(dayobj.getFullYear()!=yearfield)){
		$("#datepicker1").addClass("error");
		$('#message1').html("Invalid date");
		}
		else{
		validDate=true;
		$("#datepicker1").removeClass("error");}
		$('#message1').html("");
		}
		});*/
	
/*------------------------------------------------------------------------*/	
    $(':reset').on('click', function() {
            $('[name="sku"]').removeClass("error");
			 $('#message').html("");
			  $('#pic').html("");
			   $('[name="sku1"]').removeClass("error");
			 $('#message1').html("");
			  $('#pic1').html("");
			  $('[name="sku"]').focus();
			  $('[name="sku1"]').focus();
			  valid = false;
			valid1 = false;
			validQty=false;
			validQty1=false;
			validDate=false;
			validDate1=false;
			on_hand=0;
			on_hand1=0;
			sku_on_hand=null;
			sku_on_hand1=null;
			setDate();
            });
            
    $('[name="sku"]').on('focus', function() {
            $('[name="sku"]').removeClass("error");
	    valid = false;
            });   
	    
	 $('[name="sku1"]').on('focus', function() {
            $('[name="sku1"]').removeClass("error");
	    valid1 = false;
            }); 
			
		$("#datepicker").on('focus', function() {
            $("#datepicker").removeClass("error");
	    validDate = false;
            }); 
			
			
			$("#datepicker1").on('focus', function() {
            $("#datepicker1").removeClass("error");
	    validDate1 = false;
            }); 
			
/*submit ------------------------------------------------------------------------------*/
			
	$('#submit_button').bind('click', function() {
				checkValidDate($("#datepicker").val());
				
				if($('[name="sku"]').val()==""){
					 $('#message').html("SKU is empty");					
				}
				if($("#datepicker").val()==""){
					 $('#message').html("date is empty");					
				}
				if($('[name="qty"]').val()==""){
					 $('#message').html("Quantity is empty");				
				}
				if(validDate && valid && validQty && ($('[name="sku"]').val()!="") && ($("#datepicker").val()!="") && ($('[name="qty"]').val()!="")){
					updateTables();
					reset();
					$( "#accordion" ).show();
					$( "#accordion" ).fadeOut(15000);
				
					}
				
			});
			
	
		$('#submit_button1').bind('click', function() {
				checkValidDate1($("#datepicker1").val());
				
				if($('[name="sku1"]').val()==""){
					 $('#message1').html("SKU is empty");					
				}
				if($("#datepicker1").val()==""){
					 $('#message1').html("date is empty");					
				}
				if($('[name="qty1"]').val()==""){
					 $('#message1').html("Quantity is empty");				
				}
				if(Number(on_hand1) >= Number($('[name="qty1"]').val())){
				if(validDate1 && valid1 && validQty1 && ($('[name="sku1"]').val()!="") && ($("#datepicker1").val()!="") && ($('[name="qty1"]').val()!=""))
				{
					updateTables1();
					reset();
					$( "#accordion" ).show();
					$( "#accordion" ).fadeOut(15000);
					
				}
				}
				else{
					 $('#message1').html("Stock on hand is "+on_hand1);	
				}
				
			});
	
	
                                
    });
	

	
	
/* handlers--------------------------------------------------------------------------------------------------*/

	function setDate(){
		$("#datepicker").datepicker({ dateFormat: 'yy-mm-dd' });
		 $("#datepicker").datepicker("setDate", new Date);
	}
	function reset(){
		document.getElementById("Form1").reset();
		$('[name="sku"]').removeClass("error");
			 $('#message').html("");
			  $('#pic').html("");
			   $('[name="sku1"]').removeClass("error");
			 $('#message1').html("");
			  $('#pic1').html("");
			valid = false;
			valid1 = false;
			validQty=false;
			validQty1=false;
			validDate=false;
			validDate1=false;
			on_hand=0;
			on_hand1=0;
			sku_on_hand=null;
			sku_on_hand1=null;
			$('[name="sku"]').focus();
			$('[name="sku1"]').focus();
	}
	function checkValidDate(value){
		var validformat=/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;
		if (!validformat.test(value)){
			$("#datepicker").addClass("error");

		}
	else{ 
		var monthfield=value.split("-")[1];
		var dayfield=value.split("-")[2];
		var yearfield=value.split("-")[0];
		var dayobj = new Date(yearfield, monthfield-1, dayfield);
		if ((dayobj.getMonth()+1!=monthfield)||(dayobj.getDate()!=dayfield)||(dayobj.getFullYear()!=yearfield)){
		$("#datepicker").addClass("error");

		}
		else{
		validDate=true;
		$("#datepicker").removeClass("error");}
		$('#message').html("");
		}
		
		
	}
	
	function checkValidDate1(value){
		var validformat=/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;
		if (!validformat.test(value)){
			$("#datepicker1").addClass("error");

		}
	else{ 
		var monthfield=value.split("-")[1];
		var dayfield=value.split("-")[2];
		var yearfield=value.split("-")[0];
		var dayobj = new Date(yearfield, monthfield-1, dayfield);
		if ((dayobj.getMonth()+1!=monthfield)||(dayobj.getDate()!=dayfield)||(dayobj.getFullYear()!=yearfield)){
		$("#datepicker1").addClass("error");

		}
		else{
		validDate1=true;
		$("#datepicker1").removeClass("error");}
		$('#message1').html("");
		}
		
		
	}
	
	function updateTables(){
		
		 var url = 'http://jadran.sdsu.edu/jadrn043/servlet/UpdateMerchandiseIn';
			url += '?sku=' + $('[name="sku"]').val()+'&date='+$("#datepicker").val()+'&qty='+$('[name="qty"]').val();
			$.get(url, handleMerchIn);
		if(sku_on_hand==null){
			
		var url = 'http://jadran.sdsu.edu/jadrn043/servlet/InsertOnHand';
			url += '?sku=' + $('[name="sku"]').val()+'&date='+$("#datepicker").val()+'&qty='+$('[name="qty"]').val();
			$.get(url, handInsert);			
			}
		else{
			var total=Number(on_hand)+Number($('[name="qty"]').val());
									
			var url = 'http://jadran.sdsu.edu/jadrn043/servlet/UpdateOnHand';
			url += '?sku=' + $('[name="sku"]').val()+'&date='+$("#datepicker").val()+'&qty='+total;
			$.get(url, handUpdate);
		}
	}
	function handleMerchIn(answer){
		answer = $.trim(answer);
	if(answer == "not_authorized")
		location.href("http://jadran.sdsu.edu/jadrn043/login.html");
	 result1=answer;
	 if(result1==-1){$('#1').html("Error updating Merchandise Table");}
	 else{$('#1').html("Inventory Received Successfully ");}
		
	}
	function handInsert(answer){
		answer = $.trim(answer);
	if(answer == "not_authorized")
		location.href("http://jadran.sdsu.edu/jadrn043/login.html");
		result2=answer;
		if(result2==-1){$('#2').html("Error inserting On_hand Table");}
	 else{$('#2').html("Successfully inserted into on_hand table");}
		
	}
	function handUpdate(answer){
		answer = $.trim(answer);
	if(answer == "not_authorized")
		location.href("http://jadran.sdsu.edu/jadrn043/login.html");
		result3=answer;	
	if(result3==-1){$('#2').html("Error updating On_hand Table");}
	 else{$('#2').html("Successfully updated  on_hand table");}		
	}
	
	
	function updateTables1(){
		
		 var url = 'http://jadran.sdsu.edu/jadrn043/servlet/UpdateMerchandiseOut';
			url += '?sku=' + $('[name="sku1"]').val()+'&date='+$("#datepicker1").val()+'&qty='+$('[name="qty1"]').val();
			$.get(url, handleMerchOut);
	
			var total=Number(on_hand1)-Number($('[name="qty1"]').val());
			
									
			var url = 'http://jadran.sdsu.edu/jadrn043/servlet/UpdateOnHand';
			url += '?sku=' + $('[name="sku1"]').val()+'&date='+$("#datepicker1").val()+'&qty='+total;
			$.get(url, handUpdate1);
		
	}
	function handleMerchOut(answer){
		answer = $.trim(answer);
	if(answer == "not_authorized")
		location.href("http://jadran.sdsu.edu/jadrn043/login.html");
	 result4=answer;
	 if(result4==-1){$('#1').html("Error updating Merchandise_Out Table");}
	 else{$('#1').html("Inventory Sent Out Successfully");}	
		
	}

	function handUpdate1(answer){
		answer = $.trim(answer);
	if(answer == "not_authorized")
		location.href("http://jadran.sdsu.edu/jadrn043/login.html");
		result5=answer;	
	if(result5==-1){$('#2').html("Error updating On_hand Table");}
	 else{$('#2').html("Successfully updated  on_hand table");}			
	}
        
function handleVendor(response) {
    response = $.trim(response);
    if(response == "not_authorized")
    	location.href("http://jadran.sdsu.edu/jadrn043/login.html");
    var items = response.split('||');
    var vendorHandle = $('[name="vendor"]');
    vendorHandle.append($('<option value="0">Select Vendor</option>'))
    for(i=0; i < items.length; i++) {
        var pairs = items[i].split('=');     
        vendorHandle.append($('<option></option>').
            attr('value',pairs[0]).text(pairs[1]));
            }
			 var vendorHandle1 = $('[name="vendor1"]');
    vendorHandle1.append($('<option value="0">Select Vendor</option>'))
    for(i=0; i < items.length; i++) {
        var pairs = items[i].split('=');     
        vendorHandle1.append($('<option></option>').
            attr('value',pairs[0]).text(pairs[1]));
            }
        }
        
		
function handleCategory(response) {
    response = $.trim(response);
    if(response == "not_authorized")
	location.href("http://jadran.sdsu.edu/jadrn043/login.html");
    var items = response.split('||');
    var categoryHandle = $('[name="category"]');
    categoryHandle.append($('<option value="0">Select Category</option>'))
    for(i=0; i < items.length; i++) {
        var pairs = items[i].split('=');     
        categoryHandle.append($('<option></option>').
            attr('value',pairs[0]).text(pairs[1]));
            }
	var categoryHandle1 = $('[name="category1"]');
    categoryHandle1.append($('<option value="0">Select Category</option>'))
    for(i=0; i < items.length; i++) {
        var pairs = items[i].split('=');     
        categoryHandle1.append($('<option></option>').
            attr('value',pairs[0]).text(pairs[1]));
            }
        }
		
		
function handleSKU(response) {
    response = $.trim(response);
    if(response == "not_authorized")
    	location.href("http://jadran.sdsu.edu/jadrn043/login.html");
    if($.trim(response) == "duplicate") {
    	valid = true;
	var url = "/jadrn043/servlet/GetProductInfo?sku=" +
			$('[name="sku"]').val()
	$.get(url, handleProduct);
	var url = "/jadrn043/servlet/GetOnHand?sku=" +
			$('[name="sku"]').val()
	$.get(url, handleOnHand);
	return;
	}
    $('[name="sku"]').addClass("error");  
    $('#message').html("SKU was not found");   
	$('[name="vendor"]').val(0);
	$('[name="category"]').val(0);
	$('[name="model"]').val("");
	$('[name="qty"]').val("");	
	$('#pic').html("");
    }
	

function handleProduct(answer) { 
	answer = $.trim(answer);
	if(answer == "not_authorized")
		location.href("http://jadran.sdsu.edu/jadrn043/login.html"); 
	var tbl =answer;
	$('[name="vendor"]').val($(tbl).find('td').eq(1).text());
	$('[name="category"]').val($(tbl).find('td').eq(2).text());
	$('[name="model"]').val($(tbl).find('td').eq(3).text());
	var fileName=$(tbl).find('td').eq(5).text().toLowerCase();
	var toDisplay = "<img src=\"/~jadrn043/proj1/ajax_upload/_product_visual/" + fileName.toLowerCase() + "\" width=\"200\" height=\"270\"/>"; 
	$('#pic').html(toDisplay);
	$("#datepicker").datepicker("setDate", new Date);
	
	}
function handleOnHand(answer) {  
	answer = $.trim(answer);
	if(answer == "not_authorized")
		location.href("http://jadran.sdsu.edu/jadrn043/login.html");
	var tbl =answer;
	if($(tbl).find('td').eq(1).text()!="" && $(tbl).find('td').eq(1).text()!=null){
	sku_on_hand=$(tbl).find('td').eq(0).text();
	on_hand=$(tbl).find('td').eq(1).text();	

	}
	
	}
	
//------------------------------------------------------merchandise _out code-------------------------------------------------------

	function handleSKU1(response) {
    response = $.trim(response);
    if(response == "not_authorized")
    	location.href("http://jadran.sdsu.edu/jadrn043/login.html");
    if($.trim(response) == "duplicate") {
    	valid1 = true;
	var url = "/jadrn043/servlet/GetProductInfo?sku=" +
			$('[name="sku1"]').val()
	$.get(url, handleProduct1);
	var url = "/jadrn043/servlet/GetOnHand?sku=" +
			$('[name="sku1"]').val()
	$.get(url, handleOnHand1);
	return;
	}
    $('[name="sku1"]').addClass("error");  
    $('#message1').html("SKU was not found"); 
	$('[name="vendor1"]').val(0);
	$('[name="category1"]').val(0);
	$('[name="model1"]').val("");
	$('[name="qty1"]').val("");	
	$('#pic1').html("");	
    }
    
function handleProduct1(answer) {  
	answer = $.trim(answer);
	if(answer == "not_authorized")
		location.href("http://jadran.sdsu.edu/jadrn043/login.html");
	var tbl =answer;    	
	$('[name="vendor1"]').val($(tbl).find('td').eq(1).text());
	$('[name="category1"]').val($(tbl).find('td').eq(2).text());
	$('[name="model1"]').val($(tbl).find('td').eq(3).text());
	var fileName=$(tbl).find('td').eq(5).text().toLowerCase();
	var toDisplay = "<img src=\"/~jadrn043/proj1/ajax_upload/_product_visual/" + fileName.toLowerCase() + "\" width=\"200\" height=\"270\"/>"; 
	$('#pic1').html(toDisplay);
	$("#datepicker1").datepicker("setDate", new Date);
	
	}
function handleOnHand1(answer) {  
	answer = $.trim(answer);
	if(answer == "not_authorized")
		location.href("http://jadran.sdsu.edu/jadrn043/login.html");
	var tbl =answer;
	if($(tbl).find('td').eq(1).text()!="" && $(tbl).find('td').eq(1).text()!=null){
	sku_on_hand1=$(tbl).find('td').eq(0).text();
	on_hand1=$(tbl).find('td').eq(1).text();
	
	
	}
	
	}

