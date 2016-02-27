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
                    url: "./mod/products.php",
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

            // SESSION STORAGE GET ITEMS IF THEY ALREADY EXIST IN SESSION STORAGE
            function loadShoppingCartItems() {

                var cartData = sessionStorage.getObject('autosave');

                // if nothing added leave function
                if(cartData == null) {
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
                    var subtotal = parseFloat(Math.round((qty * price) * 100) / 100).toFixed(2);

                    var item = "<li data-item-sku='" + sku + "' data-item-qty='" + qty + "' data-item-date='"
                        + date + "'>" + desc + " " + qty + " x $" + price + " = " + subtotal
                        + " <input type='button' data-remove-button='remove' value='X'/></li>";
                    shoppingCartList.append(item);


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

                var shoppingCartList = $("#shoppingCart");


                // ALTERED FOR WEB STORAGE
                var aDate = new Date();
                var item = "<li data-item-sku='" + sku + "' data-item-qty='" + qty + "' data-item-date='"
                    + aDate.getTime() + "'>" + desc + " " + qty + " x $" + price + " = " + subtotal
                    + " <input type='button' data-remove-button='remove' value='X'/></li>";
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


            });

            // remove items from the cart
            $("#shoppingCart").on("click", "input", function() {
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
                    url: "./mod/shoppingcart.php",
                    type: "POST",
                    dataType: 'json',
                    data: {action: "startcart"},
                    success: function(returnedData) {
                        console.log("cart start response: ", returnedData);

                        // WEB STORAGE - SESSION STORAGE
                        //var sessionID = returnedData['s_id'];
                        sessionStorage.setObject('autosave', {items: []});


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
                    url: "./mod/shoppingcart.php",
                    type: "POST",
                    dataType: 'json',
                    data: {action: "cancelcart"},
                    success: function(returnedData) {
                        console.log("cart cancel response: ", returnedData);


                        // SESSION STORAGE - CLEAR THE SESSION
                        sessionStorage.clear();

                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        console.log(jqXHR.statusText, textStatus);
                    }
                });
                var shoppingCartList = $("#shoppingCart").html("");
            });

            // cancel the cart
            $("#checkoutcart").click(function() {

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


                console.log("Check out cart with the following items", itemArray);
                $.ajax({
                    url: "./mod/shoppingcart.php",
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
            });




        });
        /*]]>*/