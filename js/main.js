
$(document).ready(function() {

    // from: http://www.developerdrive.com/2013/04/turning-a-form-element-into-json-and-submiting-it-via-jquery/
    function ConvertFormToJSON(form){
        var array = $(form).serializeArray();
        var json = {};

        jQuery.each(array, function() {
            // don't send 'undefined'
            json[this.name] = this.value || '';
        });
        return json;
    }

  
    function doLogin() {

        var formData = ConvertFormToJSON("#loginForm");
        console.log("Login data to send: ", formData);

        $.ajax({
            url: "./src/login.php",
            type: "POST",
            dataType: "JSON",
            data: formData,
            success: function(returnedData) {
                console.log("Login data returned: ", returnedData);

                var status = returnedData['status'];
                if(status == 'error') {
                    msgs = returnedData['msg'];
                    for(msg in msgs) {
                        //console.log(msgs[msg]['text']);

                        $("#AJAXMessages").html("<span class='" + msgs[msg]['type']
                            + "'" + ">" + msgs[msg]['text'] + "</span>");
                    }


                } else {
                    // you're in, show profile
                    console.log(returnedData['user']['username']);
                    location.reload();
                    console.log(returnedData);

                }


            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log("AJAX Error", textStatus);
            }
        });
    }

    function doLogout() {
        var formData = {logout: "true"};
        //console.log("Logout data to send: ", formData);

        $.ajax({
            url: "./src/logout.php",
            type: "POST",
            dataType: "JSON",
            data: formData,
            success: function(returnedData) {
                //console.log("Logout data returned: ", returnedData);

                // RELOAD THE PAGE
                window.location.href = "index.php";

            },
            error: function(jqXHR, textStatus, errorThrown) {
                //console.log(jqXHR.statusText, textStatus, errorThrown);
                console.log(jqXHR.statusText, textStatus);
            }
        });
    }
  
    // login event
    $("#loginbutton").click(doLogin);

    // logout event
    $("#logoutbutton").click(doLogout);


/////////////////////////// SHOW SHOPPING CART //////////////////////////

    document.getElementById("cart").onclick = function(){
        console.log("CART");
        document.getElementById('cartSummary').style.display = "block";
        document.getElementById('backToMenu').style.display = "inline-block";
        document.getElementById('productTable').style.display = "none";
        //document.getElementById('profile').style.display = "none";
        document.getElementById('cart').style.display = "none";
    }
    document.getElementById("backToMenu").onclick = function(){
        document.getElementById('cartSummary').style.display = "none";
        document.getElementById('backToMenu').style.display = "none";
        document.getElementById('productTable').style.display = "block";
        //document.getElementById('profile').style.display = "inline-block";
        document.getElementById('cart').style.display = "inline-block";
    }


/////////////////////////// PROCEED TO CHECKOUT//////////////////////////
    document.getElementById("toCheckout").onclick = function(){
        document.getElementById('cartSummary').style.display = "none";
        document.getElementById('customerCheckout').style.display = "block";
        document.getElementById('backToMenu').style.display = "none";
        document.getElementById('backToCart').style.display = "inline-block";
    }
    document.getElementById("backToCart").onclick = function(){
        document.getElementById('cartSummary').style.display = "block";
        document.getElementById('customerCheckout').style.display = "none";
        document.getElementById('backToCart').style.display = "none";
        document.getElementById('backToMenu').style.display = "inline-block";
    }


});
