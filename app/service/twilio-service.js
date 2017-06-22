'use strict';
let dotenv = require('dotenv');
let accountSid = 'AC6bd554f31b65b1c6f2bedc725570fe6e';
let authToken = '3c2079f6bf9819af9fc27c890c16a4cd';

//require the Twilio module and create a REST client
let client = require('twilio')(accountSid, authToken);


module.exports = [
  function() {
    let service ={};
    service.linkMessage = function(child) {
      client.messages.create({
        to: `${child.phone}`,
        from: '13603299086',
        body: `http://localhost:8080/#!/pet/${child._id}`,
      }, function(err, message) {
        console.log(message.sid);
      });
    };
    return service;
  },
];
