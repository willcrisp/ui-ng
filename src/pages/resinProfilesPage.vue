<template>
  <q-page padding>
    <h3>Resin Profiles</h3>
    <div class="q-pa-md">
      <q-table v-model:expanded="expanded" flat bordered title="Resins" :rows="resinProfiles" :columns="columns" row-key="name">
        <template #header="props">
          <q-tr :props="props">
            <q-th v-for="col in props.cols" :key="col.name" :props="props">
              {{ col.label }}
            </q-th>
          </q-tr>
        </template>

        <template #body="props">
          <q-tr :props="props">
            <q-td auto-width>
              <q-toggle v-model="props.expand" checked-icon="add" unchecked-icon="remove" />
            </q-td>

            <q-td v-for="col in props.cols" :key="col.name" :props="props">
              {{ col.value }}
            </q-td>
          </q-tr>
          <q-tr v-show="props.expand" :props="props">
            <q-td colspan="100%">
              <div class="text-left">This is expand slot for row above: {{ props.row.name }}.</div>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
import { ref } from "vue";
// eslint-disable-next-line no-unused-vars
import { resinProfilesStore } from "@Store/resinProfilesStore";

const columns = [
  {
    name: "Title",
    required: true,
    label: "Title",
    align: "left",
    field: (row) => row.Title,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "Depth",
    align: "center",
    label: "Layer Thickness (micron)",
    field: "Depth",
    sortable: true,
  },
  { name: "CureTime", label: "Cure Time", field: "CureTime", sortable: true },
];

export default {
  setup() {
    return {
      expanded: ref([]),
      columns,
    };
  },
  computed: {
    resinProfiles() {
      return resinProfilesStore.resinProfiles;
    },
  },
  created() {
    resinProfilesStore.fetchProfiles();
  },
};
</script>

<style scoped></style>
