<template>
  <div id="wrapper">
    <main>
      <v-app>
        <v-container style="max-height: 100vh">
          <v-layout row>
            <v-flex xs4>
              <v-card>
                <v-list>
                  <v-list-tile
                    v-for="dev in devices"
                    :key="dev"
                    :class="{selected: selectedId == dev}"
                    class="list-item"
                  >
                    <v-list-tile-content>
                      <v-list-tile-title>{{dev}}</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>

                <v-btn
                  color="primary"
                  @click="() => screencap()"
                >Shot</v-btn>
              </v-card>
            </v-flex>

            <v-flex
              xs8
              justify-center
            >
              <v-card class="screencap">
                <v-layout justify-center>
                  <img
                    :src="screencapUri"
                    style="max-width: 100%;max-height: 90vh;"
                  />
                </v-layout>
              </v-card>
            </v-flex>
          </v-layout>
          <!-- <li @click="() => selectDevice(dev)">{{dev}}</li> -->
        </v-container>
      </v-app>
    </main>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'main-page',

  computed: mapState({
    devices: state => state.devices,
    selectedId: state => state.id,
    screencapUri: state => `file://${state.screencapUri}`
  }),

  methods: {
    selectDevice(id) {
      this.$store.dispatch('selectDevice', id)
    },

    screencap() {
      this.$store.dispatch('screencap')
    }
  },

  created() {
    this.$store.dispatch('updateDevices')
  }
}
</script>

<style>
.list-item {
  background: #dddddd;
  cursor: pointer;
}

.screencap {
  margin-left: 8px;
  padding: 5px;
}
</style>
