Template.prayer.onRendered(() => {
	Meteor.subscribe("prayers");
})

Template.prayer.helpers({
	'prayer': function() {
		return Prayers.find({}, {sort: {submitted: -1}});
	},
	'admin': function() {
		return Meteor.userId() === Meteor.users.findOne({username: 'admin'})._id;
	},
	'noPrayer': function() {
		return Prayers.find().count() === 0;
	}
});

Template.prayer.events({
	/*
	'click #delete-event': function(event) {
		event.preventDefault();
		console.log(event);
		console.log(this);
	}*/
	
	'submit form': function(event) {
		event.preventDefault();

		if(Meteor.userId() !== Meteor.users.findOne({username: 'admin'})._id) {
			toastr.error("You must be an admin to delete.");
			return;
		} else {
			$('#myModal').modal('hide');
			$('body').removeClass('modal-open');
			$('.modal-backdrop').remove();
			
			Meteor.call('deletePrayer', this._id, function(err, result){
				if(err){
					toastr.error('Error');
					console.log(err);
				} else {
					toastr.success("Request deleted");
				}
			});
		}
	}
});