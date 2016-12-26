Meteor.methods({
  sendEmail: function(email) {
    check(email, {
      address: String,
      name: String,
      text: String
    });

    const address = email.address;
    const name = email.name;
    const txt = email.text;
    this.unblock();

    Email.send({
    	to: 'admin@gpusa.org', 
    	from: address, 
    	subject: "Contact Form Message",
    	html: "<p><strong>From: </strong>" + name + ", </p>" + "<p><strong>Message: </strong>" + txt + "</p>",
    });
  },

  insertEvent: function(eventAttr) {
    check(eventAttr, {
      title: String,
      start: Date,
      end: Date,
      description: Match.Optional(String),
      location: String,
      link: Match.Optional(String),
      featured: Boolean
    });

    if(this.userId !== Meteor.users.findOne({username: 'admin'})._id) {
      throw new Meteor.Error("not-admin", 
        "You must be an admin to take this action.");
    }

    const title = eventAttr.title;
    const start = eventAttr.start;
    const end = eventAttr.end;
    const description = eventAttr.description;
    const location = eventAttr.location;
    const link = eventAttr.link;
    const featured = eventAttr.featured;

    Events.insert({
      title: title,
      start: start,
      end: end,
      description: description,
      location: location,
      url: link,
      featured: featured
    });

  },

  deleteEvent: function(requestId) {
    check(requestId, String);
    if (this.userId !== Meteor.users.findOne({username: 'admin'})._id) {
      throw new Meteor.Error('user-not-authorized');
    }
    Events.remove(requestId);
  },

  editEvent: function(requestId, eventAttr) {
    check(requestId, String);
    if (this.userId !== Meteor.users.findOne({username: 'admin'})._id) {
      throw new Meteor.Error('user-not-authorized');
    }
    check(eventAttr, {
      title: String,
      start: Date,
      end: Date,
      description: Match.Optional(String),
      location: String,
      link: Match.Optional(String),
      featured: Boolean
    });
    const title = eventAttr.title;
    const start = eventAttr.start;
    const end = eventAttr.end;
    const description = eventAttr.description;
    const location = eventAttr.location;
    const link = eventAttr.link;
    const featured = eventAttr.featured;

    Events.update(requestId, {
      title: title,
      start: start,
      end: end,
      description: description,
      location: location,
      url: link,
      featured: featured
    });
  },

  insertPrayer: function(prayerAttr) {
    check(prayerAttr, {
      name: String,
      location: String,
      request: String,
    });
    if(this.userId !== Meteor.users.findOne({username: 'admin'})._id) {
      throw new Meteor.Error("not-admin", 
        "You must be an admin to take this action.");
    }
    const name = prayerAttr.name;
    const location = prayerAttr.location;
    const request = prayerAttr.request;

    Prayers.insert({
      name: name,
      location: location,
      request: request,
      submitted: new Date()
    });
  },

  deletePrayer: function(requestId) {
    check(requestId, String);
    if (this.userId !== Meteor.users.findOne({username: 'admin'})._id) {
      throw new Meteor.Error('user-not-authorized');
    }
    Prayers.remove(requestId);
  },

  uploadImg: function(src) {
    check(src, String);

    if(this.userId !== Meteor.users.findOne({username: 'admin'})._id) {
      throw new Meteor.Error("not-admin", 
        "You must be an admin to take this action.");
    }

    Images.insert({
      src: src,
      timeInserted: new Date(),
    });
  },

  deleteImg: function(imgId) {
    AWS.config.update({
      accessKeyId: Meteor.settings.AWSAccessKeyId,
      secretAccessKey: Meteor.settings.AWSSecretAccessKey
    });

    var s3 = new AWS.S3();
    var key = Images.findOne(imgId).src;
    var objectKey = "img/" + key;
    var params = {
      Bucket: Meteor.settings.Bucket,
      Key: objectKey
    };
    
    var deleteObject = Meteor.wrapAsync(
      s3.deleteObject(params, Meteor.bindEnvironment(function(error, data) {
        if(error) {
          console.log(error);
        } else {
          Images.remove(imgId);
        }
      }))
    );
  },
});