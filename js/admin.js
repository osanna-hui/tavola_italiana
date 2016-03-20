$(document).ready(function(){
	function loadDashboard() {
        $.ajax({
            url: "./src/AdminProducts.php",
            type: "GET",
            dataType: 'html',
            success: function(returnedData) {
                //console.log("cart checkout response: ", returnedData);
                $("#productsEditor").html(returnedData);

            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(jqXHR.statusText, textStatus);
            }
        });
    }
    loadDashboard();

    $('#productsEditor').on('click', 'input[data-sku-sub]', function() {
    	
    	console.log('sub');
    	var sku = this.getAttribute("data-sku-sub");
    	var qty = $("input[data-sku-qty='" + sku + "']").val();
        var price = $("input[data-sku-price='" + sku + "']").val();
        var desc = $("input[data-sku-desc='" + sku + "']").val();

        console.log("SKU: "+sku+", qty: "+qty+", price: "+price+", desc: "+desc);

        $.ajax({
        	url:"./src/updateProducts.php",
        	dataType:"html",
        	type:"POST",
        	data:{
        		sku:sku,
        		qty:qty,
        		price:price,
        		desc:desc
        	},
        	success:function(resp){
        		console.log("updated");
        	},
        	error: function(jqXHR, textStatus, errorThrown) {
                console.log(jqXHR.statusText, textStatus);
            }
        });
    });

});