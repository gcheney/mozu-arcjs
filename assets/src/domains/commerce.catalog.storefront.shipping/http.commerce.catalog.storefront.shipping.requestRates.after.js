/**
 * Implementation for http.commerce.catalog.storefront.shipping.requestRates.after


 * HTTP Actions all receive a similar context object that includes
 * `request` and `response` objects. These objects are similar to
 * http.IncomingMessage objects in NodeJS.

{
  configuration: {},
  request: http.ClientRequest,
  response: http.ClientResponse
}

 * Call `response.end()` to end the response early.
 * Call `response.set(headerName)` to set an HTTP header for the response.
 * `request.headers` is an object containing the HTTP headers for the request.
 *
* The `request` and `response` objects are both Streams and you can read
 * data out of them the way that you would in Node.

 */

module.exports = function(context, callback) {
  console.info(context.request.headers);
  console.info(context.request.params);
  console.log(context.request.href);
  console.info(context.response.body);
  console.log(context.response.body.rates[0]);
  console.log(context.response.body.rates[0].shippingRates[0]);
  console.log(context.response.body.rates[0].shippingRates[0].amount);

  context.response.body.rates.forEach(function(rate) {
    console.log("Rate: " + rate.carrierId);
    rate.shippingRates.forEach(function(shippingRate) {
      console.log("Shipping rate: " + shippingRate.code);
      console.log("Amount: " + shippingRate.amount);
    });
  });

  var additionalShipping = 25;//context.configuration.additionalShippingPercentage;
  var rates = context.response.body.rates;

  rates.forEach(function(rate) {
    rate.shippingRates.forEach(function(shippingRate) {
      if (shippingRate.content.name === "Flat Rate") {
        shippingRate.amount += (shippingRate.amount * additionalShipping);
      }
    });
  });


  callback();
};