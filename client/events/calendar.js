Template.calendar.onCreated(function() {
	Meteor.subscribe("events");
});

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
    eventClick: function( event, jsEvent, view ) {
      $('#modalTitle').html(event.title);
      $('#startTime').html(moment(event.start._d).format("MMMM D, YYYY, h:mm a"));
      $('#endTime').html(moment(event.end._d).format("MMMM D, YYYY, h:mm a"));
      $('#description').html(event.description);
      $('#hostedBy').html(event.location);

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
  }
});