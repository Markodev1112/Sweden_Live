// total price
let price = 0;
let item_price = 0;
let calculatedPrice = 0;
document.querySelectorAll('.cart-list .pallet').forEach(item => {
    item.querySelectorAll('.pallet-product').forEach(item => {
        calculatedPrice += Number(item.querySelector('.item-price .pallet-price').getAttribute('data-item-price'));
    })
    // if (item.querySelector('.breaking')) {
    //     item_price = item.querySelector('.breaking').getAttribute('data-item-price'); 
    // }
    console.log(calculatedPrice, 'calculatedPrice');
})
let main_price = $('.amount').data('total-price');
let cart_price = Number(main_price) + Number(calculatedPrice);
let price_format = (cart_price/100).toLocaleString("en");
$('.under-cart .amount .money').text(price_format + ' kr');


// remove all
$(document).on('click', '.cart-delete-all', function(e){
    e.preventDefault();
    var ids = [];
    document.querySelectorAll('.product-list li').forEach(item => {
        let id = item.getAttribute('data-item-id');
        ids.push(id);
        $.ajax({
            type: 'GET',
            url: '/cart/clear.js',
            data: {
              id: ids
            },
            success: function(){
                window.location.href= '/cart';
            }
        })
    })

})

// remove product
$(document).on("click", ".jc-cart-remove", function (e) {
    e.preventDefault();
    var updates = {};
    var data = {};
    let $cartpc = $(this).val();
    let mainProductId = $(this).closest('.item').data('item-id');
    let palletNum = $(this).data('properties')[0][1];
    let main_Product_Id = $(this).data('properties')[1][1];
    let subProductId1 = $(this).data('properties')[2][1];
    let subProductId2 = $(this).data('properties')[3][1];
    let $breaking_val = $cartpc % palletNum;
   
    $(this).closest('.product-list')[0].querySelectorAll('.custom-product').forEach(item=> {
        let str_selectedId = item.querySelector('input').getAttribute('data-properties');
        let selectedId = JSON.parse(str_selectedId)[0][1];
        if (selectedId == main_Product_Id ) {
            console.log(item, "herer");
            var key = item.getAttribute('data-item-key');
            updates[key] = 0;
            console.log(updates[key], "key");

            data = {
            items: [
                {
                    id: mainProductId,
                    quantity: 0,
                    properties: {
                        '_pallet_num': palletNum,
                        '_mainproduct_id': main_Product_Id,
                        '_subproduct_id_0': subProductId1,
                        '_subproduct_id_1': subProductId2
                    }
                },
                {
                    id: subProductId1,
                    quantity: 0,
                    properties: {
                        '_mainproduct_id': main_Product_Id,
                    }
                }
                ]
            }

            if ($breaking_val != 0) {
                data = {
                    items: [
                        {
                            id: mainProductId,
                            quantity: 0,
                            properties: {
                                '_pallet_num': palletNum,
                                '_mainproduct_id': main_Product_Id,
                                '_subproduct_id_0': subProductId1,
                                '_subproduct_id_1': subProductId2
                            }
                        },
                        {
                            id: subProductId1,
                            quantity: 0,
                            properties: {
                                '_mainproduct_id': main_Product_Id
                            }
                        },
                        {
                            id: subProductId2,
                            quantity: 0,
                            properties: {
                                '_mainproduct_id': main_Product_Id
                            }
                        }
                    ]
                }
            }      
            
            updates[$(this).closest('.item').data('item-key')] = 0;
        }
    })
    
    itemDelete(updates, data)
    
})

// click +, - button
$(document).on('change', '.jc-cart-value', function(e) {
    e.preventDefault();
    changeItem($(this));
})
$(document).on('keyup', '.jc-cart-value', function(e) {
    e.preventDefault();
    changeItem($(this));
})

$('.jc-cart .minus').click(function(e){
    e.preventDefault();
    var $input = $(this).closest('.jc-cart').find('input');
    let qty = $input.val();
    if(qty > 0) {
        $input.val(qty - 1);
        changeItem($input);
    }
});

$('.jc-cart .plus').click(function(e){
    e.preventDefault();
    var $input = $(this).closest('.jc-cart').find('input');
    let qty = $input.val();
    $input.val(Number(qty) + 1);
    changeItem($input);
});

// +, - product

function changeItem(_this) {
    var updates = {};
    var data ={};
    let $cartpc = _this.val();
    let mainProductId = _this.closest('.item').data('item-id');
    let palletNum = _this.data('properties')[0][1];
    let main_Product_Id = _this.data('properties')[1][1];
    let subProductId1 = _this.data('properties')[2][1];
    let subProductId2 = _this.data('properties')[3][1];
    let $pallet_val = Math.ceil($cartpc / palletNum);
    let $breaking_val = $cartpc % palletNum;
   
    
    _this.closest('.product-list')[0].querySelectorAll('.custom-product').forEach(item=> {
        let str_selectedId = item.querySelector('input').getAttribute('data-properties');
        let selectedId = JSON.parse(str_selectedId)[0][1];
        if (selectedId == main_Product_Id ) {
            console.log(item, "herer");
            var key = item.getAttribute('data-item-key');
            updates[key] = 0;
            console.log(updates[key], "key");

            data = {
                items: [
                {
                    id: mainProductId,
                    quantity: $cartpc,
                    properties: {
                        '_pallet_num': $pallet_val,
                        '_mainproduct_id': main_Product_Id,
                        '_subproduct_id_0': subProductId1,
                        '_subproduct_id_1': subProductId2
                    }
                },
                {
                    id: subProductId1,
                    quantity: $pallet_val,
                    properties: {
                        '_mainproduct_id': main_Product_Id,
                    }
                }
                ]
            }

            if ($breaking_val != 0) {
                data = {
                    items: [
                        {
                            id: mainProductId,
                            quantity: $cartpc,
                            properties: {
                                '_pallet_num': palletNum,
                                '_mainproduct_id': main_Product_Id,
                                '_subproduct_id_0': subProductId1,
                                '_subproduct_id_1': subProductId2
                            }
                        },
                        {
                            id: subProductId1,
                            quantity: 1,
                            properties: {
                                '_mainproduct_id': main_Product_Id
                            }
                        },
                        {
                            id: subProductId2,
                            quantity: 1,
                            properties: {
                                '_mainproduct_id': main_Product_Id
                            }
                        }
                    ]
                }
            }    
            updates[_this.closest('.item').data('item-key')] = 0;
        }
    })

    itemsUpdate(updates, data);        
}


// function

function itemsUpdate(updates, data) {
    $.ajax({
        type: 'POST',
        url: '/cart/update.js',
        data: {
            updates:updates
        },
        dataType: 'json',
        async:false,  // Be warned, async:false has been deprecated in jQuery for a long time and is not recommended for use. It's generally recommended to use callbacks or promises instead
        success: function(){
            $.ajax({
                type: 'POST',
                url: '/cart/add.js',
                data: data,
                dataType: 'json',
                async:false,  // Be warned, async:false has been deprecated in jQuery for a long time and is not recommended for use. It's generally recommended to use callbacks or promises instead
                success: function(){
                    window.location.href= '/cart';
                }
            });
        }
    })
}

// remove
function itemDelete(updates, data) {
    $.ajax({
    type: "POST",
    url: "/cart/update.js",
    data: {
    updates: updates,
    },
    dataType: "json",
    // Be warned, async: false has been deprecated in jQuery for a long time and is not recommended for use. It's generally recommended to use callbacks or promises instead
    success: function () {
    window.location.href = "/cart";
    },
});
}

