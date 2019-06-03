import Vue from 'vue'
import Vuetify from 'vuetify'
import { mount, createLocalVue } from '@vue/test-utils'
import LandingPage from '@/components/LandingPage'

Vue.use(Vuetify)

describe('LandingPage.vue', () => {
  const wrapper = mount(LandingPage)

  it('renders the correct markup', () => {
    expect(wrapper.html()).toContain(
      '<div class="headline">Book cars at touch of your palm</div>'
    )
  })

  it('has a button', () => {
    expect(wrapper.contains('button')).toBe(true)
  })
})