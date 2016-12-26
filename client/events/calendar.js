Template.calendar.onCreated(function() {
	Meteor.subscribe("events");
});

let eventId = new ReactiveVar("");

Template.calendar.helpers({
	calendarOptions: {
		height: 700,
    eventColor: '#18ba9b',
    // Function providing events reactive computation for fullcalendar plugin
    events: function(start, end, timezone, callback) {
      var eventCursor = Events.find();
      var events = eventCursor.fetch();
      callback(events);
    },
    eventRender:function (event, element) {
      if(event.location !== "GP") {
        element.css({'background-color': '#2980b9', 'border-color': '#2980b9'});
      } 
    },
    nextDayThreshold: "07:00:00",
    eventClick: function( event, jsEvent, view ) {
      eventId.set(event._id);
      $('#modalTitle').html(event.title);
      $('#startTime').html(moment(event.start._d).format("MMMM D, YYYY, h:mm a"));
      $('#endTime').html(moment(event.end._d).format("MMMM D, YYYY, h:mm a"));
      $('#description').html(event.description);
      $('#hostedBy').html(event.location);
      if(event.location==='GP') {
        $('#js-modal-body').append('<p id="address"><strong>Address: </strong>10582 Katella Ave. Anaheim, CA 92804</p>');
        $('#myModal').on('hidden.bs.modal', function () {
          $("#address").remove();
        })
      }

      //if url exists
      if(event.url !== "#") {
        //if hidden, make visible
        if($('#link-btn').hasClass('hidden-btn')){
          $('#link-btn').removeClass('hidden-btn');
        }
        //set correct href to anchor
        $('#event-url-btn').attr('href', event.url);
      } else {
        //if no url and button visible, then hide
        if(!$('#link-btn').hasClass('hidden-btn')) {
          $('#link-btn').addClass('hidden-btn');
        }
      }

      $('#myModal').modal('toggle');
    },
  }, 
  'admin': function() {
    return Meteor.userId() === Meteor.users.findOne({username: 'admin'})._id;
  },
});

Template.calendar.events({
  'click #link-btn': function(event) {
    event.preventDefault();
    
    const ref = event.target.href;
    console.log(ref);
    if(ref === "http://localhost:3000/calendar#" || ref === "http://gpusa.org/calendar#") {
      toastr.info("This event does not contain an external link.");
      return;
    } else {
      window.location.href = ref;
    }
  },
  'click a.fc-day-grid-event': function(event) {
    event.preventDefault();
  },
  'click #delete-btn': function(event) {
    event.preventDefault();
    if(Meteor.userId() === Meteor.users.findOne({username: 'admin'})._id) {
      bootbox.confirm("Are you sure you want to delete?", function(result) {
        if(result) {
          Meteor.call('deleteEvent', eventId.get(), function(error, result) {
            if(error) {
              toastr.error("Error");
              console.log(error);
            } else {
              toastr.success("Event deleted");
              Router.go('/calendar');
            }
          }); 
        }
      });
    } else {
      toastr.error("Permission error");
    }
  },
  'click #edit-btn': function(event) {
    event.preventDefault();
    if(Meteor.userId() === Meteor.users.findOne({username: 'admin'})._id) {
      $('#myModal').modal('hide');
      $('body').removeClass('modal-open');
      $('.modal-backdrop').remove();
      Router.go('edit', {_id: eventId.get()});
    } else {
      toastr.error("Permission error");
    }
  },
});