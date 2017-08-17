var products;
validQty = true;
$(document).ready(function() {	
			var cart = new shopping_cart("jadrn043");
			$('#count').text(cart.size()); 
			
	$(function() {
			$("#dialog").dialog({
				height: 500,
				width: 500,
				modal: true,
				autoOpen: false
			});
			$("#dialog1").dialog({
				height: 300,
				width: 300,
				modal: true,
				autoOpen: false
			});
			$("#checkout").on("click", function() {
				$("#dialog").dialog("open");
			});
		});
		
		$('#chk').on("click", function() {
			if( document.getElementById("chk").checked==true){
			$('[name="name1"]').val($('[name="name"]').val());
			$('[name="address1"]').val($('[name="address"]').val());
			$('[name="city1"]').val($('[name="city"]').val());
			$('[name="state1"]').val($('[name="state"]').val());
			$('[name="zip1"]').val($('[name="zip"]').val());			
		}	
			if( document.getElementById("chk").checked==false){
				$('[name="name1"]').val("");
			$('[name="address1"]').val("");
			$('[name="city1"]').val("");
			$('[name="state1"]').val("");
			$('[name="zip1"]').val("");
			}				
			});
			
		$('#placeOrder').on("click", function() {
			
				if($('[name="name"]').val()==""||$('[name="address"]').val()==""||$('[name="city"]').val()==""||$('[name="state"]').val()==""||$('[name="zip"]').val()==""||
				$('[name="name1"]').val()==""||$('[name="address1"]').val()==""||$('[name="city1"]').val()==""||$('[name="state1"]').val()==""||$('[name="zip1"]').val()==""||
				$('[name="cctype"]').val()==""||$('[name="ccnum"]').val()==""||$('[name="ccdate"]').val()==""||$('[name="ccode"]').val()=="")
				{
				
				}
				else{
					if( document.getElementById("chk").checked==true){
				$('[name="name1"]').val($('[name="name"]').val());
				$('[name="address1"]').val($('[name="address"]').val());
				$('[name="city1"]').val($('[name="city"]').val());
				$('[name="state1"]').val($('[name="state"]').val());
				$('[name="zip1"]').val($('[name="zip"]').val());			
						}	
				var cartArray = cart.getCartArray();
				 //update tables
				 for(j=0;j <cartArray.length; j++){
					 
					  var url = 'http://jadran.sdsu.edu/jadrn043/servlet/UpdateMO';
						var d = new Date();
						var n =  d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
					url += '?sku=' + cartArray[j][0]+'&date='+n+'&qty='+cartArray[j][1];
						$.get(url, handleMerchOut);	
						var totalrem=Number(cartArray[j][5])-Number(cartArray[j][1]);												
						var url1 = 'http://jadran.sdsu.edu/jadrn043/servlet/UpdateOnH';
						url1 += '?sku=' + cartArray[j][0]+'&date='+n+'&qty='+totalrem;
						$.get(url1, handUpdate);
						
						
				 }
				 
				var nameArray=new Array();
				
				 for(i=0; i <cartArray.length; i++) {
					 nameArray.push(cartArray[i][0]);
											 
				 }	
				 
				 for(k=0; k<nameArray.length; k++) {					
					var name=$.trim(nameArray[k]);						
					cart.delete(name);						
									
				 }
				
				 
					$('#count').text(cart.size());					
					$("#dialog").dialog("close");
					$("#dialog1").dialog("open");
					
			
					var noData='<h2>Currently there are no items in your cart</h2>' ;
					noData+='<a href="/jadrn043/proj31.html" style="text-decoration:none"><input type="button" value="Continue Shopping"</input><a>';
					$('#cart1').html(noData); 
					$('#cart2').html("");
					document.getElementById("checkout").style.display='none';
					document.getElementById("continue1").style.display='none';
					
					
				}
			});
			
			function handleMerchOut(answer){
						answer = $.trim(answer);
						
		
							}

						function handUpdate(answer){
							answer = $.trim(answer);
							
										
							}
			
			
			$('#cancelOrder').on("click", function() {
				
					$("#dialog").dialog("close");
				
			});
		
			

        var cartArray = cart.getCartArray();
		if(cartArray.length==0){
			var noData='<h2>Currently there are no items in your cart</h2>' ;
			noData+='<a href="/jadrn043/proj31.html" style="text-decoration:none"><input type="button" value="Continue Shopping"</input><a>';			
			$('#cart1').html(noData); 
			$('#cart2').html(""); 
			 document.getElementById("checkout").style.display='none';
			 document.getElementById("continue1").style.display='none';
		}
		else{
        var toWrite = '<table  id="cartTable"  border="4"  cellspacing="4" width="600">';
		toWrite += "<tr><th>Product</th><th>Quantity</th><th>Product Name</th><th>Cost</th>";
		var price=0;
        for(i=0; i < cartArray.length; i++) {
            toWrite += "<tr>";
			
           //sku toWrite += "<td>"+cartArray[i][0]+"</td>";
		   price=Number(price)+(Number(cartArray[i][3])*Number(cartArray[i][1]));
		   
		   var toDisplay = '<img src="/~jadrn043/proj1/ajax_upload/_product_visual/' + cartArray[i][4].toLowerCase() +'" style="float:left;width:100px;height:120px"/>'; 
			toWrite += "<td>"+toDisplay+"</td>";
            toWrite +='<td><input type="text" id="cartQty'+i+'" value="'+cartArray[i][1]+'" size="4"/></td>'; 
			toWrite += "<td>"+cartArray[i][2]+"</td>";
            toWrite += "<td>"+cartArray[i][3]+"</td>"; 
			toWrite += '<td><input type="button" id="id'+i+'" value="Delete"></td>'; 
						
            toWrite += "</tr>";
            }
        toWrite += "</table>"; 		
        $('#cart1').html(toWrite); 
        $('#count').text(cart.size());  
		
		for(i=0; i < cartArray.length; i++) {
			attach_click(i,cartArray[i][0]);
			attach_blur(i,cartArray[i][0],cartArray[i][5]);
		}	
		
		 $('#cart2').html("");
			var totTable='<h2>Total Price Summary<h2>';
			totTable+='<table  id="totalTable"  border="4"  cellspacing="4" width="300">';
			totTable+='<tr><td>Products</td><td>'+price+'</td></tr>';
			totTable+='<tr><td>Shipping+taxes</td><td>'+(((8/100)*Number(price))+5).toFixed(2)+'</td></tr>';
			totTable+='</table>';
			totTable+='Total:'+(Number(price)+((8/100)*Number(price))+5).toFixed(2);
				
			$('#cart2').html(totTable); 
		}
		
		function attach_click(index,sku){
			$('#id'+index).bind('click', function() {			
			 sku = $.trim(sku);
			 $(function(){
				 var cartArray = cart.getCartArray();
				 var price=0;
				 for(i=0; i < cartArray.length; i++) {
				  if(cartArray[i][0] == sku) {						
						cart.delete(sku);						
						 $('#cart1').html("");
						var cartArray = cart.getCartArray();
						if(cartArray.length==0){
							var noData='<h2>Currently there are no items in your cart</h2>' ;	
						noData+='<a href="/jadrn043/proj31.html" style="text-decoration:none"><input type="button" value="Continue Shopping"</input><a>';								
						$('#cart1').html(noData); 
						$('#cart2').html(""); 
						$('#count').text(cart.size());
							document.getElementById("checkout").style.display='none';
							document.getElementById("continue1").style.display='none';
							}	else{					
						var toWrite = '<table  id="cartTable"  border="4"  cellspacing="4" width="700">';
						toWrite += "<tr><th>Product</th><th>Quantity</th><th>Product Name</th><th>Cost</th>";
						for(i=0; i < cartArray.length; i++) {
						toWrite += "<tr>";
						//sku toWrite += "<td>"+cartArray[i][0]+"</td>";
						price=Number(price)+(Number(cartArray[i][3])*Number(cartArray[i][1]));
						var toDisplay = '<img src="/~jadrn043/proj1/ajax_upload/_product_visual/' + cartArray[i][4].toLowerCase() +'" style="float:left;width:100px;height:120px"/>'; 
						toWrite += "<td>"+toDisplay+"</td>";
						toWrite +='<td><input type="text" id="cartQty'+i+'" value="'+cartArray[i][1]+'" size="4"/></td>'; 
						toWrite += "<td>"+cartArray[i][2]+"</td>";
						toWrite += "<td>"+cartArray[i][3]+"</td>"; 
						toWrite += '<td><input type="button" id="id'+i+'" value="Delete"></td>'; 						
						toWrite += "</tr>";
					}
					toWrite += "</table>"; 		
					$('#cart1').html(toWrite); 
					$('#count').text(cart.size());  
						
						for(i=0; i < cartArray.length; i++) {
						attach_click(i,cartArray[i][0]);
						attach_blur(i,cartArray[i][0],cartArray[i][5]);
						}
						$('#cart2').html("");
				var totTable='<h2>Total Price Summary<h2>';
				totTable+='<table  id="totalTable"  border="4"  cellspacing="4" width="300">';
				totTable+='<tr><td>Products</td><td>'+price+'</td></tr>';
				totTable+='<tr><td>Shipping+taxes</td><td>'+(((8/100)*Number(price))+5).toFixed(2)+'</td></tr>';
				totTable+='</table>';
				totTable+='Total:'+(Number(price)+((8/100)*Number(price))+5).toFixed(2);
				
				$('#cart2').html(totTable); 
							}
						
					}
				  
			  }
			 
			  
			  
			 });
			 
			
			}); 
		}
		
		function attach_blur(index,sku,onhand){
			
			$('#cartQty'+index).on('blur', function() {
				
			var value=$("#cartQty"+index).val();
			var pattern = /^[1-9][0-9]*$/;
			if(!pattern.test($('#cartQty'+index).val())) {
				$('#cartQty'+index).addClass("error");		
				validQty = false;
				return;
				}
			if(Number(value)>Number(onhand)){
			$('#cartQty'+index).addClass("error");
				alert("Quantity Exceeding Available stock");
			validQty = false;
			return;
			}
			
				cart.setQuantity(sku,Number(value));
				 $('#count').text(cart.size());
				  $(function(){
					var cartArray = cart.getCartArray();
					var price=0;
					for(i=0; i < cartArray.length; i++) {
					if(cartArray[i][0] == sku) {												
						for(i=0; i < cartArray.length; i++) {						
						price=Number(price)+(Number(cartArray[i][3])*Number(cartArray[i][1]));						
					}
											
						 $('#cart2').html("");
				var totTable='<h2>Total Price Summary<h2>';
				totTable+='<table  id="totalTable"  border="4"  cellspacing="4" width="300">';
				totTable+='<tr><td>Products</td><td>'+price+'</td></tr>';
				totTable+='<tr><td>Shipping+taxes</td><td>'+(((8/100)*Number(price))+5).toFixed(2)+'</td></tr>';
				totTable+='</table>';
				totTable+='Total:'+(Number(price)+((8/100)*Number(price))+5).toFixed(2);
								
				$('#cart2').html(totTable); 
						
					}
				  
			  }
			 });
			}); 
		
		}
	
		
});
