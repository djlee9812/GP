Meteor.startup( function() {
  process.env.MAIL_URL = "smtp://postmaster%40mg.gpusa.org:268f361a49c845038ecfa809c8064147@smtp.mailgun.org:587";
});