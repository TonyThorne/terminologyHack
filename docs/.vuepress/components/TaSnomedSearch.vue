<template>
  <!-- This component is to explore the NHS Snomed browser found at https://termbrowser.nhs.uk -->
  <!-- The boilerplate code is taken from the example of autocomplete from the Vuetify site -->
  <v-app>
    <v-container>
      <v-card>
        <v-container>
          <v-row>
            <v-card-title primary-title>
              <div>
                <h4 class="headline mb-0">Simple snomed search</h4>
              </div>
              <!-- Loading component, prop is Boolean bound to loading -->
              <!-- <ta-loading :loading="loading"></ta-loading> -->
              <!-- Error dialog, prop is the error string and listens for clearData -->
              <ta-error-dialog :errorMsg="errorMsg" @clearData="clearData"></ta-error-dialog>
            </v-card-title>
          </v-row>
          <!-- <v-row> -->
                          <!-- <v-switch
                label="Full Text"
                color="primary"
                value="fullText"
              ></v-switch> -->
            <!-- <v-radio-group v-model="searchMode" row>
              <v-radio label="Patial Matching" color="primary" value="partialMatching"></v-radio>
              <v-radio label="Regular Expression" color="red" value="regex"></v-radio>
            </v-radio-group> -->
          <!-- </v-row> -->
          <v-row>
            <v-form>
              <v-container>
                <v-col cols="12">
                  <v-text-field
                    :label="searchLabel"
                    v-model="searchString"
                    type="string"
                    append-icon="search"
                    @click:append="search"
                    clearable
                    @click:clear="clearData"
                    :loading="loading"
                    @keydown.enter.prevent="search"
                    @keydown.delete="clearFilter"
                    :rules="[rules.required, rules.counter]"
                  ></v-text-field>
                </v-col>
                <v-chip-group 
                  column
                >
                  <v-chip
                    v-for="item in semTag" :key="item[0]"
                    small
                    @click="setSemanticFilter(item[0])"
                  >{{ item[0] }}: {{ item[1] }}</v-chip>
                </v-chip-group>
                <v-simple-table dense v-show="searchResultsTotal">
                <!-- <v-flex xs12 v-show="searchResultsTotal"> -->
                  <thead>
                    <tr>
                      <th class="text-left">Term</th>
                      <th class="text-left">FSN</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="item in searchResult" 
                      @click="setSelectedTerm(item.conceptId)"
                    >
                      <td>{{ item.term }}</td>
                      <td>{{ item.fsn }}</td>
                    </tr>
                  </tbody>
                <!-- </v-flex> -->
                </v-simple-table>
                <v-dialog
                  v-model="selectedTerm"
                  persistent :overlay="false"
                  max-width="500px"
                  transition="dialog-transition"
                >
                <v-card>
                  <v-card-title
                    class="headline grey lighten-2"
                    primary-title
                  >
                    Term Details
                  </v-card-title>
                  <v-card-text>
                    <ul>
                      <li>The selected term is: {{ selectedConceptId }}</li>
                      <li>Default Term: {{ conceptDetails.defaultTerm }}</li>
                    </ul>
                    
                    
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-actions>
                    <div class="flex-grow-1"></div>
                    <v-btn
                      color="primary"
                      text
                      @click="selectedTerm = false"
                    >
                      Close
                    </v-btn>
                  </v-card-actions>
                </v-card> 
                </v-dialog>
              </v-container>
            </v-form>
          </v-row>
        </v-container>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
const axios = require("axios");
import ErrorDialog from "./TaErrorDialog.vue";
import { error } from "util";

