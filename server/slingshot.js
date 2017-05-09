Slingshot.fileRestrictions( "myImageUploads", {
  allowedFileTypes: [ "image/png", "image/jpeg", "image/gif" ],
  maxSize: 5 * 1024 * 1024,
});

Slingshot.createDirective( "myImageUploads", Slingshot.S3Storage, {
  bucket: Meteor.settings.Bucket,
  acl: "public-read",
  region: "us-west-2",

  authorize: function () {
    if(this.userId !== Meteor.users.findOne({username: 'admin'})._id) {
      throw new Meteor.Error("Not Admin", "You must be an admin");
    }

    return true;
  },
  key: function ( file ) {
    return "img/" + file.name;
  }
});