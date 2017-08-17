var products;
validQty=true;
var cart;
$(document).ready(function() {
  cart = new shopping_cart("jadrn043");	 
	$('#count').text(cart.size());   
	 $('.tabs .tab-links a').on('click', function(e)  {
        var currentAttrValue = $(this).attr('href');
        $('.tabs ' + currentAttrValue).show().siblings().hide();
         $(this).parent('li').addClass('active').siblings().removeClass('active');
         e.preventDefault();
    });
		$('#sch2').on('click',function(){
		
		
		var url1 = 'http://jadran.sdsu.edu/jadrn043/servlet/SearchData';
						url1 += '?word='+$('#sch1').val();
						$.get(url1, handleProducts);
		
	});
	
		$(function() {
				$("#dialog").dialog({
				height: 600,
				width: 700,
				modal: true,
				autoOpen: false
				});
			});
			$(function() {
				$("#dialog1").dialog({
				height: 600,
				width: 650,
				modal: true,
				autoOpen: false
				});
			});
			
			$(function() {
				for(bt=1;bt<9;bt++){
						attch_catbtn(bt);
				
				}
			});
			function attch_catbtn(bt){
			$('#bt'+ bt).on('click',function(){
						var url1 = 'http://jadran.sdsu.edu/jadrn043/servlet/GetCatProducts';
						url1 += '?cat='+bt;
						$.get(url1, handleProducts);
			});
			}
			
			$(function() {
				for(bt=9;bt<19;bt++){
					
						attch_venbtn(bt);
				
				}
			});
			function attch_venbtn(bt){
			$('#bt'+ bt).on('click',function(){
						var url1 = 'http://jadran.sdsu.edu/jadrn043/servlet/GetVendProducts';
						url1 += '?vend=' + (bt-8);
						$.get(url1, handleProducts);
			});
			}
			
		
	 $.get('http://jadran.sdsu.edu/jadrn043/servlet/GetProducts',
        handleProducts);

    
    $('#image').bind('click', function() {       
            
			document.location.href="/jadrn043/shoppingCart.html"
            });  
});

function handleProducts(response) {
    response = $.trim(response);
	
	var items = response.split('||');
	if(items.length==0){
		 $('#tab1').html('<h1>Sorry No products to display</h1>');
	}else{
	products=items;
	$('#tab1').html("");
	var table = '<table id="productTable"  border="4"  cellspacing="4" width="600" >';
	var tbody='';
	for(i=0;i<items.length;i++){
		
		var values=items[i].split('|');
		
		 tbody='<tr>';
		 var toDisplay = '<img id="im'+i+'"  src="/~jadrn043/proj1/ajax_upload/_product_visual/' + values[8].toLowerCase() + '" style="float:left;width:150px;height:200px"/>'; 
		tbody+='<td>'+toDisplay+'<div id="productdiv" style="float:right; color:#FAFAAF;margin-right:100px; position=absolute"></td>';
		//tbody+= toDisplay;
		tbody+='<td>'+values[3];
		tbody+='<br>Cost:'+values[7];		
		
		if(values[9]==0){
			tbody+='<br> Out Of Stock</div></td></tr>';
		}else{
			tbody+='<br>'+'Quantity <input type="text" id="qty'+i+'" value="1" size="4"/><br>';
			tbody+='<br><input type="button" value="Add to Cart" id="'+i+'"/><br>';	
			tbody+='<br> In Stock </div></td></tr>';
		}
		
		table+=tbody;
	}
	var tend='</table>';
  
   $('#tab1').html(table+tend);
   for(i=0;i<items.length;i++){
	   var values=items[i].split('|');

	   attach_click(i,values[0],values[3],values[7],values[8],values[9]);
	   attach_blur(i,values[0],values[9]);
	   attach_image(i,values[0],values[1],values[2],values[3],values[4],values[5],values[7],values[8],values[9]);
   }
	
	}
}

function attach_image(index,sku,vend,cat,name,description,features,cost,image,onhand){
	$('#im'+index).on('click', function() {
		var display='<img src="/~jadrn043/proj1/ajax_upload/_product_visual/' + image.toLowerCase() + '" style="float:left;width:300px;height:450px"/>'; 
		display+='<div style="float:right">Product:'+name;
		display+='<br><br>Description:'+description;
		display+='<br><br>Features:'+features;
		display+='<br><br>Vendor:'+vend;
		display+='<br><br>Category:'+cat;
		display+='<br><br>Cost:'+cost;
		if(onhand>0){
			display+='<br><br>Available in Stock';
			display+='<br><input id="sku'+index+'" type="button" value="Add to Cart" </input>';
		}else{
			display+='<br><br>More on the way';
		}
		display+='<br><br><a href="/jadrn043/proj31.html" style="text-decoration:none"><input type="button" value="Continue Shopping" </input></a></div>';				
		$('#dialog').html(display);
		$("#dialog").dialog("open");	
		
			$('#sku'+index).on('click', function() {
				onhand1=onhand;
				var cartArray = cart.getCartArray();
				for(i=0; i < cartArray.length; i++) {
					sku = $.trim(sku);
					
					if(cartArray[i][0] == sku) {
						if(onhand1>0)
						onhand1=Number(onhand1)-Number(cartArray[i][1]);
						
					}
					
				}
				if(onhand1>0){
					
				cart.add(sku,1,description,cost,image,onhand);
				var cartArray = cart.getCartArray();
				$('#count').text(cart.size()); 
				
				}
				else{
					alert("Quantity Exceeding Available Stock")
				}
			});
		
	});
}



