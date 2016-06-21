Template.contact.onRendered(function() {
 GoogleMaps.load({
  key: 'AIzaSyBm9xlVmN4MYWAghR9OTyMHAyvC_uUrNaQ'
});
});

Template.contact.onCreated(function() {
  // We can use the `ready` callback to interact with the map API once the map is ready.
  GoogleMaps.ready('exampleMap', function(map) {
    // Add a marker to the map once it's ready
    var marker = new google.maps.Marker({
      position: map.options.center,
      map: map.instance
    });
  });
});

Template.contact.helpers({
  exampleMapOptions: function() {
    // Make sure the maps API has loaded
    if (GoogleMaps.loaded()) {
      // Map initialization options
      return {
        center: new google.maps.LatLng(33.802755, -117.94883700000003),
        zoom: 13,
        scrollwheel: false,
      };
    }
  }
});

Template.contact.events({
  'submit form': function(event) {
    event.preventDefault();

    const address = $('[name=email]').val();
    const name = $('[name=name]').val();
    const text = $('[name=message]').val();

    if(!name) {
      toastr.error("Please enter your name.");
      return;
    }
    if(!address) {
      toastr.error("Please enter the email address.");
      return;
    }
    if(!text) {
      toastr.error("Please enter your message.");
      return;
    }

    //regex test for email, retest: boolean
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const retest = re.test(address);

    if(!retest) {
      toastr.error("Please enter a valid email address.");
      return;
    }

    var attr = {
      address: address,
      name: name,
      text: text
    }

    Meteor.call('sendEmail', attr, function(error) {
      if(error) {
        console.log(error);
        toastr.error("Email send failed.");
      } else {
        toastr.success("Email successfully sent!");
        $('#contact-form')[0].reset();
      }
    });
  }
})