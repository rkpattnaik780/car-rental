<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm5>
        <v-card>
          <v-card-title>
            <v-layout my-2 align-center justify-center row>
              <v-flex xs12>
                <div class="headline">Book cars at touch of your palm</div>
              </v-flex>
            </v-layout>
            <v-form>
              <v-layout row wrap mx-3>
                <v-flex xs12 grow>
                  <v-layout align-center justify-center row>
                    <v-flex xs12>
                      <v-select
                        fluid
                        :items="locations"
                        v-model="selectedLocation"
                        label="Location"
                      ></v-select>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs12>
                  <v-menu
                    lazy
                    :close-on-content-click="true"
                    v-model="menu"
                    transition="scale-transition"
                    offset-y
                    full-width
                    :nudge-right="40"
                    max-width="290px"
                    min-width="290px"
                  >
                    <v-text-field
                      slot="activator"
                      label="Date"
                      v-model="date"
                      prepend-icon="event"
                      readonly
                    ></v-text-field>
                    <v-date-picker v-model="date" required no-title scrollable actions></v-date-picker>
                  </v-menu>
                </v-flex>
                <v-flex xs12 align-center justify-center>
                  <v-btn block rounded color="success" @click="submit">Submit</v-btn>
                </v-flex>
              </v-layout>
            </v-form>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'LandingPage',
  methods: {
    submit () {
      this.$router.push({
        path: 'cars',
        query: { locality: this.selectedLocation, date: this.date }
      })
      this.$router.go()
    }
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      locations: ['Koramangala', 'HSR Layout', 'Indiranagar'],
      selectedLocation: 'Koramangala',
      menu: false,
      date: new Date().toISOString().substr(0, 10)
    }
  }
}
</script>
