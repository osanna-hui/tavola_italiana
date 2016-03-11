
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

    function customerIn(){
      $.ajax({
        url:"./mod/customerIn.php",
        type:"POST",
        dataType:"JSON",
        data:{
          user_name:"newUser"
        },
        success:function(returnedData){
          
          location.reload();
          console.log(returnedData);
        },
          error: function(jqXHR, textStatus, errorThrown) {
              console.log("AJAX Error", textStatus);
          }
      });
    }  
  
    function doLogin() {

        var formData = ConvertFormToJSON("#loginForm");
        console.log("Login data to send: ", formData);

        $.ajax({
            url: "./mod/login.php",
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


                    /* BTW, IF LOGOUT FAILED, IT'S BECAUSE THE SESSION EXPIRED
                       YOU COULD EASILY JUST RESET THE HTML IN THE PAGE
                     */

                } else {
                    // you're in, show profile
                    console.log(returnedData['user']['username']);
                    location.reload();
                    console.log(returnedData);

                    // THIS SECTION HAS TO BE THE SAME AS index.html, LINE 21
                    /*
                    $("#profileContainer").html("<div id='userProfile'>"
                        + "<h2>User Profile (only visible when logged in):</h2>\n"
                        + "<span><i>login: </i>" + returnedData['user']['username'] + "</span> "
                        + "<span><i>first name: </i>" + returnedData['user']['firstName'] + "</span> "
                        + "<span><i>last name: </i>" + returnedData['user']['lastName'] + "</span>"
                        +"<br/><br/><br/></div>");

                    // remove login form
                    $("#loginForm").remove();

                    // create logout form
                    $("#loginFormContainer").after('<div id="logoutFormContainer"><form id="logoutForm"><fieldset><legend>Logout Form</legend><label for="password">Password: </label><input id="logoutbutton" type="button" value="Logout"/><input type="hidden" value="logout" name="logoutButton"/></fieldset></form></div>');
                    $("#logoutbutton").bind("click", doLogout);
                    */
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
            url: "./mod/logout.php",
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

    


    // create customer event
    $("#startCart").click(customerIn);
  
    // login event
    $("#loginbutton").click(doLogin);

    // logout event
    $("#logoutbutton").click(doLogout);



/////////////////////////// HOME PAGE //////////////////////////

/*document.getElementById("loginForm").style.display = "none";
document.getElementById("messages").style.display = "none";
document.getElementById("as_admin").onclick = function(){
    document.getElementById("loginForm").style.display = "block";
    document.getElementById("messages").style.display = "block";
    document.getElementById("as_admin").style.display = "none";
}
*/


/////////////////////////// SHOW SHOPPING CART //////////////////////////

    document.getElementById("cart").onclick = function(){
      console.log("cart");
        document.getElementById('cartSummary').style.display = "block";
        document.getElementById('backToMenu').style.display = "inline-block";
        document.getElementById('productTable').style.display = "none";
        document.getElementById('profile').style.display = "none";
        document.getElementById('cart').style.display = "none";
    }
    document.getElementById("backToMenu").onclick = function(){
        document.getElementById('cartSummary').style.display = "none";
        document.getElementById('backToMenu').style.display = "none";
        document.getElementById('productTable').style.display = "block";
        document.getElementById('profile').style.display = "inline-block";
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


    
/////////////////////////// SHOW PROFILE //////////////////////////

    document.getElementById("profile").onclick = function(){
        document.getElementById('userProfile').style.display = "block";
        document.getElementById('logoutForm').style.display = "block";
        document.getElementById('back').style.display = "inline-block";
        document.getElementById('shoppingCartContainer').style.display = "none";
        document.getElementById('profile').style.display = "none";
        document.getElementById('cart').style.display = "none";
    }
    document.getElementById("back").onclick = function(){
        document.getElementById('userProfile').style.display = "none";
        document.getElementById('logoutForm').style.display = "none";
        document.getElementById('back').style.display = "none";
        document.getElementById('shoppingCartContainer').style.display = "block";
        document.getElementById('profile').style.display = "inline-block";
        document.getElementById('cart').style.display = "inline-block";
    }


});
