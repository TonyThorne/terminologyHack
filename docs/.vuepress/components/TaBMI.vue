/*
 * Copyright 2019 - 2019 Tony Thorne. All Rights Reserved.
 *
 * An example Body Mass Index calculator
 */
<template>
  <v-app>
    <v-layout>
      <v-flex xs12 sm6 md12 offset-sm3>
        <v-card>
          <v-img
            src="https://livewellcolorado.org/wp-content/themes/FAS-THEME/assets/build/img/bmi_people.png"
            aspect-ratio="2.7"
            contain
          ></v-img>
          <v-card-title primary-title>
            <div>
              <h3 v-show="!bmi" class="headline mb-0">Body Mass Index</h3>
            </div>
            <!-- Loading component, prop is Boolean bound to loading -->
            <ta-loading :loading='loading'></ta-loading>
            <!-- Error dialog, prop is the error string and listens for clearData -->
            <ta-error-dialog :errorMsg="errorMsg"  @clearData="clearData"></ta-error-dialog>
            <div>
              <h2 v-show="bmi">
                Your BMI is:
                <span class="results">{{ bmi }}</span>
              </h2>
              <h3 v-show="considered">
                This is considered:
                <span class="results">{{ considered }}</span>
              </h3>
            </div>
          </v-card-title>
          <v-form>
            <v-container>
              <v-layout row>
                <v-flex xs12 md4>
                  <v-text-field 
                    :label="heightLabel" 
                    v-model="height"
                    type="number"
                  >
                  </v-text-field>
                </v-flex>
                <v-flex xs12 md4>
                  <ta-drop-down
                    selectName="height"
                    :selectItems="items[0].height"
                    selectLabel="Height units"
                    @change="valueSelected"
                  ></ta-drop-down>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12 md4>
                  <v-text-field 
                    label="Weight:"
                    v-model="weight"
                    type="number"
                  >
                  </v-text-field>
                </v-flex>
                <v-flex xs12 md4>
                  <ta-drop-down
                    selectName="weight"
                    :selectItems="items[1].weight"
                    selectLabel="Weight units"
                    @change="valueSelected"
                  ></ta-drop-down>
                </v-flex>
              </v-layout>
              <v-layout row>
                <taChart 
                  v-if="history"
                  :dataToChart="bmiHistory"
                ></taChart>
              </v-layout>
            </v-container>
          </v-form>
          <v-card-actions>
            <v-btn @click.prevent="calcBMI" color="success">Calculate</v-btn>
            <v-btn @click.prevent="clearData" color="orange">Clear</v-btn>
            <v-btn @click.prevent="historySwitch" color="orange">History</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script>
import { mapState } from "vuex"
import Loading from './TaLoading.vue'
import ErrorDialog from './TaErrorDialog.vue'

export default {
  name: 'TaBMI',
  props: {
    patientID: { type: Number, default: 1234567890 },
    patientNumber: { type: String, required: true },
    forename: { type: String, required: true },
    surname: { type: String, required: true }
  },
  data() {
    return {
      dialog: true,
      height: '',
      heightLabel: 'Height',
      weight: '',
      items: [
        { height: ["m", "cm", "feet", "inches"] },
        { weight: ["kg", "stone", "lbs"] }
      ],
      heightUnits: null,
      weightUnits: null,
      history: false,
      historyLabels: null,
      historyData: null
    };
  },
  computed: {
    errorMsg() {
      return this.$store.getters.errorMsg
    },
    loading() {
      return this.$store.getters.loading;
    },
    bmi() {
      return this.$store.getters.bmi
    },
    considered() {
      return this.$store.getters.considered
    },
    bmiHistory() {
      // console.log('This is in TaBMI computed bmiHistory', this.$store.getters.bmiHistory)
      return this.$store.getters.bmiHistory
    },
  },
  methods: {
    valueSelected(value) {
      // console.log('From TaBMI', value)
      if (value.selectedName === 'height') {
        this.heightUnits = value.value
      } else if (value.selectedName === 'weight') {
        this.weightUnits = value.value
      } else {
        console.log('valueSelected not height or weight')
      }
    },
    calcBMI() {
      const setBmiData = {
        patientID: this.patientID,
        patientNumber: this.patientNumber,
        forename: this.forename,
        surname: this.surname,
        heightUnits: this.heightUnits,
        weightUnits: this.weightUnits,
        height: this.height,
        weight: this.weight
      }
      this.$store.dispatch("calcBMI", setBmiData)
    },
    clearData() {
      // console.log('clearData')
      this.height = ""
      this.weight = ""
      // this.heightInMeters = ""
      this.weightInKg = ""
      // this.heightUnits = ""
      // this.weightUnits = ""
      this.$store.dispatch("clearErrorMsg")
      this.$store.dispatch("clearBMIState")
    },
    // 19/06/2019 - Added async so data loaded before rendering child component
    async historySwitch() {
      // console.log('PatientID is type ', typeof(this.patientID))
      console.log('About to call promise from TaBMI')
      await this.$store.dispatch("getBMIHistory", this.patientID)
      console.log('This is after the await in TaBMI')
      this.history = !this.history
    }
  },
  components: {
    'ta-loading': Loading,
    'ta-error-dialog': ErrorDialog
  }
}
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
}
#app .v-application--wrap {
  min-height: 10vh;
}
</style>
