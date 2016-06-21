Meteor.publish('images', function() {
	return Images.find();
});

Meteor.publish('events', function() {
	return Events.find();
})