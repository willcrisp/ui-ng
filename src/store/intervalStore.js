import { reactive } from "vue";
import axios from "../plugins/axios.js";

export const intervalStore = reactive({
  status: {},
  stat: {},
  notification: {},
  slicer: {},
  logs: [],
  zAxisInfo: {},
  resinProfiles: {},
  machine: {},

  fetchDataOnInterval() {
    setInterval(() => {
      Promise.all([
        axios.get("/status"),
        axios.get("/log"),
        axios.get("/stat"),
        axios.get("/notification"),
        axios.get("/slicer"),
        axios.get("/z-axis/info"),
        axios.get("/json/db/profiles.json"),
        axios.get("/json/db/machine.json"),
      ])
        .then((responses) => {
          this.status = responses[0].data;
          this.logs = this.convertLogToJson(responses[1].data);
          this.stat = responses[2].data;
          this.notification = responses[3].data;
          this.slicer = responses[4].data;
          this.zAxisInfo = responses[5].data;
          this.resinProfiles = responses[6].data;
          this.machine = responses[7].data;
        })
        .catch((error) => {
          // Handle error
          console.error(error);
        });
    }, 2500);
  },
  convertLogToJson(logs) {
    return logs.split("\n").map((entry) => {
      const jsonStartIdx = entry.indexOf("{");
      const time = entry.substring(0, jsonStartIdx);
      const logObject = { time: time };
      try {
        const json = entry.substring(jsonStartIdx);
        const jsonData = JSON.parse(json);

        Object.assign(logObject, jsonData);
      } catch (error) {
        console.error(`Error parsing JSON for entry: ${entry}`);
      }
      return logObject;
    });
  },
});
