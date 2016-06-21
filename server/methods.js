Meteor.methods({
  sendEmail: function(email) {
    const address = email.address;
    const name = email.name;
    const txt = email.text;

    check([address, name, txt], [String]);

    this.unblock();

    Email.send({
    	to: 'admin@gpusa.org', 
    	from: address, 
    	subject: "Contact Form Message",
    	html: "<p><strong>From: </strong>" + name + ", </p>" + "<p><strong>Message: </strong>" + txt + "</p>",
    });
  },
});