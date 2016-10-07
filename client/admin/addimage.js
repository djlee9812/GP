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
	'change .inputfile'(event) {
		if(event.target.files.length > 1) {
			event.preventDefault();
			toastr.warning("Please select a single image");
		}
	},

	'submit form': function(event) {
		event.preventDefault();

		if(Meteor.userId() !== Meteor.users.findOne({username: 'admin'})._id) {
			toastr.error("You must be an admin to add the image.");
			router.go('/');
			return;
		}
		const title = $('input[name=image-title]').val();
		const imgName = event.target[1].files[0].name;

		if(event.target[1].files.length > 1){
			toastr.error('Please select a single image');
			return;
		}
		if(!title){
			toastr.error('Please enter an event title.');
			return;
		}
		
		const uploader = new Slingshot.Upload("myImageUploads");

		uploader.send(event.target[1].files[0], function (error, downloadUrl) {
			if (error) {
		    // Log service detailed response
		    console.error('Error uploading', uploader.xhr.response);
		    console.error(error);
		    toastr.error("Error uploading");
		  }
		  else {
		  	const attr = {
		  		title: title,
		  		src: imgName
		  	}
		  	Meteor.call("uploadImg", attr, function(error) {
		  		if(error) {
		  			toastr.error("Error adding to database");
		  		} else {
		  			toastr.success("Image added!");
		  			router.go("/gallery");
		  		}
		  	});
		  	
		  }
		});
		upload.set(uploader);
	}
});