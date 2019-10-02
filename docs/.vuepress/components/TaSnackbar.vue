<template>
    <v-snackbar
    :value="errorExist"
    :color="color"
    :multi-line="mode === 'multi-line'"
    :timeout="timeout"
    :vertical="mode === 'vertical'"
  >
    {{ errorText.message }}
    <v-btn
      dark
      flat
      @click="clearErrors"
    >
      Close
    </v-btn>
  </v-snackbar>
</template>

<script>
export default {
  props: {
    errorExist: { type: Boolean }, 
    errorText: { default: 'none'}
  },
  data () {
    return {
      color: '',
      mode: '',
      timeout: 6000,
      text: this.errorText
    }
  },
  methods: {
    clearErrors() {
      this.$emit('clearErrors')
    }
  }
}
</script>

<style>

</style>
