"use strict";

var express = require('express');

var bodyParser = require('body-parser');

var fs = require('fs');

var fetch = require('node-fetch');

var app = express();
var PORT = 3000;
var GITHUB_TOKEN = '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'; // 여기에 Personal Access Token을 입력하세요.

var FILE_PATH = './access_codes.json';
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
}); // Load access codes from file

var accessCodes = [];

if (fs.existsSync(FILE_PATH)) {
  accessCodes = JSON.parse(fs.readFileSync(FILE_PATH));
} // Endpoint to create access code


app.post('/create-code', function _callee(req, res) {
  var codeData, gistData, response, data;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          codeData = req.body;
          gistData = {
            description: "Access Code",
            "public": false,
            files: {
              "access_codes.json": {
                content: JSON.stringify(codeData)
              }
            }
          };
          _context.prev = 2;
          _context.next = 5;
          return regeneratorRuntime.awrap(fetch('https://api.github.com/gists', {
            method: 'POST',
            headers: {
              'Authorization': "token ".concat(GITHUB_TOKEN),
              'Accept': 'application/vnd.github.v3+json'
            },
            body: JSON.stringify(gistData)
          }));

        case 5:
          response = _context.sent;
          _context.next = 8;
          return regeneratorRuntime.awrap(response.json());

        case 8:
          data = _context.sent;

          if (data.id) {
            _context.next = 11;
            break;
          }

          throw new Error('Failed to create gist');

        case 11:
          codeData.gistId = data.id;
          accessCodes.push(codeData);
          fs.writeFileSync(FILE_PATH, JSON.stringify(accessCodes));
          res.status(201).send(codeData);
          _context.next = 21;
          break;

        case 17:
          _context.prev = 17;
          _context.t0 = _context["catch"](2);
          console.error('Error:', _context.t0);
          res.status(500).send('Internal Server Error');

        case 21:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 17]]);
}); // Endpoint to get access codes

app.get('/access-codes', function (req, res) {
  res.json(accessCodes);
}); // Endpoint to delete access code

app["delete"]('/delete-code/:code', function _callee2(req, res) {
  var code, codeData;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          code = req.params.code;
          codeData = accessCodes.find(function (c) {
            return c.code === code;
          });
          _context2.prev = 2;
          _context2.next = 5;
          return regeneratorRuntime.awrap(fetch("https://api.github.com/gists/".concat(codeData.gistId), {
            method: 'DELETE',
            headers: {
              'Authorization': "token ".concat(GITHUB_TOKEN),
              'Accept': 'application/vnd.github.v3+json'
            }
          }));

        case 5:
          accessCodes = accessCodes.filter(function (c) {
            return c.code !== code;
          });
          fs.writeFileSync(FILE_PATH, JSON.stringify(accessCodes));
          res.status(204).send();
          _context2.next = 14;
          break;

        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](2);
          console.error('Error:', _context2.t0);
          res.status(500).send('Internal Server Error');

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[2, 10]]);
});
app.listen(PORT, function () {
  console.log("Server running on port ".concat(PORT));
});