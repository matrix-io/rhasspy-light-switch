// Variables
const WebSocket = require("ws");
const matrix = require("@matrix-io/matrix-lite");
const https = require("http");

const ws = new WebSocket("ws://localhost:12101/api/events/intent");
const wake = new WebSocket("ws://localhost:12101/api/events/wake");

var relay = require('./relay.js');
var everloop = require('./everloop.js');

console.log("**Started Web Socket Client**");

ws.on("open", function open() {
  console.log("\n**Connected**\n");
});

ws.on("close", function close() {
  console.log("\n**Disconnected**\n");
});

// On WakeWord
wake.on("message", function wake() {
  everloop.startWaiting();
  console.log("\n**WakeWord Detected**\n");
});

// Intents are passed through here
ws.on("message", function incoming(data) {
  everloop.stopWaiting();
  
  data = JSON.parse(data);

  console.log("**Captured New Intent**");
  console.log(data);

  // Turn the light On/Off
  if ("Light" === data.intent.name) {
    switch (data.slots.power) {
      case "on":
        relay.lightOn();
        break;
      case "off":
        relay.lightOff();
        break;
    }
  };
});
