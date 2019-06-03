import Vue from 'vue'
import Vuetify from 'vuetify'
import { mount, createLocalVue } from '@vue/test-utils'
import CarCard from '@/components/CarCard'

Vue.use(Vuetify)

describe('CarCard.vue', () => {
  const wrapper = mount(CarCard)

  it('Renders vuetify card', () => {
    expect(wrapper.find('div.v-card').exists()).toBe(true)
  })

  it('Renders select button', () => {
    const button = wrapper.find('button')
    expect(button.html()).toMatch('SELECT')
  })

  it('Uses six icons', () => {
    expect(wrapper.findAll('i').length).toBe(6)
  })
})
