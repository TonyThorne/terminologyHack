<template>
  <div>
    <v-btn color="success" @click="getData" :loading="spinner">Get Data</v-btn>
    <v-btn color="warning" @click="clearData">Clear data</v-btn>
    <v-btn color="error" @click="anError">Create an error snackbar</v-btn>
    <ul id="example-list">
      <li v-for="item in items">
        {{ item.id }} - {{ item.first_name }} {{ item.last_name }} 
        <img :src="item.avatar"/>
      </li>
    </ul>
 </div>
</template>

<script>
export default {
  props: {
    items: { type: Array },
    spinner: { type: Boolean}
  },
  data () {
    return {
      alert: true,
      dialog: true
    }
  },
  computed: {
  },
  methods: {
    getData: async function () {
      console.log('Fetch data...')
      await this.$emit('getData')
    },
    clearData() {
      this.$emit('clearData')
    },
    anError() {
      this.$emit('anError', {message: "This is a pretend error!"})
    }
  }
}
</script>