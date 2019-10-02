<template>
  <v-app>
    <v-layout>
      <v-flex xs12 sm6 md6>
        <v-card>
          <v-card-title primary-title>
            Login
          </v-card-title>
          <v-form v-model="valid">
            <v-container>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-text-field label="E-mail" v-model="email" :rules="emailRules" required></v-text-field>
                  <v-text-field
                    name="loginPassword"
                    label="Enter your password"
                    hint="At least 8 characters"
                    v-model="password"
                    min="8"
                    :append-icon="e1 ? 'visibility' : 'visibility_off'"
                    @click:append="e1 = !e1"
                    :type="e1 ? 'password' : 'text'"
                    counter
                  ></v-text-field>
                  <div class="text-xs-center">
                    <v-btn v-if="!userId" @click.prevent="login" color="primary">Login</v-btn>
                  </div>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
  </v-app>
</template>
<script>
export default {
  data() {
    return {
      route: "",
      e1: true,
      password: "",
      valid: true,
      name: "",
      email: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "E-mail must be valid"
      ]
    };
  },
  computed: {
    userId() {
      if (this.$store.getters.userId) {
        this.ui.snackbar = true;
        this.ui.text = "Success!";
        this.ui.colour = "success";
        this.ui.icon = "check_circle";
        this.route = "/";
      }
      this.$router.push(this.route);
      // return this.$store.getters.userId
    },
    errorMsg() {
      if (this.$store.getters.errorMsg) {
        this.ui.snackbar = true;
        this.ui.text = this.$store.getters.errorMsg;
        this.ui.colour = "error";
        this.ui.icon = "warning";
      }
      return this.$store.getters.errorMsg;
    }
  },
  methods: {
    login() {
      this.$store.dispatch("getToken", {
        email: this.email,
        password: this.password
      });
    },
    nextRoute() {
      // In future the path could passed in from which page user tried to access.
      this.$router.push(this.route);
    }
  }
};
</script>
<style scoped>
.centreImage {
  text-align: center;
  display: block;
}
h3 {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  text-align: center;
  margin-top: 20px;
}
.signUpText {
  font-size: 11px;
  text-align: center;
}
</style>
