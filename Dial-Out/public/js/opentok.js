const session = OT.initSession(apiKey, sessionId);
const publisher = OT.initPublisher('publisher');

session.on({
  streamCreated: (event) => {
    console.log('StreamCreated Event received, start subscription');
    const subscriberClassName = `subscriber-${event.stream.streamId}`;
    const subscriber = document.createElement('div');
    subscriber.setAttribute('id', subscriberClassName);
    document.getElementById('subscribers').appendChild(subscriber);
    session.subscribe(event.stream, subscriberClassName);
  },
  streamDestroyed: (event) => {
    console.log(`Stream ${event.stream.name} ended because ${event.reason}.`);
  },
  sessionConnected: event => {
    console.log('session connected', event);
    session.publish(publisher, function(err) {
	    if (err) {
		    console.error('Error occurred during publish ', err);
	    } else {
		    console.log('Successfully published.');
	    }
    });
}});

session.connect(token, (error) => {
  if (error) {
    console.log('error connecting to session');
  }
});
