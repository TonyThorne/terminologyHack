<template>
  <v-app id="ThorneApps">
    <v-system-bar app color="primary">
      <v-icon color="white">mdi-account</v-icon>
      <span class="white--text text--lighten-1">Dr Duncan Thorne</span>
      <div class="flex-grow-1"></div>
        <span class="white--text text--lighten-1">Thorne</span>
        <span class="grey--text text--lighten-1">APPS</span>
    </v-system-bar>
    <v-app-bar dense collapse-on-scroll>
      <v-toolbar-title class="headline ">
        NHS Terminology Hack
      </v-toolbar-title>
      <!-- <v-spacer></v-spacer>
      <v-btn
        value="about" 
        to="/about">
        <span>About</span>
      </v-btn> -->
    </v-app-bar>

    <v-content>
      <v-container fluid>
        <SnomedSearch/>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import SnomedSearch from "../../docs/.vuepress/components/TaSnomedSearch";

export default {
  name: 'App',
  components: {
    SnomedSearch
  },
  data: () => ({
    //
  }),
};
</script>
