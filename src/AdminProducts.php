<?php

require_once('../init.php');
loadScripts();

    $data = array("status" => "not set!");

    if(Utils::isGET()) {
        $pm = new ProductManager();
        $rows = $pm->listProducts();

        $html = "";
        foreach($rows as $row) {
            $sku = $row['SKU'];
            $price = $row['item_price'];
            $desc = $row['description'];
            $img = $row['item_img'];
            $qty = $row['item_qnty'];

            $color = "";
            if ($qty <5){
                $color = "red";
            }

            $html .= "<tr>
                        <td data-sku-img='$img'><img class='product_img' src='$img'/></td>
                        <td><input data-sku-desc='$sku'value='$desc'/></td>
                        <td><input data-sku-qty='$sku' type='number' value='$qty' min='1' max='20' step='1' style='color:$color'/></td>
                        <td><input data-sku-price='$sku' value='$price'/></td>
                        <td><input data-sku-sub='$sku' type='button' value='Submit Update' class='btn btn-md btn-default sub_admin_update'/></td>
                      </tr>";
        }
        echo $html;
        return;

    } else {
        $data = array("status" => "error", "msg" => "Only GET allowed.");

    }

    echo json_encode($data, JSON_FORCE_OBJECT);

?>
