Template.footer.onRendered( () => {
	Meteor.subscribe('events');
});

Template.footer.helpers({
	'event': function() {
		return Events.find({start: { $gte: new Date() } }, {
			sort: {start: 1},
			limit: 3
		});
	},
	'none': function() {
		return Boolean(!Events.findOne({start: { $gte: new Date() }}));
	}
});