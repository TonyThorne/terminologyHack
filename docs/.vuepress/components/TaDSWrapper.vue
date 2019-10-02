<template>
  <!-- Wrapper for direct services to allow multiple components to interact -->
  <!-- Assumes login and country as a minimum -->
  <!-- Login an existing component, org passed to children from here, but would at app level -->
  <v-app>
    <v-container>
      <v-flex xs12 md6>
        <ta-drop-down
          selectName="country"
          :selectItems="items[0].country"
          selectLabel="Select country"
          @change="valueSelected"
        ></ta-drop-down>
      </v-flex>
      <ta-login-user></ta-login-user>
      
    </v-container>
  </v-app>
</template>

<script>
import Login from "./TaLoginUser"
export default {
  data() {
    return {
      valueSelected: '',
      items: [
        { country: ["England", "Scotland", "Wales", "N.I."] }
      ],
    }
  },
  components: {
    'ta-login-user': Login
  }
}
</script>

<style>

</style>
