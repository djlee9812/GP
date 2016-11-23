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
      description: String,
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

  uploadImg: function(attr) {
    check(attr, {
      title: String,
      src: String,
    });

    if(this.userId !== Meteor.users.findOne({username: 'admin'})._id) {
      throw new Meteor.Error("not-admin", 
        "You must be an admin to take this action.");
    }

    const title = attr.title;
    const src = attr.src;

    Images.insert({
      title: title,
      src: src,
      timeInserted: new Date(),
    });
  },
});