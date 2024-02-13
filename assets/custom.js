// $(document).on('click', '.jc-cart-remove', function(e){
//     e.preventDefault();
//     var updates = {};
//     $(this).data('properties').forEach((property, index) => {
//         if (index !=0 ){
//             const variantID = property[1];        
//             const key = $(`.item[data-item-id="${variantID}"]`).data('item-key');
//             console.log(key, "key")
//             updates[key] = 0;
//         }
       
//     });
//     updates[$(this).closest('.item').data('item-key')] = 0;
//     $.ajax({
//         type: 'POST',
//         url: '/cart/update.js',
//         data: {
//           updates:updates
//         },
//         dataType: 'json', 
//         async:false,  // Be warned, async:false has been deprecated in jQuery for a long time and is not recommended for use. It's generally recommended to use callbacks or promises instead
//         success: function(){window.location.href= '/cart';}
       
//     });
// });

// function changeItem(_this) {
//     var updates = {};
//     let $cartpc = _this.val();
//     let mainProductId = _this.closest('.item').data('item-id');
//     let palletNum = _this.data('properties')[0][1];
//     let subProductId1 = _this.data('properties')[1][1];
//     let subProductId2 = _this.data('properties')[2][1];
//     let $pallet_val = Math.ceil($cartpc / palletNum);
//     let $breaking_val = $cartpc % palletNum;
   

//     var key = $(`.item[data-item-id="${subProductId1}"]`).data('item-key');
//     updates[key] = 0;

//     if($(`.item[data-item-id="${subProductId2}"]`).length > 0) {
//         key = $(`.item[data-item-id="${subProductId2}"]`).data('item-key');
//         updates[key] = 0;
//     }

//     updates[_this.closest('.item').data('item-key')] = 0;

//     var data = {
//         items: [
//             {
//                 id: mainProductId,
//                 quantity: $cartpc,
//                 properties: {
//                     '_pallet_num': palletNum,
//                     '_subproduct_id_0': subProductId1,
//                     '_subproduct_id_1': subProductId2
//                 }
//             },
//             {
//                 id: subProductId1,
//                 quantity: $pallet_val,
//                 properties: {
//                     '_mainproduct_id': mainProductId
//                 }
//             }
//         ]
//     }

//     if ($breaking_val != 0) {
//         data = {
//             items: [
//                 {
//                     id: mainProductId,
//                     quantity: $cartpc,
//                     properties: {
//                         '_pallet_num': palletNum,
//                         '_subproduct_id_0': subProductId1,
//                         '_subproduct_id_1': subProductId2
//                     }
//                 },
//                 {
//                     id: subProductId1,
//                     quantity: $pallet_val,
//                     properties: {
//                         '_mainproduct_id': mainProductId
//                     }
//                 },
//                 {
//                     id: subProductId2,
//                     quantity: 1,
//                     properties: {
//                         '_mainproduct_id': mainProductId
//                     }
//                 }
//             ]
//         }
//     }

//     itemsUpdate();
    
//     function itemsUpdate() {
//         $.ajax({
//             type: 'POST',
//             url: '/cart/update.js',
//             data: {
//                 updates:updates
//             },
//             dataType: 'json',
//             async:false,  // Be warned, async:false has been deprecated in jQuery for a long time and is not recommended for use. It's generally recommended to use callbacks or promises instead
//             success: function(){
//                 $.ajax({
//                     type: 'POST',
//                     url: '/cart/add.js',
//                     data: data,
//                     dataType: 'json',
//                     async:false,  // Be warned, async:false has been deprecated in jQuery for a long time and is not recommended for use. It's generally recommended to use callbacks or promises instead
//                     success: function(){
//                         window.location.href= '/cart';
//                     }
//                 });
//             }
//         })
//     }
// }

// $(document).on('change', '.jc-cart-value', function(e) {
//     e.preventDefault();
//     changeItem($(this));
// })

// $('.jc-cart .minus').click(function(e){
//     e.preventDefault();
//     var $input = $(this).closest('.jc-cart').find('input');
//     let qty = $input.val();
//     if(qty > 0) {
//         $input.val(qty - 1);
//         changeItem($input);
//     }
// });

// $('.jc-cart .plus').click(function(e){
//     e.preventDefault();
//     var $input = $(this).closest('.jc-cart').find('input');
//     let qty = $input.val();
//     $input.val(Number(qty) + 1);
//     changeItem($input);
// });
// Example AJAX request to add a product to the cart


// let pallet_id = [];
// document.querySelectorAll('.cart-list .pallet').forEach(item => {
//     item.querySelectorAll('.pallet-product').forEach(item => {
//         pallet_id.push(item.querySelector('.item-price .pallet-price').getAttribute('data-pallet-id'));
//     })
// })
// console.log(pallet_id, "pallet_id");

