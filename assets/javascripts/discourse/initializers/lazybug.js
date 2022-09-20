export default {
  name: 'reply_quote',
  initialize() {
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });

    setTimeout(function() {
      const { REPLY } = require('discourse/models/composer').default;
      const composer = Discourse.__container__.lookup('controller:composer');
      const topic = Discourse.__container__.lookup("controller:topic").get("model");

      console.log(topic, params);
      if (topic && params.reply_quote) {
        composer.open({
          action: REPLY,
          draftKey: topic.draft_key,
          draftSequence: topic.draft_sequence,
          quote: params.reply_quote,
          topic,
        });
      }
    }, 0);
  }
};
