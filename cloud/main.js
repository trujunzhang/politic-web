/**
 * Copyright 2016 Facebook, Inc.
 *
 * You are hereby granted a non-exclusive, worldwide, royalty-free license to
 * use, copy, modify, and distribute this software in source code or binary
 * form for use in connection with the web services and APIs provided by
 * Facebook.
 *
 * As with any software that integrates with the Facebook platform, your use
 * of this software is subject to the Facebook Developer Principles and
 * Policies [http://developers.facebook.com/policy/]. This copyright notice
 * shall be included in all copies or substantial portions of the software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE
 */

'use strict'

/**
 * "mailUrl": "smtp://politiclmailsender:Politicl@123@smtp.sendgrid.net:465/",
 */
Parse.Cloud.define("sendEmail", function (request, response) {

  // Import SendGrid module and call with your SendGrid API Key
  var sg = require('sendgrid')('your SendGrid API key here');

  // Create the SendGrid Request
  var reqSG = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: {
      personalizations: [
        {
          to: [
            {
              // This field is the "to" in the email
              email: request.params.toEmail,
            },
          ],
          // This field is the "subject" in the email
          subject: request.params.subject,
        },
      ],
      // This field contains the "from" information
      from: {
        email: 'info@youremail.com',
        name: 'Your Name',
      },
      // This contains info about the "reply-to"
      // Note that the "reply-to" may be different than the "from"
      reply_to: {
        email: 'info@youremail.com',
        name: 'Your Name',
      },
      content: [
        {
          // You may want to leave this in text/plain,
          // Although some email providers may accept text/html
          type: 'text/plain',
          // This field is the body of the email
          value: request.params.body,
        },
      ],
    },
  });

  // Make a SendGrid API Call
  sg.API(reqSG, function (SGerror, SGresponse) {
    // Testing if some error occurred
    if (SGerror) {
      // Ops, something went wrong
      console.error('Error response received');
      console.error('StatusCode=' + SGresponse.statusCode);
      console.error(JSON.stringify(SGresponse.body));
      response.error('Error = ' + JSON.stringify(SGresponse.body));
    }
    else {
      // Everything went fine
      console.log('Email sent!');
      response.success('Email sent!');
    }
  });

});
