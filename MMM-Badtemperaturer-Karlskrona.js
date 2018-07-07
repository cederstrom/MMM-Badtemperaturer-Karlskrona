/* global Module */

/* Magic Mirror Module: MMM-Badtemperatur-Karlskrona
 * By Andreas Cederström http://github.com/cederstrom/
 * MIT Licensed.
 */

Module.register("MMM-Badtemperaturer-Karlskrona", {
  // Default module config.
  defaults: {
    updateInterval: 600 * 1000,
    animationSpeed: 2.5 * 1000
  },

  start: function() {
    var self = this;
    self.sendSocketNotification("BADTEMPERATUR_BOUYS_UPDATE");
    timer = setInterval(function() {
      self.sendSocketNotification("BADTEMPERATUR_BOUYS_UPDATE");
    }, this.config.updateInterval);
  },

  getTemplate: function() {
    return "template.njk";
  },

  getStyles: function() {
    return ["styles.css"];
  },

  getTemplateData: function() {
    return { bouys: this.bouys };
  },

  // Override socket notification handler.
  socketNotificationReceived: function(notification, bouys) {
    if (notification === "BADTEMPERATUR_BOUYS_DATA") {
      this.bouys = bouys.sort(this._bouySort);
      this.updateDom(self.config.animationSpeed);
    }
  },

  _bouySort: function(a, b) {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  }
});
