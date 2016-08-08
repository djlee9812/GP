Meteor.methods({
  sendEmail: function(email) {
    const address = email.address;
    const name = email.name;
    const txt = email.text;

    check([address, name, txt], String);

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
      link: Match.Optional(String)
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
  
    Events.insert({
      title: title,
      start: start,
      end: end,
      description: description,
      location: location,
      url: link
    });

    
  },
});