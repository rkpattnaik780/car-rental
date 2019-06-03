<template>
   <v-card min-width="275px" max-width="550px" hover :dark="isSelected">
       <v-layout row wrap>
        <v-flex>
        <v-img
          class="red--text"
          :src="photo"
          width="270px"
          height="162px"
        >
        <v-container fluid v-if="!isAvailable">
            <v-layout>
              <v-flex xs12 align-start flexbox>
                <span class="headline">Not Available</span>
              </v-flex>
            </v-layout>
          </v-container>
          </v-img>
          </v-flex>
          <v-flex>
          <v-card-text class="text-xs-left">
            <div style="width:200px;">
              <h3>{{ name }}</h3>
              <div><i class="fas fa-fw fa-dollar-sign ma-1"></i>{{ price }}</div>
              <div><i class="fas fa-fw fa-car ma-1"></i>{{ carType }}</div>
              <div><i class="fas fa-fw fa-gas-pump ma-1"></i>{{ fuelType }}</div>
              <div><i class="fas fa-fw fa-wrench ma-1"></i>{{ transmission }}</div>
              <div><i class="fas fa-fw fa-map-marker-alt ma-1"></i>{{ location }}</div>
              <div><i class="fas fa-fw fa-users ma-1"></i>{{ seats }}</div>
            </div>
          </v-card-text>
          </v-flex>
       </v-layout>
       <v-layout xs12 px-2>
           <v-btn block color="success" :disabled="!isAvailable" align-center @click="select">SELECT</v-btn>
       </v-layout>
        </v-card> 
</template>

<script>
export default {
  name: 'CarCard',
  data () {
    return {
      isSelected : false
    }
  },
  methods: {
    select(){
      this.isSelected = !this.isSelected
      console.log("select triggered")
    }
  },
  props: {
    photo: String,
    price: Number,
    name: String,
    location: String,
    seats: Number,
    isAvailable: Boolean,
    fuelType : String,
    transmission: String,
    carType: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>