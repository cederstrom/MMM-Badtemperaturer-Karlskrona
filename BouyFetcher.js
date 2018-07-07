/* Magic Mirror
 * Node Helper: MMM-Badtemperatur-Karlskrona
 *
 * By Andreas Cederström http://github.com/cederstrom/
 * MIT Licensed.
 */

const https = require("https");
const url = "https://api.ioe.allbin.se/buoys";

class BouyFetcher {
  fetch(callback) {
    https
      .get(url, res => {
        const { statusCode } = res;
        const contentType = res.headers["content-type"];

        let error;
        if (statusCode !== 200) {
          error = new Error("Request Failed.\n" + `Status Code: ${statusCode}`);
        } else if (!/^application\/json/.test(contentType)) {
          error = new Error(
            "Invalid content-type.\n" +
              `Expected application/json but received ${contentType}`
          );
        }
        if (error) {
          console.error(error.message);
          res.resume();
          return;
        }

        res.setEncoding("utf8");
        let rawData = "";
        res.on("data", chunk => {
          rawData += chunk;
        });
        res.on("end", () => {
          try {
            const parsedData = JSON.parse(rawData);
            callback(parsedData);
          } catch (e) {
            console.error(e.message);
          }
        });
      })
      .on("error", e => {
        console.error(`Got error: ${e.message}`);
      });
  }
}

module.exports = BouyFetcher;
