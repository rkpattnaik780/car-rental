import Vue from 'vue'
import Vuetify from 'vuetify'
import { mount, createLocalVue } from '@vue/test-utils'
import CarDetails from '@/components/CarDetails'
import * as axios from 'axios'

Vue.use(Vuetify)

describe('CarDetails.vue', () => {
  it('Check if API is working', () => {
    return axios
      .get('https://api.sheety.co/311576ae-321a-43e3-9a5b-61b3ac373d85')
      .then(function (response) {
        expect(response.data.length).toBeGreaterThan(10)
      })
  })
})