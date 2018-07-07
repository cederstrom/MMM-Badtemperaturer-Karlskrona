/* Magic Mirror
 * Node Helper: MMM-Badtemperatur-Karlskrona
 *
 * By Andreas Cederström http://github.com/cederstrom/
 * MIT Licensed.
 */

const BouyFetcher = require("./BouyFetcher");

module.exports = NodeHelper.create({
  // Override start method.
  start: function() {
    console.info("Starting node helper for: " + this.name);
  },

  socketNotificationReceived: function(notification) {
    if (notification === "BADTEMPERATUR_BOUYS_UPDATE") {
      new BouyFetcher().fetch(this.dataLoaded.bind(this));
    }
  },

  dataLoaded: function(data) {
    this.sendSocketNotification("BADTEMPERATUR_BOUYS_DATA", data);
  }
});
