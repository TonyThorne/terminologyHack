<template>
  <v-card class="mx-auto" color="grey lighten-4" max-width="600">
    <v-card-title>
      <v-layout column align-start>
        <div class="caption grey--text text-uppercase">Body Mass Index</div>
      </v-layout>
    </v-card-title>
    <v-sheet color="transparent">
      <v-sparkline
        :smooth="16"
        :gradient="['#f72047', '#ffd200', '#1feaea']"
        :line-width="2"
        :value="values"
        :labels="labels"
        auto-draw
        stroke-linecap="round"
        show-labels:
        true
        padding="26"
      ></v-sparkline>
    </v-sheet>
    <v-spacer></v-spacer>
  </v-card>
</template>

<script>
import dateFormat from "../../utils/dateFormat";
export default {
  name: "TaChart",
  props: {
    dataToChart: { required: true, default: null, type: Object }
  },
  data: () => ({
    checking: false
  }),
  computed: {
    labels() {
      // console.log('results', this.dataToChart.results)
      // Convert dates to GB format
      // Pick out the dates from the result set
      let dates = [];
      dates = this.dataToChart.results.map(item => item.date);
      // console.log('dates', dates)
      // Convert the array of dates into short dates using the imported dateFormat helper.
      let labels = [];
      labels = dates.map(dateFormat);
      // console.log('labels', labels)
      // let labels = ['10/01/2019', '11/02/2019', '19/03/2019', '04/04/2019', '10/06/2019']
      return labels;
    },
    values() {
      // Pick out the BMI values
      let bmiValues = this.dataToChart.results.map(item => item.BMI);
      // console.log('bmiValues', bmiValues)
      // Convert the values into numbers, which component expects
      let bmiNumbers = bmiValues.map(item => parseInt(item, 10));
      // let bmiNumbers = [26,25,23,18,22]
      return bmiNumbers;
    }
  },
  methods: {}
};
</script>

<style>
</style>
