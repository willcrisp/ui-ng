<template>
  <q-page>
    <div>
      <!-- status -->
      <h6>Status</h6>

      <div class="q-pa-md">
        <h6 class="q-pa-xs">Logs</h6>
        <q-table
          flat
          bordered
          dense
          :rows="logs"
          :columns="columns"
          row-key="name"
          :rows-per-page-options="[20]"
        >
          <template #header="props">
            <q-tr :props="props">
              <q-th
                v-for="col in props.cols"
                :key="col.name"
                :props="props"
                auto-width
              >
                {{ col.label }}
              </q-th>
            </q-tr>
          </template>

          <template #body="props">
            <q-tr :props="props">
              <q-td
                v-for="col in props.cols"
                :key="col.name"
                :props="props"
                auto-width
              >
                {{ col.value }}
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
      <!-- <p>{{ intervalStore.status }}</p>
      <h6>Log</h6>
      <p>{{ intervalStore.log }}</p>
      <h6>Slicer</h6>
      <p>{{ intervalStore.slicer }}</p>
      <h6>Stat</h6>
      <p>{{ intervalStore.stat }}</p>
      <h6>Notification</h6>
      <p>{{ intervalStore.notification }}</p>
      <h6>Z Axis Info</h6>
      <p>{{ intervalStore.zAxisInfo }}</p> -->
    </div>
  </q-page>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { intervalStore } from "@Store/intervalStore";

const columns = [
  {
    name: "level",
    label: "Level",
    align: "left",
    field: "level",
  },
  {
    name: "Time",
    label: "Time",
    field: "time",
    align: "left",
    sortOrder: "ad",
  },
  {
    name: "Layer",
    align: "left",
    label: "Layer",
    field: "Layer",
  },
  { name: "module", label: "module", field: "module", align: "left" },
  { name: "msg", label: "msg", field: "msg", align: "left" },
];

export default {
  setup() {
    return {
      columns,
      intervalStore,
    };
  },
  computed: {
    logs() {
      return intervalStore.logs;
    },
  },
};
</script>

<style scoped></style>
