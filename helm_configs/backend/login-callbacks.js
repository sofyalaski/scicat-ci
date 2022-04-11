"use strict";

exports.accessGroupsToProfile =
  function (req, done) {
    return function (err, user, identity, token) {
      identity.updateAttributes({ 
        "profile": {
          accessGroups: identity.profile._json.pgroups,
          email: identity.profile._json.email,
          ...identity.profile
        }, 
        "credentials": null });
      var authInfo = {
        identity: identity,
      };
      if (token) {
        authInfo.accessToken = token;
      }
      done(err, user, authInfo);
    };
  };
