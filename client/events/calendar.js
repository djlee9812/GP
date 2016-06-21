Template.calendar.onCreated(function() {
	Meteor.subscribe("events");
});

Template.calendar.helpers({
	calendarOptions: {
		height: 700,
		hiddenDays: [ 0 ],
		slotDuration: '01:00:00',
		minTime: '08:00:00',
		maxTime: '19:00:00',
		eventColor: '#18ba9b',
    // Function providing events reactive computation for fullcalendar plugin
    events: function(start, end, timezone, callback) {/*
      //console.log(start);
      //console.log(end);
      //console.log(timezone);
      var events = [];
      // Get only events from one document of the Calendars collection
      // events is a field of the Calendars collection document
      var calendar = Calendars.findOne(
      	{ "_id":"myCalendarId" },
      	{ "fields": { 'events': 1 } }
      );
      // events need to be an array of subDocuments:
      // each event field named as fullcalendar Event Object property is automatically used by fullcalendar
      if (calendar && calendar.events) {
      	calendar.events.forEach(function (event) {
      		eventDetails = {};
      		for(key in event)
      			eventDetails[key] = event[key];
      		events.push(eventDetails);
      	});
      }
      callback(events);*/
    },
  }
});