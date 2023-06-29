<template>
  <q-page padding>
    <h3>Settings</h3>

    <div class="flex flex-center column">
      <div class="text-h6 q-pb-md">Z axis Controls example</div>

      <q-card class="controls-card">
        <q-card-section>
          <div class="row justify-around items-center">
            <div class="col-2 justify-between">
              <div><q-badge color="orange" text-color="black" :label="'Plate Height: ' + parseFloat(position).toFixed(1)" /></div>
              <div><q-badge color="orange" text-color="black" :label="'Park Height: ' + parkHeight" /></div>
            </div>
            <div class="col-2">
              <q-slider v-model="position" :min="0" :max="100" color="info" disable vertical reverse />
              <q-slider v-model="target" :min="0" :max="100" color="primary" vertical reverse :label="false" />
            </div>
            <div class="col-2">
              <q-btn-group outline unelevated square flat style="flex-direction: column" class="q-py-md">
                <q-btn push color="grey-14" class="axis-button q-mb-md" icon="expand_less" @click="setTarget(target + distanceSetting)" />
                <q-btn push :color="distanceSetting === 0.1 ? 'primary' : 'grey-14'" class="axis-button" label="0.1 mm" @click="setActive(0.1)" />
                <q-btn push :color="distanceSetting === 1 ? 'primary' : 'grey-14'" class="axis-button q-my-xs" label="1 mm" @click="setActive(1)" />
                <q-btn push :color="distanceSetting === 10 ? 'primary' : 'grey-14'" class="axis-button" label="10 mm" @click="setActive(10)" />
                <q-btn push color="grey-14" class="axis-button q-mt-md" icon="expand_more" @click="setTarget(target - distanceSetting)" />
              </q-btn-group>
            </div>
            <div class="col-4 justify-between">
              <div><q-btn push outline class="control-button q-mt-sm full-width" label="TOP" size="16px" @click="setTarget(100)" /></div>
              <div>
                <q-btn push outline class="control-button q-mt-sm full-width" label="PARK" size="16px" @click="setTarget(parkHeight)">
                  <q-badge color="primary" floating @click.stop="prompt = true">
                    <q-icon name="settings" color="white" />
                  </q-badge>
                </q-btn>
              </div>
              <div><q-btn push outline class="control-button q-mt-sm full-width" label="BOTTOM" size="16px" @click="setTarget(0)" /></div>
              <div><q-btn push color="negative" outline class="control-button q-mt-lg full-width" label="STOP" size="16px" /></div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
  <q-dialog v-model="prompt" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Set Park Height (mm)</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input v-model="parkHeight" dense autofocus @keyup.enter="prompt = false" />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn v-close-popup flat label="Cancel" />
        <q-btn v-close-popup flat label="Set" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    return {
      position: ref(50),
      target: ref(50),
      prompt: ref(false),
      parkHeight: ref(50),
      distanceSetting: ref(1),
      setActive(distance) {
        this.distanceSetting = distance;
      },
      setPosition(position) {
        this.position = position;
      },
      setTarget(target) {
        this.target = Math.min(Math.max(target, 0), 100);
      },
      async moveToPosition() {
        while (true) {
          const distance = Math.abs(this.position - this.target);

          if (distance > 3) {
            if (this.position > this.target) this.position -= 2;
            else this.position += 2;
          } else {
            if (Math.abs(this.position - this.target) < 0.2) this.position = this.target;
            if (this.position > this.target) this.position -= 0.1;
            else if (this.position < this.target) this.position += 0.1;
          }

          await new Promise((resolve) => setTimeout(resolve, 100));
        }
      },
    };
  },
  mounted() {
    this.moveToPosition();
  },
};
</script>
<style lang="sass" scoped>
.controls-card
  width: 100%
  max-width: 600px
  min-width: 300px
.axis-button
  border-bottom: none !important
  padding-bottom: 5px

.control-button
  border-radius: 40px !important
  border-left: 0px !important
</style>
