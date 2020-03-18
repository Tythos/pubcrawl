/*
*/

if (typeof(define) != "function") { var define = require("sfjm").define.bind(exports); }
define(function(require, module, exports) {
	exports.publish = function(tag, event={}) {
		/* Triggers relegant subscribers.
		*/
		if (Object.keys(this.eventListeners).indexOf(tag) < 0) {
			this.eventListeners[tag] = [];
		}
		this.eventListeners[tag].forEach(function(listener) {
			listener(event);
		}, this);
	};

	exports.subscribe = function(tag, listener) {
		/* Must be bound to a specific object context, preferably by "attach()'.
		*/
		if (Object.keys(this.eventListeners).indexOf(tag) < 0) {
			this.eventListeners[tag] = [];
		}
		this.eventListeners[tag].push(listener);
	};

	exports.attach = function(object) {
		/* Primary means by which pub/sub behavior is attached to a specific object.
		*/
		object.eventListeners = {};
		object.publish = exports.publish.bind(object);
		object.subscribe = exports.subscribe.bind(object);
	};

	return Object.assign(exports, {
		"__uni__": "com.github.tythos.pubcrawl",
		"__semver__": "0.0.1",
		"__author__": "code@tythos.net"
	});
});

