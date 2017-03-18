
var css_classes = require('./css_classes');

module.exports = CartBoard;

function CartBoard($) {
  var cartWrapper = $('.cd-cart-container');
  var cartCheckout = cartWrapper.find(css_classes.cart_checkout_button);
  
  if( cartWrapper.length > 0 ) {
    var cartBody = cartWrapper.find('.body');
    var cartList = cartBody.find('ul').eq(0);
    var cartTotal = cartWrapper.find('.checkout').find('span');
    var cartTrigger = cartWrapper.children('.cd-cart-trigger');
    var cartCount = cartTrigger.children('.count');
    var addToCartBtn = $('.cd-add-to-cart');
    var undo = cartWrapper.find('.undo');
    var undoTimeoutId;
    
    //add product to cart
    // addToCartBtn.on('click', function(event){
    //   event.preventDefault();
    //   addToCart($(this));
    // });
    
    //open/close cart
    cartTrigger.on('click', function(event){
      event.preventDefault();
      toggleCart();
    });
    
    //close cart when clicking on the .cd-cart-container::before (bg layer)
    cartWrapper.on('click', function(event){
      if( $(event.target).is($(this)) ) toggleCart(true);
    });
    
    //delete an item from the cart
    cartList.on('click', '.delete-item', function(event){
      event.preventDefault();
      removeProduct($(event.target).parents('.product'));
    });
    
    //update item quantity
    cartList.on('change', 'select', function(event){
      quickUpdateCart();
    });
    
    //reinsert item deleted from the cart
    undo.on('click', 'a', function(event){
      clearInterval(undoTimeoutId);
      event.preventDefault();
      cartList.find('.deleted').addClass('undo-deleted').one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(){
      	$(this).off('webkitAnimationEnd oanimationend msAnimationEnd animationend').removeClass('deleted undo-deleted').removeAttr('style');
      	quickUpdateCart();
      });
      undo.removeClass('visible');
    });
  }
  
  function toggleCart(bool) {
    var cartIsOpen = ( typeof bool === 'undefined' ) ? cartWrapper.hasClass('cart-open') : bool;
    
    if( cartIsOpen ) {
      cartWrapper.removeClass('cart-open');
      //reset undo
      clearInterval(undoTimeoutId);
      undo.removeClass('visible');
      cartList.find('.deleted').remove();
      
      setTimeout(function(){
        cartBody.scrollTop(0);
        //check if cart empty to hide it
        if( Number(cartCount.find('li').eq(0).text()) === 0) 
          cartWrapper.addClass('empty');
      }, 500);
    } else {
    	cartWrapper.addClass('cart-open');
    }
  }
  
  function addToCart(reference, article) {
    var cartIsEmpty = cartWrapper.hasClass('empty');
    //update cart product list
    var added = addProduct(reference, article);
    if(added) {
      //update number of items 
      updateCartCount(cartIsEmpty);
      //update total price
      updateCartTotal(article.price, true);
      //show cart
      cartWrapper.removeClass('empty');
    }
  }
  
  function addProduct(reference, article) {
    var ref_product = '.product-ref-' +reference;
    var product = cartList.find(ref_product);
    if(!product || product.length === 0) {
      var productAdded = $('<li class="product product-ref-' + reference + '"><div class="product-image"><a href="#0"><img src="' + article.image + '" alt="placeholder"></a></div><div class="product-details"><h3><a href="#0">' + article.name + '</a></h3><span class="price">' + article.price + '€</span><div class="actions"><a href="#0" class="delete-item">Delete</a><div class="quantity"><label for="cd-product-'+ reference +'">Qty</label><span class="select"><select id="cd-product-'+ reference +'" name="quantity"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option></select></span></div></div></div></li>');
      cartList.prepend(productAdded);
    }
    else {
      if(product) {
        var qty = Number(product.find('select').val());
        console.log(qty);
        product.find('select').val(qty + 1);
      }
    }
    return true;
  }
  
  function removeProduct(product) {
    clearInterval(undoTimeoutId);
    cartList.find('.deleted').remove();
    
    var topPosition = product.offset().top - cartBody.children('ul').offset().top ,
      productQuantity = Number(product.find('.quantity').find('select').val()),
      productTotPrice = Number(product.find('.price').text().replace('€', '')) * productQuantity;
    
    product.css('top', topPosition+'px').addClass('deleted');
    
    //update items count + total price
    updateCartTotal(productTotPrice, false);
    updateCartCount(true, -productQuantity);
    undo.addClass('visible');
    
    //wait 8sec before completely remove the item
    undoTimeoutId = setTimeout(function(){
      undo.removeClass('visible');
      cartList.find('.deleted').remove();
    }, 8000);
  }
  
  function quickUpdateCart() {
    var quantity = 0;
    var price = 0;
    
    cartList.children('li:not(.deleted)').each(function(){
    	var singleQuantity = Number($(this).find('select').val());
    	quantity = quantity + singleQuantity;
    	price = price + singleQuantity*Number($(this).find('.price').text().replace('€', ''));
    });
    
    cartTotal.text(price.toFixed(2));
    cartCount.find('li').eq(0).text(quantity);
    cartCount.find('li').eq(1).text(quantity+1);
  }
  
  function updateCartCount(emptyCart, quantity) {
    var actual, next;
    if( typeof quantity === 'undefined' ) {
      actual = Number(cartCount.find('li').eq(0).text()) + 1;
      next = actual + 1;
      
      if( emptyCart ) {
      	cartCount.find('li').eq(0).text(actual);
      	cartCount.find('li').eq(1).text(next);
      } else {
      	cartCount.addClass('update-count');
      
      	setTimeout(function() {
          cartCount.find('li').eq(0).text(actual);
      	}, 150);
      
      	setTimeout(function() {
      	  cartCount.removeClass('update-count');
      	}, 200);
      
      	setTimeout(function() {
      	  cartCount.find('li').eq(1).text(next);
      	}, 230);
      }
    } else {
      actual = Number(cartCount.find('li').eq(0).text()) + quantity;
      next = actual + 1;
      
      cartCount.find('li').eq(0).text(actual);
      cartCount.find('li').eq(1).text(next);
    }
  }
  
  function updateCartTotal(price, bool) {
    if(bool)
      cartTotal.text( (Number(cartTotal.text()) + Number(price)).toFixed(2) );
    else
      cartTotal.text( (Number(cartTotal.text()) - Number(price)).toFixed(2) );
  }

  function onCheckoutClick(fn) {
    cartCheckout.on('click', fn);
  }

  return {
    addToCart: addToCart,
    onCheckoutClick: onCheckoutClick
  };
}

