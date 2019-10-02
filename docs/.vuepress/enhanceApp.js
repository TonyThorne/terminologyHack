import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import axios from 'axios'
import Vuex from 'vuex'
import store from '../store/index'

export default ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData // site metadata
}) => {
    Vue.use(Vuetify),
    options.vuetify = new Vuetify({})
    Vue.use(axios),
    Vue.use(Vuex),
    Vue.mixin({store: store})
}