// let pallet_pro_id = pallet_id[0];
// let breaking_id;
// let pallet_pro_num = 1; 
// let breaking_num = 0;
// if (pallet_id[1]) {
//     breaking_num = 1
//     breaking_id = pallet_id[1];
// }

// var productsToAdd = [
//   { id: pallet_pro_id, quantity: pallet_pro_num },
//   { id: breaking_id, quantity: breaking_num },
//   // Adicione mais produtos conforme necessário
// ];

// // Função para adicionar vários produtos ao carrinho e redirecionar para o checkout

// function addProductsToCartAndRedirect(products) {
//   products.forEach(function(product) {
//     $.ajax({
//       type: 'POST',
//       url: '/cart/add.js',
//       data: {
//         quantity: product.quantity,
//         id: product.id
//       },
//       dataType: 'json',
//       success: function(data) {
//         console.log('Product added to cart successfully');
//         // Adicione lógica adicional aqui, se necessário
//       },
//       error: function(xhr, status, error) {
//         console.log('Error adding product to cart');
//       }
//     });
//   });
  
//   // Redirecionar para a página de checkout após adicionar todos os produtos
//   window.location.href = '/checkout';
// }
// $(document).on('click', '.checkout-btn', function(e) {
//     console.log("check_out");
//     addProductsToCartAndRedirect(productsToAdd);

// })

$(document).on("click", ".jc-cart-remove", function (e) {
  e.preventDefault();
  var updates = {};
  var properties = $(this).data("properties");

  if (Array.isArray(properties)) {
    properties.forEach((property, index) => {
      console.log(property, "here--->");
      if (index !== 0) {
        const variantID = property[1];
        const key = $(`.item[data-item-id="${variantID}"]`).data("item-key");
        console.log(key, "key");
        updates[key] = 0;
      }
    });
  }

  updates[$(this).closest(".item").data("item-key")] = 0;

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
});

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
console.log(price_format, 'item_price');

$('.under-cart .amount .money').text(price_format + ' kr');



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


// function changeItem(_this) {
//         var updates = {};
//         const $cartpc = _this.val();
//         const mainProductId = _this.closest('.item').data('item-id');
//         console.log(mainProductId, "mainProductId")
//         updates[mainProductId] = $cartpc;
//         itemsUpdate();
//         function itemsUpdate() {
//             $.ajax({
//                 type: 'POST',
//                 url: '/cart/update.js',
//                 data: {
//                     updates:updates
//                 },
//                 dataType: 'json',
//                 async:false,  // Be warned, async:false has been deprecated in jQuery for a long time and is not recommended for use. It's generally recommended to use callbacks or promises instead
//                 success: function(){
//                     window.location.href= '/cart';
//                 }
//             })
//         }

// }


$(document).on('click', '.cart-delete-all', function(e){
    e.preventDefault();
    console.log('remove')
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


function changeItem(_this) {
    console.log(_this, "here");
    var updates = {};
    let $cartpc = _this.val();
    let mainProductId = _this.closest('.item').data('item-id');
    let palletNum = _this.data('properties')[0][1];
    let subProductId1 = _this.data('properties')[1][1];
    let subProductId2 = _this.data('properties')[2][1];
    let $pallet_val = Math.ceil($cartpc / palletNum);
    let $breaking_val = $cartpc % palletNum;
   

    var key = $(`.item[data-item-id="${subProductId1}"]`).data('item-key');
    updates[key] = 0;

    if($(`.item[data-item-id="${subProductId2}"]`).length > 0) {
        key = $(`.item[data-item-id="${subProductId2}"]`).data('item-key');
        updates[key] = 0;
    }

    updates[_this.closest('.item').data('item-key')] = 0;

    var data = {
        items: [
            {
                id: mainProductId,
                quantity: $cartpc,
                properties: {
                    '_pallet_num': palletNum,
                    '_subproduct_id_0': subProductId1,
                    '_subproduct_id_1': subProductId2
                }
            },
            {
                id: subProductId1,
                quantity: $pallet_val,
                properties: {
                    '_mainproduct_id': mainProductId
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
                        '_subproduct_id_0': subProductId1,
                        '_subproduct_id_1': subProductId2
                    }
                },
                {
                    id: subProductId1,
                    quantity: $pallet_val,
                    properties: {
                        '_mainproduct_id': mainProductId
                    }
                },
                {
                    id: subProductId2,
                    quantity: 1,
                    properties: {
                        '_mainproduct_id': mainProductId
                    }
                }
            ]
        }
    }

    itemsUpdate();
    
    function itemsUpdate() {
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
}
