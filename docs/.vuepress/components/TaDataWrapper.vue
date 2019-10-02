<template>
  <v-app light>
    <!-- : short for v-bind - so in this case 'get the items from the data and'
    pass down to the child as props -->
    <!-- @ is short for v-on (which is an event listener) -->
    <!-- In this case we are listening for getData to be emitted from the child
    which then runs the getData mothod in this component -->
    <v-container> 
      <ta-example-child 
        :items="items"
        :spinner="spinner"
        @getData="getData"
        @clearData="clearData"
        @anError="anError">
      </ta-example-child>
      <ta-snackbar 
        :errorExist="errorsExist"
        :errorText="errors[0]"
        @clearErrors="clearErrors">
      </ta-snackbar>
      <ta-error-dialog :errorMsg="errors[0]"  @clearData="clearData"></ta-error-dialog>
    </v-container>
  </v-app>
</template>

<script>
import Child from './TaExampleChild.vue'
import Snackbar from './TaSnackbar.vue'

const axios = require('axios')

export default {
  data () {
    return {
      // Example array of items
      items: [{"id":1, "first_name": "John"}, {"id":2, "first_name": "Paul"}],
      // Spinner is for the child component to indicate something is happening
      spinner: false,
      // An Array of errors for holding errors
      errors: [],
      // Explicit Boolean whether Errors exist.
      errorsExist: false
    }
  },
  methods: {
    /**
     * Get a simple list of items from a remote source.
     * @return {Array} Array of objects or Array of errors.
     * 
     */
    getData() {
      this.spinner = true
      // Clear any previous error conditions 
      this.errorsExist = false
      this.errors = []
      // Call to AWS service 'first-api' on Amazon API Gateway
      // axios.get('https://07ppzt8q25.execute-api.eu-west-2.amazonaws.com/dev/fetch-data')
      axios({
        method: 'get',
        url: 'https://07ppzt8q25.execute-api.eu-west-2.amazonaws.com/dev/fetch-data'
      })
      // axios.get('https://reqres.in/api/users')
      .then(response => {
        // Set the data element 'items' to the response data.
        this.items = response.data.data
        // Swtich spinner off as data arrived
        this.spinner = false
        console.log('Data returned...')
      })
      .catch(error => {
        console.log('This is error', error);
        // Swtich spinner off as error returned
        this.spinner = false
        // Set errors on
        this.errorsExist = true
        // Push the error to the array
        this.errors.push(error)
      })
    },
    clearData() {
      console.log('Clear data')
      this.items = []
      this.errors = []
      this.errorsExist = false
    },
    anError(value) {
      this.errorsExist = true
      console.log('This is anError(value)', value)
      this.errors.push(value)
    },
    clearErrors() {
      console.log('Clear errors')
      this.errors = []
      this.errorsExist = false
    }
  },
  components: {
    'ta-example-child': Child,
    'ta-snackbar': Snackbar
  }
}
</script>

<style>
#app .v-application--wrap {
  min-height: 10vh;
}
</style>
