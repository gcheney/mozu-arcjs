var _ = require('underscore');
var CustomerSegmentFactory = require('mozu-node-sdk/clients/commerce/customer/customerSegment');

module.exports = function (context, callback) {
	var customerSegmentResource = CustomerSegmentFactory(context.apiContext);
	customerSegmentResource.context['user-claims'] = null;
	console.info("Hello from Add Account and Login!");
	console.info("Request...");
  console.info(context.request.body);
	console.info("Response...");
	console.info(context.response.body);
	console.info(context.response.body.customerAccount);
    
	var account = context.response.body.customerAccount;
	customerSegmentResource.getSegments({ filter: "name eq 'New Customers'" })
    .then(function (segmentCollection) {
      if (_.first(segmentCollection.items)) {
        var newCustomerSegment = _.first(segmentCollection.items);
        var accountId = [account.id];
        return customerSegmentResource.addSegmentAccounts({id: newCustomerSegment.id}, {body: accountId});
      }
    })
    .then(function() {
      console.info("Successfully added " + account.firstName + " " + account.lastName + " to the New Customers segment.");
      callback();
    })
    .catch(function(err) {
      console.error(err);
      callback();
    });
};