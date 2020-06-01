// Variables
const matrix = require("@matrix-io/matrix-lite");
var methods = {};// Declaration of method controls at the end

var relayPin = 0;// The GPIO pin connected to your relay
matrix.gpio.setFunction(relayPin, "DIGITAL");
matrix.gpio.setMode(relayPin,"output");

// On & Off Methods
methods.lightOn = function() {
  matrix.gpio.setDigital(relayPin,"ON");
  console.log("\n**Light Has Been Turned On**");
};
methods.lightOff = function() {
  matrix.gpio.setDigital(relayPin,"OFF");
  console.log("\n**Light Has Been Turned Off**");
};
module.exports = methods;
// Export methods in order to make them available to other files