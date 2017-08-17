$(document).ready(function() {
	
	var x=0;
	var z=0;
	var images =new Array("/jadrn043/images/AAA-145.jpg","/jadrn043/images/BTM-145.jpg","/jadrn043/images/GTH-564.jpg","/jadrn043/images/HTY-546.jpg","/jadrn043/images/JSC-790.jpg","/jadrn043/images/ATS-743.jpg");
	var images1 =new Array("/jadrn043/images/ABC-123.jpg","/jadrn043/images/AIA-121.jpg","/jadrn043/images/RTO-876.jpg","/jadrn043/images/SCH-675.jpg","/jadrn043/images/SAK-723.jpg","/jadrn043/images/POR-987.jpg");
	var i=setInterval(auto,2000);
	var y=setInterval(auto1,2000);
	function auto(){
		
		x++;
		if(x==images.length)
			x=0;
		document.getElementById("pic1").src=images[x];
		
	}
	function auto1(){
		
		z++;
		if(z==images1.length)
			z=0;
		
		document.getElementById("pic2").src=images1[z];
	}
});