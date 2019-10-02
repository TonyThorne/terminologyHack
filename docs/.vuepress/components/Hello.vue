<template>
  <v-app>
    <v-container> 
      <div calss='testing'>
        <h1>Hello from {{ name }}!</h1>
        <ul>
          <li v-for='item in names'>
            {{ item.fn }} {{ item.sn }}
          </li>
        </ul>
        <p>This is props {{ first }} {{ second }}</p>
        <v-btn color="success">Success</v-btn>
      </div>
      <ta-drop-down
        selectName="height"
        :selectItems="items[0].height" 
        selectLabel="Height units"
        @change="valueSelected"
      >
      </ta-drop-down>
      <ta-drop-down
        selectName="weight"
        :selectItems="items[1].weight"
        selectLabel="Weight units"
        @change="valueSelected"
      >
      </ta-drop-down>
    </v-container>
  </v-app>
</template>

<script>
import DropDown from './TaDropDown.vue';
import { relative } from 'path';
import { log } from 'util';
export default {
  name: 'Hello',
  methods: {
    valueSelected(value) {
      console.log('From Hello', value)
      if (value.selectedName === 'height') {
        this.heightUnits = value.value
      } else if (value.selectedName === 'weight') {
        this.weightUnits = value.value
      } else {
        console.log('valueSelected not height or weight')
      }
    }
  },
  data () {
    return {
      name: 'The Beatles',
      names: [
        {fn: 'John', sn: 'Lennon'},
        {fn: 'Paul', sn: 'McCartney'},
        {fn: 'Ringo', sn: 'Starr'},
        {fn: 'George', sn: 'Harrison'}
      ],
      items: [{height: ['m', 'cm', 'feet', 'inches']}, {weight: ['kg', 'stone', 'lbs']}],
      heightUnits: '',
      weightUnits: '',
      weight: '166',  // should this be a number
      height: '6.1'
    }
  },
  props: ['first', 'second'],
  computed: {
    // Move to a filter
    kg () {
      if (this.weightUnits ===  'stone') {
        return (this.weight * 6.35).toFixed(2)
      } else if (this.weightUnits ===  'lbs') {
        return (this.weight / 2.205).toFixed(2)
      } else if (this.weightUnits === 'kg') {
        return this.weight
      } else {
        console.log('kg not worling, weight units are', weightUnits)
      }
    },
    // Move to a filter
    meters () {
      if (this.heightUnits === 'cm') {
        return (this.height / 100).toFixed(2)
      } else if (this.heightUnits === 'feet') {
        return (this.height / 3.281).toFixed(2)
      } else if (this.heightUnits === 'inches') {
        return (this.height / 39.37).toFixed(2)
      } else if (this.heightUnits === 'm') {
        return this.height
      } else {
        console.log('meters not working, height units are', heightUnits);
      }
    }
  },
  components: {
    'ta-drop-down': DropDown
  }
}
</script>

<style>
#app .v-application--wrap {
  min-height: 10vh;
}
</style>
