var _ = require('underscore');

module.exports = function (context, callback) {
	var cart = context.get.cart();
	var cartItem = context.get.cartItem();
	var cartProductTypes = [];
	var oneTypePerCart = context.configuration.oneTypePerCart;
	console.info(cart);
	console.info(cartItem);

	if (cart.items.length > 1) {
		cart.items.forEach(function(item) {
			console.info(item.product.name);
			console.info(item.product.productType);
			if (cartItem.id !== item.id) {
				cartProductTypes.push(item.product.productType);
			}
		});
	}

	var cartItemProductType = cartItem.product.productType;

	if (cartItemProductType == oneTypePerCart && _.contains(cartProductTypes, cartItemProductType)) {
		var itemsToRemove = [];
		_.each(cart.items, function(item) {
			if (item.product.productType == cartItemProductType) {
				itemsToRemove.push(item);
			}
		});
		try {
			if (itemsToRemove.length > 0) {
				var itemToRemove = _.first(itemsToRemove);
				var errorMessage = itemToRemove.product.name + " has been removed from your cart. "
					+ "You can have only one item of the type " + oneTypePerCart + " in your cart at a time.";
				context.exec.removeItem(itemToRemove.id);
				context.exec.setData("removedItemMessage", errorMessage);
				context.exec.setData("removedItemId", itemToRemove.product.productCode);
			}
		} catch(err) {
			console.error(err);
		}
	}
	callback();
};