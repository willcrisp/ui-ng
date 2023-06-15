import { reactive } from "vue";
import axios from "../plugins/axios.js";

export const resinProfilesStore = reactive({
  resinProfiles: [],
  async fetchProfiles() {
    this.resinProfiles = (await axios.get("/json/db/profiles.json")).data;
  },
});
