/*
 * Copyright 2019 - 2019 Tony Thorne. All Rights Reserved.
 *
 * A simple maths calculator as a front end to the AWS Bootcamp maths API
 * Copied and pasted from the BMI Calculator
 */
<template>
  <v-app>
    <v-layout>
      <v-flex xs12 sm6 md12>
        <v-card>
          <v-card-title primary-title>
            <div>
              <h4 class="headline mb-0">Simple calculator</h4>
            </div>
            <!-- Loading component, prop is Boolean bound to loading -->
            <ta-loading :loading="loading"></ta-loading>
            <!-- Error dialog, prop is the error string and listens for clearData -->
            <ta-error-dialog :errorMsg="errorMsg" @clearData="clearData"></ta-error-dialog>
          </v-card-title>
          <v-form>
            <v-container>
              <v-layout row>
                <v-flex xs12 md2>
                  <v-text-field :label="num1Label" v-model="num1" type="number"></v-text-field>
                </v-flex>
                <v-flex xs12 md2>
                  <v-select
                    :items="items[0].operand"
                    Label="Operator"
                    v-model="operandSelected"
                  ></v-select>
                </v-flex>
                <v-flex xs12 md3>
                  <v-text-field :label="num2Label" v-model="num2" type="number"></v-text-field>
                </v-flex>
                <v-flex xs12 md3>
                <div class="results">{{ result }}</div>
                </v-flex>

              </v-layout>
            </v-container>
          </v-form>
          <v-card-actions>
            <v-btn @click.prevent="calculate" color="orange">Calculate</v-btn>
            <v-btn @click.prevent="clearData" color="orange">Clear</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script>
const axios = require('axios')
import { mapState } from "vuex";
import Loading from "./TaLoading.vue";
import ErrorDialog from "./TaErrorDialog.vue";

export default {
  name: "TaMaths",
  data() {
    return {
      dialog: true,
      num1: null,
      num1Label: "Number 1",
      num2: null,
      num2Label: "Number 2",
      items: [{ operand: ["add", "multiply", "subtract", "divide"] }],
      operandSelected: "",
      result: null,
      loading: false
    }
  },
  computed: {
    errorMsg() {
      return this.$store.getters.errorMsg;
    },
    // loading() {
    //   return this.$store.getters.loading;
    // }
  },
  methods: {
    calculate() {
      this.loading = true
      const numbers = {
        num1: Number(this.num1),
        num2: Number(this.num2)
      }
      const operand = this.operandSelected
      axios({
        method: 'post',
        url: 'https://tgg6qu3am1.execute-api.eu-west-2.amazonaws.com/DEV/maths/' + operand,
        headers: {'x-api-key': 'ayrjT96GEW45rEfTSq6S06fRhluZqtBt9raTd7Qa'},
        data: numbers
      })
        .then(response => {
          // Set the data element 'items' to the response data.
          this.result = response.data.result
          console.log(this.result)
          this.loading = false
          // Switch spinner off as data arrived
          // dispatch('setLoading', false)
          // console.log('Data returned...', data)
          // commit('setBMI', data)
        })
        .catch(error => {
          console.log('This is error', error)
          this.loading = false
          // Switch spinner off as error returned
          // dispatch('setLoading', false)
          // dispatch('setErrorMsg', error)
        })
    },
    clearData() {
      // console.log('clearData')
      this.num1 = null
      this.num2 = null
      this.result = null
    }
  },
  components: {
    "ta-loading": Loading,
    "ta-error-dialog": ErrorDialog
  }
};
</script>

<style scoped>
.results {
  color: cadetblue;
  font-weight: bold;
  font-size: 2rem;
}

h2,
h3 {
  color: rgb(97, 96, 96);
}

#app {
  background-color: white;
  max-height: 25vh;
}
</style>