function attach_blur(index,sku,onhand){
	
	$('#qty'+index).on('blur', function() {
		var value=$("#qty"+index).val();
		var pattern = /^[1-9][0-9]*$/;
		if(!pattern.test($('#qty'+index).val())) {
		$('#qty'+index).addClass("error");		
		validQty = false;
		return;
		}
		var cartArray = cart.getCartArray();
				for(i=0; i < cartArray.length; i++) {
					sku = $.trim(sku);
					if(cartArray[i][0] == sku) {
						
						onhand=Number(onhand)-Number(cartArray[i][1]);
						alert(onhand);
					}
					
				}
		if(Number(value)>Number(onhand)){
			$('#qty'+index).addClass("error");
				alert("Quantity more than Available stock");
		validQty = false;
		return;
		}
		validQty = true;
		$('#qty'+index).removeClass("error");
	});
}
function attach_click(index,sku,description,price,image,onhand){
	
	 $('#'+index).bind('click', function() {
			//alert(this.id+" "+$('#qty'+index).val());
			if(validQty){
				onhand1=onhand;
				var cartArray = cart.getCartArray();
				for(i=0; i < cartArray.length; i++) {
					sku = $.trim(sku);
					
					if(cartArray[i][0] == sku) {
						if(onhand1>0)
						onhand1=Number(onhand1)-Number(cartArray[i][1]);
						
					}
					
				}
				if(onhand1>0){
					
				cart.add(sku, $('#qty'+index).val(),description,price,image,onhand);
				
			 var cartArray1 = cart.getCartArray();	
				var toWrite = '<table  id="cartTable"  border="4"  cellspacing="4" width="600">';
				toWrite += "<tr><th>Product</th><th>Quantity</th><th>Product Name</th><th>Cost</th>";
				var price1=0;
				for(j=0; j < cartArray1.length; j++) {
				toWrite += "<tr>";
				
           //sku toWrite += "<td>"+cartArray[i][0]+"</td>";
		  
		   
		   var toDisplay = '<img src="/~jadrn043/proj1/ajax_upload/_product_visual/' + cartArray1[j][4].toLowerCase() +'" style="float:left;width:100px;height:120px"/>'; 
			toWrite += "<td>"+toDisplay+"</td>";
            toWrite +='<td><input type="text"  id="cartQty'+j+'" value="'+cartArray1[j][1]+'" size="4" readonly/></td>'; 
			toWrite += "<td>"+cartArray1[j][2]+"</td>";
            toWrite += "<td>"+cartArray1[j][3]+"</td>"; 
            toWrite += "</tr>";
			 price1=Number(price1)+(Number(cartArray1[j][3])*Number(cartArray1[j][1]));
            }
			toWrite += "</table>"; 	
						
			$('#part1').html(toWrite); 
			$('#part2').html("");
			var totTable='<h2>Total Price Summary</h2>';
			totTable+='<table  id="totalTable"  border="4"  cellspacing="4" width="300">';
			totTable+='<tr><td>Products</td><td>'+price1+'</td></tr>';
			totTable+='<tr><td>Shipping+taxes</td><td>'+(((8/100)*Number(price1))+5).toFixed(2)+'</td></tr>';
			totTable+='</table>';
			totTable+='Total:'+(Number(price1)+((8/100)*Number(price1))+5).toFixed(2);
			totTable+='<br><br><a href="/jadrn043/proj31.html" style="text-decoration:none"><input type="button" value="Continue Shopping"</input><a>';
			totTable+='<a href="/jadrn043/shoppingCart.html" style="text-decoration:none"><input type="button" value="CheckOut Now"</input><a>';
				
			$('#part2').html(totTable); 
			$("#dialog1").dialog("open");	
				
				
				}
				else{
					alert("Quantity Exceeding Available Stock")
				}
			  var cartArray = cart.getCartArray();
			  //alert(cart.size());
			   $('#count').text(cart.size());  
			}
	   }); 
}

		