export default {
  data: () => ({
    headers: [],
    searchString: "",
    query: "",
    returnLimit: 25,
    returnedTotal: null,
    searchResult: [{"conceptId":"1234", "term":"Headache", "fsn":"foo"}],
    searchResultsTotal: null,
    selectedTerm: false,
    selectedConceptId: '',
    conceptDetails: '',
    semTag: null, //Object.entries({'procedure': 6, 'disorder': 1, 'finding': 3, 'situation': 2, 'morphologic abnormality': 2}),
    semanticFilter: null,
    searchLabel: "Snomed search",
    searchMode: "partialMatching", //partialMatching, fullText, regex
    loading: false,
    rules: {
      required: value => !!value || "Required.",
      counter: value => value.length >= 2 || "Min 2 characters"
    }
  }),
  computed: {
    errorMsg() {
      return this.$store.getters.errorMsg;
    }
  },
  methods: {
    search() {
      if (this.searchString.length <= 1) {
        console.log("Search string too short");
        return;
      }
      // if (this.searchMode === 'partialMatching') {
      //   this.query = this.searchString
      // } else if (this.searchMode === 'regex') {
      //   this.query = '^' + this.searchString
      // }
      this.loading = true;
      axios({
        method: "get",
        url:
          "https://termbrowser.nhs.uk/sct-browser-api/snomed/uk-edition/v20190601/descriptions",
        headers: {},
        params: {
          query: this.searchString,
          returnLimit: this.returnLimit,
          statusFilter: "activeOnly",
          semanticFilter: this.semanticFilter, // e.g. 'procedure' - passed from semTag
          searchMode: this.searchMode,
          normalize: true,
          lang: "english",
          skipTo: 0
        }
      })
        .then(response => {
          // Set the data element 'items' to the response data.
          this.searchResult = response.data.matches;
          // console.log("Search results", this.searchResult)
          // Dispay the total of items returned
          this.searchResultsTotal = response.data.details.total;
          // To show 'Showing x of xxx results' label, this caters for those searches less than the set limit
          if (this.searchResultsTotal < this.returnLimit) {
            this.returnedTotal = this.searchResultsTotal;
          } else {
            this.returnedTotal = this.returnLimit;
          }
          // Set the chips with semTag responses
          this.semTag = Object.entries(response.data.filters.semTag);
          // Set the search label
          this.searchLabel =
            "Showing " +
            this.returnedTotal +
            " of " +
            this.searchResultsTotal +
            " results";
          // Stop the loading
          this.loading = false;
        })
        .catch(error => {
          console.log("This is error", error)
          this.loading = false
        });
    },
    setSemanticFilter(item) {
      // console.log(item)
      // Set the filter to the value of the selected chip
      this.semanticFilter = item
      this.loading = true
      // Run search again - this time with Semantic filter set
      this.search();
    },
    getSelectedTermDetails(conceptId) {
      if (!conceptId) {
        console.log('No conceptId!')
      } else {
        this.loading = true
        axios({
          method: "get",
          url:
            "https://termbrowser.nhs.uk/sct-browser-api/snomed/uk-edition/v20190601/concepts/" + conceptId
        })
        .then(response => {
          console.log(response.data)
          this.conceptDetails = response.data
          this.loading = false
        })
        .catch(error => {
          console.log("This is error", error)
          this.loading = false
        })
      }
    },
    setSelectedTerm(conceptId) {
      // When a term is selected, set the selectedTerm to true to trigger dialog
        console.log('Selected Term:', conceptId)
        this.selectedTerm = true
        this.selectedConceptId = conceptId
        this.getSelectedTermDetails(conceptId)
    },
    clearData() {
      // console.log('clearData')
      this.searchResult = []
      this.searchString = ""
      this.searchResultsTotal = null
      this.returnedTotal = null
      this.searchLabel = "Snomed search"
      this.loading = false
      this.semanticFilter = null
      this.semTag = null
    },
    clearFilter() {
      // This is used when the user presses the delete or backspace key in search field
      // so to clear previously set filters and results
      if (this.searchString.length <= 4) {
        this.semanticFilter = null;
        this.semTag = null;
        this.searchResult = [];
        this.searchResultsTotal = null;
        this.returnedTotal = null;
        this.searchLabel = "Snomed search";
      }
    }
  },
  components: {
    "ta-error-dialog": ErrorDialog
  }
};
</script>

<style>
#app .v-application--wrap {
  min-height: 10vh;
}
tbody tr:nth-of-type(even) {
   background-color: rgba(0, 0, 0, .05);
 }
</style>
