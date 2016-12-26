Template.picture.helpers({
	'admin': function() {
		return Meteor.userId() === Meteor.users.findOne({username: 'admin'})._id;
	}
});

Template.picture.events({
	'click .trash-btn': function(event) {
		event.preventDefault();
		const imgId = this._id;
		bootbox.confirm("Are you sure you want to delete?", function(result) {
			if(result) {
				Meteor.call('deleteImg', imgId, function(err, result) {
					if(err) {
						toastr.error("error");
						console.log(err);
					}
				});
			}
		});
	}
})