<template>
<v-container fluid>
<v-container grid-list-md text-xs-center>
    <v-layout wrap align-center>
      <v-flex xs12>
        <div>
          <v-layout  align-center justify-center row>
            <v-flex xs12 sm6 md4 d-flex px-3>
            <v-select
              :items="locations"
              v-model="selectedLocation"
              @change="changeQueryParams"
              label="Location"
            ></v-select>
            </v-flex>
            <v-flex xs12 sm6 md4 d-flex px-3>
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
          <v-date-picker v-model="date" @change="changeQueryParams" no-title scrollable actions>
          </v-date-picker>
        </v-menu>
      </v-flex>
        <v-flex xs12 sm6 md4 d-flex px-3>
        <v-select
          :items="carTypes"
          label="Car type"
          v-model="selectedCarType"
          @change="getAvailableCars"
        ></v-select>
      </v-flex>
          </v-layout>
        </div>
      </v-flex>
      
      
      <v-flex >
        <v-select
          :items="fuelTypes"
          label="Fuel type"
          v-model="selectedFuelType"
          @change="getAvailableCars"
        ></v-select>
      </v-flex>
      <v-flex xs6 d-flex>
        <v-select
          :items="transmissionTypes"
          label="Transmission type"
          v-model="selectedTransmissionType"
          @change="getAvailableCars"
        ></v-select>
      <v-flex xs6 d-flex>
        <v-select
          :items="sortingOptions"
          label="Order by"
          v-model="defaultSortingOption"
          @change="sortAvailableCars"
        ></v-select>
      </v-flex>
      <v-flex xs12 sm6 md3>
          <v-text-field
            label="Search"
            v-model="searchText"
            append-icon="fa-search"
            @click:append="searchCars(searchText)"
          ></v-text-field>
        </v-flex>
      </v-flex>

    </v-layout>


</v-container>
<v-container grid-list-md text-xs-center fluid>
  <v-layout wrap class="ma-4">
        <v-flex v-for="(car,index) in filteredCars" align-center
          :key="index"
          class="py-3">
          <CarCard 
            my-2
            :photo="car.photo"
            :name="car.name"
            :price="car.price"
            :location="car.location"
            :seats="car.seats"
            :isAvailable="car.isAvailable"
            :transmission="car.transmission"
            :fuelType="car.fuel_Type"
            :carType="car.car_Type"
            />
        </v-flex>
      </v-layout>
</v-container>
</v-container>
</template>

<script>
import CarCard from './CarCard'
export default {
  name: 'CarDetails',
  data () {
    return {
      page: 1,
      cars: [],
      filteredCars: [],
      searchedCars: [],
      carTypes : ["Any","Hatchback","SUV","Sedan","Mini SUV"],
      fuelTypes : ["Any","Petrol","Diesel"],
      transmissionTypes : ["Any", "Automatic", "Manual"],
      selectedTransmissionType : "Any",
      selectedFuelType : "Any",
      selectedCarType : "Any",
      sortingOptions : ["Low to high","High to low"],
      defaultSortingOption: "Low to high",
      searchText : null,
      locations: ["Koramangala","HSR Layout","Indiranagar"],
      selectedLocation : null,
      menu : false,
      date: null
    }
  },
  mounted(){
    this.$http.get("https://api.sheety.co/311576ae-321a-43e3-9a5b-61b3ac373d85")
        .then((result) => {
            this.cars = result.data
            this.date = this.$route.query.date
            this.selectedLocation = this.$route.query.locality
            this.getAvailableCars()
        })
    
  },
  components: {
      CarCard
  },
  methods: {
      getAvailableCars(){
        console.log("get avl cars")

        this.filteredCars = this.cars.filter(x => x.location === this.selectedLocation)

        this.filteredCars.forEach(car => {
            car.isAvailable = this.checkAvailability(this.date,car.availability)
        })

        if(this.selectedCarType !== "Any"){
            this.filteredCars = this.filteredCars.filter(car => car.car_Type === this.selectedCarType)
        }
        if(this.selectedFuelType !== "Any"){
            this.filteredCars = this.filteredCars.filter(car => car.fuel_Type === this.selectedFuelType)
        }
        if(this.selectedTransmissionType !== "Any"){
            this.filteredCars = this.filteredCars.filter(car => car.transmission === this.selectedTransmissionType)
        }

        this.sortAvailableCars()
        //this.filteredCars = filteredCars.sort( (a,b) => b.isAvailable - a.isAvailable)
      },
      sortAvailableCars(filteredCars){
        if(this.defaultSortingOption === "Low to high"){
          console.log("low to high")
          this.filteredCars.sort((a,b)=>{

            if(a.isAvailable > b.isAvailable) return -1
            if(b.isAvailable > a.isAvailable) return 1
            
            if(a.price > b.price) return 1
            if(a.price < b.price) return -1

          })
        }
        if(this.defaultSortingOption === "High to low"){
          console.log("high to low")
          this.filteredCars.sort((a,b)=>{

            if(a.isAvailable > b.isAvailable) return -1
            if(b.isAvailable > a.isAvailable) return 1
            
            if(a.price > b.price) return -1
            if(a.price < b.price) return 1

          })
        }

      },
      changeQueryParams(){
        console.log("queery param changed")
        this.getAvailableCars()
        this.$router.push({ path: 'cars', query: { locality : this.selectedLocation , date : this.date} })
      },
      searchCars(text){
        console.log("called")
        console.log(text)
        this.getAvailableCars()
        if(text){
          this.filteredCars = this.filteredCars.filter(car => {
            console.log(car.name.toLowerCase().startsWith(text.toLowerCase()))
            return car.name.toLowerCase().startsWith(text.toLowerCase()) || car.car_Type.toLowerCase().startsWith(text.toLowerCase())
          })
          console.log(this.filteredCars)
        }
      },
      checkAvailability(date,avl){
          date = this.moment(date, 'YYYY-MM-DD') //this.moment(this.$route.query.date, 'YYYY-MM-DD')
          avl = avl.split(/[ ,]+/)
          let day = date.format("ddd")
          if(avl.indexOf(day) > -1){
              return true
          }
          return false
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
