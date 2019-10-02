<template>
  <v-dialog :value="errorMsg" persistent max-width="290">
    <v-card>
      <v-card-title class="headline">Oops!</v-card-title>
      <v-card-text>Error message: {{ errorMsg }}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" flat @click="clearData">OK</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    errorMsg: { required: true }
  },
  methods: {
    clearData() {
      this.$store.dispatch("clearErrorMsg")
    }
  }
}
</script>

<style>

</style>

