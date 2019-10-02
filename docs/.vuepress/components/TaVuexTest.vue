<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-img
          src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
          aspect-ratio="2.75"
        ></v-img>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">Example card / form</h3>
            <div> {{ errorMsg }} </div>
          </div>
        </v-card-title>
        <v-form>
          <v-container>
            <v-layout row wrap>
              <v-text-field
                label="Enter an Error Message:"
                single-line
                v-model="errMsg"
              ></v-text-field>
            </v-layout>
          </v-container>
        </v-form>
        <v-card-actions>
          <v-btn @click.prevent='setError' small color="primary" >Set Error Msg</v-btn>
          <!-- <v-btn color="orange">Explore</v-btn> -->
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  computed: {
    errorMsg () {
      return this.$store.getters.errorMsg
    }
  },
  data () {
    return {
      errMsg: ''
    }
  },
  methods: {
    setError () {
      this.$store.dispatch('setErrorMsg', this.errMsg)
    }
  }
}
</script>

<style>

</style>
