<% if(!helpers.AuthHelper.isValidSession(request)) response.sendRedirect("/jadrn043/html/login.html"); %>

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache, no-store">
    <meta http-equiv="Expires" CONTENT="-1">	
    <title>Merchandise Management</title>
    <link rel="stylesheet" href="/jadrn043/css/form.css">
    <script src="/jquery/jquery.js"></script>
	<script src="/jquery/jQueryUI.js"></script>  
    <script src="/jadrn043/js/form.js"></script>    
</head>
<body>
<div id="top">
  <h4>Welcome <%= session.getAttribute("user") %> ,  <a href="/jadrn043/servlet/Logout"><button>Logout</button></a></h4>  
  </div>
 <h1>Merchandise Management</h1>
 <div id="accordion">
  <h3>Update Information</h3>
  <div>
    <p id="1"> </p>
	<p id="2"> </p>
  </div>
  </div>

   
    <div id="main">
	 <form method="POST" id="Form1" action="">

	 
	<div id="tabs">
      <ul>
        <li><a href="#tabs-1"><span>Inventory Received</span></a></li>
		
        <li><a href="#tabs-2"><span>Inventory Sent Out</span></a></li>
      </ul>
      <div id="tabs-1">
	  <p id="pic">	 
	 </p>
		
		<fieldset>
        <dl>
        	<dt><label for="sku">SKU:</label></dt>
            <dd><input type="text" name="sku"/></dd>
        </dl>
		<dl>
        	<dt><label for="vendor">Vendor:</label></dt>
            <dd><select name="vendor" disabled="disabled"></select></dd>
        </dl>
		<dl>
        	<dt><label for="category">Category:</label></dt>
            <dd><select name="category" disabled="disabled"></select></dd>
        </dl>
		
		<dl>
        	<dt><label for="model">vendorId:</label></dt>
            <dd><input type="text" name="model" readonly /></dd>
        </dl>
		<dl>
        	<dt><label for="datepicker">Date:</label></dt>
            <dd><input type="text" id="datepicker"/></dd>
			<dl><p id="dt1">Enter date in 'yyyy-mm-dd'format</p></dl>			
        </dl>
		
		<dl>
        	<dt><label for="qty">Quantity:</label></dt>
            <dd><input type="text" name="qty" /></dd>
        </dl>
	
		</fieldset>    
		<div id="message"></div>
		<input type="reset" class="button"/>
		<input type="button" value="Submit" id="submit_button"/>  			
      </div>
	  
      <div id="tabs-2">
	  <p id="pic1">	 
	 </p>
        <fieldset>
        <dl>
        	<dt><label for="sku1">SKU:</label></dt>
            <dd><input type="text" name="sku1" /></dd>
        </dl>
		<dl>
        	<dt><label for="vendor1">Vendor:</label></dt>
            <dd><select name="vendor1" disabled="disabled"></select></dd>
        </dl>
		<dl>
        	<dt><label for="category1">Category:</label></dt>
            <dd><select name="category1" disabled="disabled"></select></dd>
        </dl>
		<dl>
        	<dt><label for="model1">vendorId:</label></dt>
            <dd><input type="text" name="model1" readonly /></dd>
        </dl>
		<dl>
        	<dt><label for="datepicker1">Date:</label></dt>
            <dd><input type="text" id="datepicker1"/></dd>
			<dl><p id="dt1">Enter date in 'yyyy-mm-dd'format</p></dl>
        </dl>
		<dl>
        	<dt><label for="qty1">Quantity:</label></dt>
            <dd><input type="text" name="qty1"/></dd>
        </dl>
		  
		
		</fieldset>   
		<div id="message1"></div>
		<input type="reset" class="button"/>
		<input type="button" value="Submit" id="submit_button1"/>		
	
       
      </div>
    </div>
    </form>
    </div>	

	
	
</body>
</html>
