'use strict';

var exec = require('cordova/exec'),
  mixpanelCordova = {
    people: {}
  },
  errors = {
    invalid: function(paramName, value) {
      return 'invalid ' + paramName + ': ' + value;
    }
  };


// MIXPANEL API


mixpanelCordova.alias = mixpanelCordova.createAlias = function(alias, originalId, onSuccess, onFail) {
  if (!alias || typeof alias !== 'string') {
    return onFail(errors.invalid('alias', alias));
  }

  exec(onSuccess, onFail, 'Mixpanel', 'alias', [alias, originalId]);
};

mixpanelCordova.distinctId = function(onSuccess, onFail) {
  exec(onSuccess, onFail, 'Mixpanel', 'distinctId', []);
};

mixpanelCordova.flush = function(onSuccess, onFail) {
  exec(onSuccess, onFail, 'Mixpanel', 'flush', []);
};

mixpanelCordova.identify = function(id, onSuccess, onFail) {
  if (!id || typeof id !== 'string') {
    return onFail(errors.invalid('id', id));
  }

  exec(onSuccess, onFail, 'Mixpanel', 'identify', [id]);
};

mixpanelCordova.init = function(token, onSuccess, onFail) {
  if (!token || typeof token != 'string') {
    return onFail(errors.invalid('token', token));
  }

  exec(onSuccess, onFail, 'Mixpanel', 'init', [token]);
};

mixpanelCordova.registerSuperProperties = function(superProperties, onSuccess, onFail) {
  if (!superProperties || typeof superProperties !== 'object') {
    return onFail(errors.invalid('superProperties', superProperties));
  }

  exec(onSuccess, onFail, 'Mixpanel', 'registerSuperProperties', [superProperties]);
};

mixpanelCordova.reset = function(onSuccess, onFail) {
  exec(onSuccess, onFail, 'Mixpanel', 'reset', []);
};

mixpanelCordova.showSurvey = function(onSuccess, onFail) {
  exec(onSuccess, onFail, 'Mixpanel', 'showSurvey', []);
};

mixpanelCordova.timeEvent = function(eventName, onSuccess, onFail) {
  if (!eventName || typeof eventName != 'string') {
    return onFail(errors.invalid('event', eventName));
  }
  exec(onSuccess, onFail, 'Mixpanel', 'timeEvent', [eventName]);
};

mixpanelCordova.track = function(eventName, eventProperties, onSuccess, onFail) {
  if (!eventName || typeof eventName != 'string') {
    return onFail(errors.invalid('event', eventName));
  }

  exec(onSuccess, onFail, 'Mixpanel', 'track', [eventName, eventProperties]);
};


// PEOPLE API


/** @deprecated 2016-11-21 mixpanelCordova.identify will set id for both events and people */
mixpanelCordova.people.identify = function(distinctId, onSuccess, onFail) {
  if (!distinctId) {
    return onFail(errors.invalid('distinctId', distinctId));
  }

  exec(onSuccess, onFail, 'Mixpanel', 'identify', [distinctId]);
};

mixpanelCordova.people.increment = function(peopleProperties, onSuccess, onFail) {
  if (!peopleProperties || (typeof peopleProperties === 'object' && Object.keys(peopleProperties).length === 0)) {
    return onFail(errors.invalid('properties', peopleProperties));
  }

  exec(onSuccess, onFail, 'Mixpanel', 'people_increment', [peopleProperties]);
};

mixpanelCordova.people.set = function(peopleProperties, onSuccess, onFail) {
  if (!peopleProperties || (typeof peopleProperties === 'object' && Object.keys(peopleProperties).length === 0)) {
    return onFail(errors.invalid('properties', peopleProperties));
  }

  exec(onSuccess, onFail, 'Mixpanel', 'people_set', [peopleProperties]);
};

mixpanelCordova.people.setOnce = function(peopleProperties, onSuccess, onFail) {
  if (!peopleProperties || (typeof peopleProperties === 'object' && Object.keys(peopleProperties).length === 0)) {
    return onFail(errors.invalid('properties', peopleProperties));
  }

  exec(onSuccess, onFail, 'Mixpanel', 'people_set_once', [peopleProperties]);
};

/**
 * @param pushId is the token/id you get back when registering the device with the notification service
 *        for android - this is the GCM token
 *        for ios - this is the APN token
 */
mixpanelCordova.people.setPushId = function(pushId, onSuccess, onFail) {
  if (!pushId || typeof pushId !== 'string') {
    return onFail(errors.invalid('pushId', pushId));
  }

  exec(onSuccess, onFail, 'Mixpanel', 'people_setPushId', [pushId]);
};

mixpanelCordova.people.clearPushId = function (onSuccess, onFail) {
  exec(onSuccess, onFail, 'Mixpanel', 'people_clearPushId');
};

mixpanelCordova.people.trackCharge = function(amount, chargeProperties, onSuccess, onFail) {
  if (typeof amount !== 'number' || !isFinite(amount)) {
    return onFail(errors.invalid('amount', amount));
  }
  if (chargeProperties && typeof chargeProperties !== 'object') {
    return onFail(errors.invalid('chargeProperties', chargeProperties));
  }


  exec(onSuccess, onFail, 'Mixpanel', 'people_track_charge', [amount, chargeProperties]);
};

mixpanelCordova.people.unset = function(propertiesArray, onSuccess, onFail) {
  if (!Array.isArray(propertiesArray)) {
    return onFail(errors.invalid('propertiesArray', propertiesArray));
  }

  exec(onSuccess, onFail, 'Mixpanel', 'people_unset', [propertiesArray]);
};


// Exports


module.exports = mixpanelCordova;
