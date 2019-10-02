<template>
  <v-app>
    <v-container>
      <!-- The following items should be past in as props -->
      <v-form>
        <v-container>
          <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
          <v-text-field
            v-model="password"
            :append-icon="show1 ? 'visibility' : 'visibility_off'"
            :rules="[passwordRules.required, passwordRules.min]"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="Password"
            hint="At least 8 characters"
            counter
            @click:append="show1 = !show1"
          ></v-text-field>
          <v-text-field
            name="search"
            label="Surname"
            id="search"
            v-model="search"
          ></v-text-field>
        </v-container>
      </v-form>
      <v-btn @click="serachPatients" color="success">Search</v-btn>
      <v-layout row wrap>
        <ta-loading :loading="loading"></ta-loading>
        <!-- Error dialog, prop is the error string and listens for clearData -->
        <!-- <ta-error-dialog :errorMsg="errorMsg"></ta-error-dialog> -->
        <v-flex xs12 sm6 md4 lg3 v-for="patient in serachPatientsResults" :key="patient.nhsNumber">
          <v-card class="ma-2">
            <v-layout row wrap>
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
                    <span class="caption grey--text small hidden-sm-and-down">Born</span>
                    {{ patient.dob }} ({{ patient.age }})
                  </div>
                </v-flex>
                <v-flex xs12>
                  <div class="small">
                    <span class="caption grey--text">Gender</span>
                    {{ patient.sex }}
                  </div>
                </v-flex>
                <v-flex xs12>
                  <div class="small">
                    <span class="caption grey--text">Number</span>
                    {{ patient.nhsNumber }}
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
      email: "bash@test2.com",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ],
      password: "",
      passwordRules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 8 || "Min 8 characters",
        emailMatch: () => "The email and password you entered don't match"
      },
      show1: false,
      search: ''
    };
  },
  computed: {
    errorMsg() {
      return this.$store.getters.errorMsg;
    },
    loading() {
      return this.$store.getters.loading;
    },
    serachPatientsResults() {
      return this.$store.getters.patientSelectList;
    }
  },
  // This should be removed once tested and replaced with props
  methods: {
    serachPatients() {
      const query = {
        username: this.email,
        password: this.password,
        roleId: "269",
        query: this.search
      };
      this.$store.dispatch("searchPatients", query);
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
