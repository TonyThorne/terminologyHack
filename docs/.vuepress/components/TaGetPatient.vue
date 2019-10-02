<template>
  <v-app>
    <v-container>
      <v-layout row>
        <v-flex xs12 sm6 md4>
          <v-text-field
            name="patientId"
            label="Unique Vision Patient ID"
            id="patientId"
            v-model="patientID"
            placeholder="1"
            v-on:keydown.enter.prevent="getPatient"
            rounded
          ></v-text-field>
          <v-btn @click="getPatient" color="success">Get Patient</v-btn>
        </v-flex>
      </v-layout>

      <!-- <v-btn @click="getToken" color="success">Get Token</v-btn> -->
      <v-layout row wrap>
        <ta-loading :loading="loading"></ta-loading>
        <!-- Error dialog, prop is the error string and listens for clearData -->
        <ta-error-dialog :errorMsg="errorMsg"></ta-error-dialog>
        <v-flex xs12>
          <v-card class="ma-2">
            <v-layout column="2">
              <v-card-text>
                <v-flex xs10>
                  <div>
                    <span class="bold">{{ patient.surname }},</span>
                    {{ patient.forename }}
                    <span
                      class="small"
                    >({{ patient.title }})</span>
                  </div>
                </v-flex>
                <v-flex xs12>
                  <div class="small">
                    <span class="caption grey--text small">Born:</span>
                    {{ patient.dob }}
                    ({{ patient.age }})
                    
                    <span class="caption grey--text">Gender:</span>
                    {{ patient.sex }}
                  </div>
                </v-flex>
                <v-flex xs12>
                  <div class="small">
                    <span class="caption grey--text">Gender:</span>
                    {{ patient.sex }}
                  </div>
                </v-flex>
                <v-flex xs12>
                  <div class="small">
                    <span class="caption grey--text">Number:</span>
                    {{ patient.nhsNumber }}
                  </div>
                </v-flex>
                <v-flex xs12>
                  <div class="small">
                    <span class="caption grey--text">Registered GP:</span>
                    {{ patient.registeredGP }}
                  </div> 
                </v-flex>
                <v-flex xs12>
                  <div class="small">
                    <span class="caption grey--text">Usual GP:</span>
                    {{ patient.usualGP }}
                  </div>
                </v-flex>
                <v-flex xs12>
                  <div class="small">
                    <span class="caption grey--text">Registration Status:</span>
                    {{ patient.registrationStatus }}
                  </div>
                </v-flex>
                <v-flex xs12>
                  <div class="small">
                    <span class="caption grey--text">Registered Organisation:</span>
                    {{ patient.registeredOrg }}
                  </div>
                </v-flex>
              </v-card-text>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
export default {
  props: {
    // labels: {type: Array},
    // items: {type: Array}
  },
  data() {
    return {
      labels: [],
      patientID: ""
    };
  },
  computed: {
    errorMsg() {
      return this.$store.getters.errorMsg;
    },
    loading() {
      return this.$store.getters.loading;
    },
    patient() {
      return this.$store.getters.patientSelected;
    }
  },
  // This should be removed once tested and replaced with props
  methods: {
    getToken() {
      this.$store.dispatch("getToken");
    },
    getPatient() {
      this.$store.dispatch("getPatient", this.patientID);
    }
  }
};
</script>

<style>
span.bold {
  font-weight: bold;
}
span.small {
  font-size: 10px;
  color: gray;
}
div.small {
  font-size: 12px;
}
#app {
  background-color: white;
}
#app .v-application--wrap {
  min-height: 10vh;
}
</style>
