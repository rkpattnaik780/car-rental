<template>
  <v-container fluid>
    <v-form>
    <v-layout column>
      <v-flex xs12>
        <div>
          <v-layout  align-center justify-center row>
            <v-flex xs12 sm6 d-flex>
            <v-select
              :items="locations"
              v-model="selectedLocation"
              label="Location"
            ></v-select>
          </v-flex>
          
          </v-layout>
        </div>
      </v-flex>
      <v-flex xs11 sm5>
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
          <v-date-picker v-model="date" required no-title scrollable actions>
          </v-date-picker>
        </v-menu>
      </v-flex>
      <v-btn color="success"  @click="submit">Submit</v-btn>
    </v-layout>
    </v-form>
  </v-container>
</template>

<script>
export default {
  name: 'HelloWorld',
  methods:{
    submit(){
      console.log(this.selectedLocation)
      console.log(this.date)
      this.$router.push({ path: 'cars', query: { locality : this.selectedLocation , date : this.date} })
      this.$router.go()
    }
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      locations: ["Koramangala","HSR Layout","Indiranagar"],
      selectedLocation : "Koramangala",
      menu : false,
      date: new Date().toISOString().substr(0, 10)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
