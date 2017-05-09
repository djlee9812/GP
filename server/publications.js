Meteor.publish('images', function() {
	return Images.find();
});

Meteor.publish('events', function() {
	return Events.find();
});

Meteor.publish('prayers', function() {
	return Prayers.find();
});

Meteor.publish('announcements', function() {
	return Announcements.find();
});