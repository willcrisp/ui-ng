<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-secondary text-primary">
      <q-toolbar>
        <!-- TODO: Put a nice athena or nanoDLP logo here, click takes the use to webpage -->
        <!-- <q-btn/> -->
        <q-toolbar-title> Athena Desktop </q-toolbar-title>
        <q-tabs>
          <q-route-tab icon="sync_alt" to="/status" label="Status" exact />
          <q-route-tab icon="opacity" to="/resinProfiles" label="Resin Profiles" exact />
          <q-route-tab icon="3d_rotation" to="/prints" label="Prints" exact />
          <q-route-tab icon="view_in_ar" to="/slicer" label="Slicer" exact />
          <q-route-tab icon="auto_graph" to="/analytics" label="Analytics" exact />
          <q-route-tab icon="build" to="/settings" label="Settings" exact />
        </q-tabs>
        <q-space />
        <q-btn :icon="$q.dark.isActive ? 'light_mode' : 'dark_mode'" flat @click="$q.dark.toggle" />
        <q-toggle v-model="expertMode" label="Expert Mode" color="pink" class="q-pr-md" />

        <div>v{{ version }}</div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import { intervalStore } from "./store/intervalStore";
import { useQuasar } from "quasar";

export default {
  name: "LayoutDefault",

  components: {},
  setup() {
    const $q = useQuasar();
    $q.dark.set(true);
    return {
      version: require("../package.json").version,
      expertMode: ref(false),
    };
  },
  mounted() {
    intervalStore.fetchDataOnInterval();
  },
};
</script>

<style></style>
