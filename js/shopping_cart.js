/*<![CDATA[*/
$(document).ready(function() {


    // FOR PUTTING OBJECTS INTO HTML5 WEB STORAGE - ADD METHODS TO THE STORAGE OBJECT
    // http://stackoverflow.com/questions/2010892/storing-objects-in-html5-localstorage
    Storage.prototype.setObject = function(key, value) {
        this.setItem(key, JSON.stringify(value));
    }

    Storage.prototype.getObject = function(key) {
        var value = this.getItem(key);
        return value && JSON.parse(value);
    }

    // LOAD ALL PRODUCTS
    function loadProducts() {
        $.ajax({
            url: "./src/products.php",
            type: "GET",
            dataType: 'html',
            success: function(returnedData) {
                //console.log("cart checkout response: ", returnedData);
                $("#productslist").html(returnedData);

            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(jqXHR.statusText, textStatus);
            }
        });
    }

    loadProducts();

    function ConvertFormToJSON(form){
        var array = $(form).serializeArray();
        var json = {};

        jQuery.each(array, function() {
            // don't send 'undefined'
            json[this.name] = this.value || '';
        });
        return json;
    }

    // SESSION STORAGE GET ITEMS IF THEY ALREADY EXIST IN SESSION STORAGE
    function loadShoppingCartItems() {

        var cartData = sessionStorage.getObject('autosave');

        // if nothing added leave function
        if(cartData == null) {
            //document.getElementById("cartEmpty").innerHTML = "You don't have anything in your cart!";
            return;
        }
        var cartDataItems = cartData['items'];
        var shoppingCartList = $("#shoppingCart");


        for(var i = 0; i < cartDataItems.length; i++) {
            var item = cartDataItems[i];
            // sku, qty, date
            var sku = item['sku'];
            var qty = item['qty'];
            var date = item['date'];
            var price = item['price'];
            var desc = item['desc'];
            var img = item['img'];
            var subtotal = parseFloat(Math.round((qty * price) * 100) / 100).toFixed(2);

            /*var item = "<li data-item-sku='" + sku + "' data-item-qty='" + qty + "' data-item-date='"
                + date + "'>" + desc + " <input data-sku-qty='" + qty + "' type='number' value='" + qty + "' min='1' max='20' step='1' id='quantity'/> " + " x $" + price + " = $" + subtotal
                + " <input type='button' id='updateCartBut' value='Update Quantity'/> " + " <input id='remove' type='button' data-remove-button='remove' value='Remove'/></li>";*/
            var item = "<li data-item-sku='" + sku + "' data-item-qty='" + qty + "' data-item-date='"
                + date + "'>" + desc + " <input data-sku-qty='" + sku + "' type='number' value='" + qty + "' min='1' max='20' step='1' id='quantity'/> " + " x $" + price + " = $" + subtotal
                + " <input data-sku-update='" + sku + "' type='button' id='updateCartBut' value='Update Quantity' class='btn btn-md btn-default sub_admin_update'/> " + " <input id='remove' type='button' data-remove-button='remove' value='Remove' class='btn btn-md btn-default sub_admin_update'/></li>";
            shoppingCartList.append(item);
            /*var button = document.createElement('input');
            button.setAttribute("type", button);
            button.setAttribute("value", type);
            button.setAttribute("name", type);
            button.id = "updateQuantity";
            
            shoppingCartList.append(button);*/


        }
        console.log('cart items array, added', cartDataItems);
    }
    loadShoppingCartItems();

    $('#productslist').on('click', 'input[data-sku-add]', function() {
        //console.log(this.getAttribute("data-sku-add"));

        // get the sku
        var sku = this.getAttribute("data-sku-add");
        var qty = $("input[data-sku-qty='" + sku + "']").val();
        var price = $("td[data-sku-price='" + sku + "']").text();
        var desc = $("td[data-sku-desc='" + sku + "']").text();
        var subtotal = parseFloat(Math.round((qty * price) * 100) / 100).toFixed(2);
        console.log(desc, "quantity", qty, "price", price);
        alert("Item added to shopping cart");

        var shoppingCartList = $("#shoppingCart");


        // ALTERED FOR WEB STORAGE
        var aDate = new Date();
        /*var item = "<li data-item-sku='" + sku + "' data-item-qty='" + qty + "' data-item-date='"
            + aDate.getTime() + "'>" + desc + " <input data-sku-qty='" + qty + "' type='number' value='" + qty + "' min='1' max='20' step='1' id='quantity'/>" + " x $" + price + " = $" + subtotal
            + " <input type='button' id='updateCartBut' value='Update Quantity'/> " + " <input id='remove' type='button' data-remove-button='remove' value='Remove'/></li>";*/
        var item = "<li data-item-sku='" + sku + "' data-item-qty='" + qty + "' data-item-date='"
            + aDate.getTime() + "'>" + desc + " <input data-sku-qty='" + sku + "' type='number' value='" + qty + "' min='1' max='20' step='1' id='quantity'/>" + " x $" + price + " = $" + subtotal
            + " <input data-sku-update='" + sku + "' type='button' id='updateCartBut' value='Update Quantity' class='btn btn-md btn-default sub_admin_update'/> " + " <input id='remove' type='button' data-remove-button='remove' value='Remove' class='btn btn-md btn-default sub_admin_update'/></li>";
        shoppingCartList.append(item);

        // SESSION STORAGE - SAVE SKU AND QTY AS AN OBJECT IN THE
        // ARRAY INSIDE OF THE AUTOSAVE OBJECT
        var cartData = sessionStorage.getObject('autosave');
        if(cartData == null) {
            return;
        }
        var item = {'sku': sku, 'qty': qty, date: aDate.getTime(), 'desc': desc, 'price': price};
        cartData['items'].push(item);
        // clobber the old value
        sessionStorage.setObject('autosave', cartData);

//letting user know that item's been added
/*
        var alert = document.createElement("div");
        alert.id = "alert";
        alert.innerHTML = "Item Added To Cart!";
        var alert_ok = document.createElement("button");
        alert_ok.innerHTML = "OK!";
        alert.appendChild(alert_ok);
        document.body.appendChild(alert);
        alert.style.display = "none";

        $(alert).fadeIn();
        alert_ok.onclick = function(){
          $(alert).fadeOut();
        }
*/


    });

    // remove items from the cart
    $("#shoppingCart").on("click", "#remove", function() {
        // https://api.jquery.com/closest/

        // WEB STORAGE REMOVE
        var thisInputSKU = this.parentNode.getAttribute('data-item-sku');
        var thisInputQty = this.parentNode.getAttribute('data-item-qty');
        var thisInputDate = this.parentNode.getAttribute('data-item-date');

        var cartData = sessionStorage.getObject('autosave');
        if(cartData == null) {
            return;
        }
        var cartDataItems = cartData['items'];
        for(var i = 0; i < cartDataItems.length; i++) {
            var item = cartDataItems[i];
            // get the item based on the sku, qty, and date
            if(item['sku'] == thisInputSKU && item['date'] == thisInputDate) {
                // remove from web storage
                cartDataItems.splice(i, 1);

            }
        }
        cartData['items'] = cartDataItems;
        console.log('cart data stuff', cartData);
        // clobber the old value
        sessionStorage.setObject('autosave', cartData);

        this.closest("li").remove();

    });


    // start the cart
    $("#startCart").click(function() {
        console.log("Start cart.");
        
        $.ajax({
            url: "./src/shoppingcart.php",
            type: "POST",
            dataType: 'JSON',
            data: {action: "startcart"},
            success: function(returnedData) {
                console.log("cart start response: ", returnedData);
                //sessionStorage.cart_id = returnedData.cart_id;
                //console.log(sessionStorage.cart_id);

                sessionStorage.setObject('autosave', {items: []});
                location.reload();

            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(jqXHR.statusText, textStatus);
            }
        });
    });


    // cancel the cart
    $("#cancelCart").click(function() {

        console.log("End cart.");
        $.ajax({
            url: "./src/shoppingcart.php",
            type: "POST",
            dataType: 'json',
            data: {action: "cancelcart"},
            success: function(returnedData) {
                console.log("cart cancel response: ", returnedData);


                // SESSION STORAGE - CLEAR THE SESSION
                sessionStorage.clear();
                location.reload();

            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(jqXHR.statusText, textStatus);
            }
        });
        var shoppingCartList = $("#shoppingCart").html("");
    });

    // checkout the cart
    $("#checkoutcart").click(function() {
        console.log("CHECKOUT");
        // retrieve all of the items from the cart:
        var items = $("#shoppingCart li");
        var itemArray = [];
        $.each(items, function(key, value) {

            var item = {sku: value.getAttribute("data-item-sku"),
                qty: value.getAttribute("data-item-qty")};
            itemArray.push(item);
        });
        itemArray.shift();
        var itemsAsJSON = JSON.stringify(itemArray);

        console.log("itemsAsJSON", itemsAsJSON);


        console.log("Check out cart with the following items", itemArray);


        $.ajax({
            url: "./src/shoppingcart.php",
            type: "POST",
            dataType: 'json',
            data: {action: "checkoutcart", items: itemsAsJSON},
            success: function(returnedData) {
                console.log("cart check out response: ", returnedData);

            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(jqXHR.statusText, textStatus);
            }
        });
        var shoppingCartList = $("#shoppingCart").html("");

        // add customer info into db
        //var formData = ConvertFormToJSON("#customerCheckoutForm");
        //console.log(formData);
        $.ajax({
            url:"./src/customerCheckout.php",
            type:"POST",
            dataType:"html",
            data:{
                firstname:document.getElementById("custFirstName").value,
                lastname:document.getElementById("custLastName").value,
                phone:document.getElementById("custPhone").value,
                email:document.getElementById("custEmail").value,
                address:document.getElementById("custAddress").value,
                city:document.getElementById("custCity").value,
            },
            success: function(returnedData) {
                console.log("Checked Out");
                location.reload();

            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(jqXHR.statusText, textStatus);
            }
        });

/*
//s
            $.ajax({
                  url:"./src/customerIn.php",
                  type:"POST",
                  dataType:"JSON",
                  data:{
                    user_name:"newUser",
                  },
                  success:function(returnedData){
                    
                    location.reload();
                    console.log(returnedData);
                  },
                    error: function(jqXHR, textStatus, errorThrown) {
                        console.log("AJAX Error", textStatus);
                    }
                });

*/

    });
    
    // update the cart
    /*$("#updateCartBut").click(function(){
        
        // retrieve all of the items from the cart:
        var items = $("#shoppingCart li");
        var itemArray = [];
        $.each(items, function(key, value) {

            var item = {sku: value.getAttribute("data-item-sku"),
                qty: value.getAttribute("data-item-qty")};
            itemArray.push(item);
        });
        var itemsAsJSON = JSON.stringify(itemArray);
        console.log("itemsAsJSON", itemsAsJSON);
    });*/
    
    $('#shoppingCart').on('click', 'input[data-sku-update]', function() {
        //console.log(this.getAttribute("data-sku-update"));

        // get the sku
        var sku = this.getAttribute("data-sku-update");
        var qty = $("input[data-sku-qty='" + sku + "']").val();
        var price = $("td[data-sku-price='" + sku + "']").text();
        var desc = $("td[data-sku-desc='" + sku + "']").text();
        var subtotal = parseFloat(Math.round((qty * price) * 100) / 100).toFixed(2);
        console.log(desc, "quantity", qty, "price", price);
        alert("Item added to shopping cart");

        var shoppingCartList = $("#shoppingCart");


        // ALTERED FOR WEB STORAGE
        var aDate = new Date();
        var item = "<li data-item-sku='" + sku + "' data-item-qty='" + qty + "' data-item-date='"
            + aDate.getTime() + "'>" + desc + " <input data-sku-qty='" + sku + "' type='number' value='" + qty + "' min='1' max='20' step='1' id='quantity'/>" + " x $" + price + " = $" + subtotal
            + " <input data-sku-sub='" + sku + "' type='button' id='updateCartBut' value='Update Quantity' class='btn btn-md btn-default sub_admin_update'/> " + " <input id='remove' type='button' data-remove-button='remove' value='Remove' class='btn btn-md btn-default sub_admin_update'/></li>";
        //shoppingCartList.append(item);

        // SESSION STORAGE - SAVE SKU AND QTY AS AN OBJECT IN THE
        // ARRAY INSIDE OF THE AUTOSAVE OBJECT
        var cartData = sessionStorage.getObject('autosave');
        if(cartData == null) {
            return;
        }
        var item = {'sku': sku, 'qty': qty, date: aDate.getTime(), 'desc': desc, 'price': price};
        cartData['items'].push(item);
        // clobber the old value
        sessionStorage.setObject('autosave', cartData);

//letting user know that item's been added
/*
        var alert = document.createElement("div");
        alert.id = "alert";
        alert.innerHTML = "Item Added To Cart!";
        var alert_ok = document.createElement("button");
        alert_ok.innerHTML = "OK!";
        alert.appendChild(alert_ok);
        document.body.appendChild(alert);
        alert.style.display = "none";

        $(alert).fadeIn();
        alert_ok.onclick = function(){
          $(alert).fadeOut();
        }
*/


    });




});
/*]]>*/