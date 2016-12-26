let upload = new ReactiveVar();

Template.addImage.onRendered(() => {
	//Script for changing file input form label
	var inputs = document.querySelectorAll( '.inputfile' );
	Array.prototype.forEach.call( inputs, function( input )
	{
		var label	 = input.nextElementSibling,
		labelVal = label.innerHTML;

		input.addEventListener( 'change', function( e )
		{
			var fileName = '';
			if( this.files && this.files.length > 1 )
				fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
			else
				fileName = e.target.value.split( '\\' ).pop();

			if( fileName )
				label.querySelector( 'span' ).innerHTML = fileName;
			else
				label.innerHTML = labelVal;
		});
	});
});

Template.addImage.helpers({
	progress: function () {
		if(upload.get()){
			return prog = Math.round(upload.get().progress() * 100);
		}
	},
	uploadingProgress: function () {
		return Boolean(upload.get());
	}
});

Template.addImage.events({
	'submit form': function(event) {
		event.preventDefault();

		if(Meteor.userId() !== Meteor.users.findOne({username: 'admin'})._id) {
			toastr.error("You must be an admin to add the image.");
			router.go('/');
			return;
		}
		var fileobj = $("input#file").prop('files');
		$.each(fileobj, function(i, val) {
			let uploader = new Slingshot.Upload("myImageUploads");
			let imgName = val.name;
			uploader.send(val, function (error, downloadUrl) {
				upload.set()
				if (error) {
			    // Log service detailed response
			    console.error('Error uploading', uploader.xhr.response);
			    console.error(error);
			    toastr.error("Error uploading");
			  } else {
			  	Meteor.call("uploadImg", imgName, function(error) {
			  		if(error) {
			  			toastr.error("Error adding images to the database");
			  		} else {
			  			toastr.success("Image added!");
			  			Router.go('/gallery')
			  		}
			  	});

			  }
			});
			upload.set(uploader);
		});
	}
});