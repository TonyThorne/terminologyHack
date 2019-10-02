<template>
  <v-select
    v-model="selected"
    :items="selectItems"
    :label="selectLabel"
    @change="selectedValue"
  ></v-select>
</template>

<script>

export default {
  props: {
    selectName: {required: true, type: String},  // Name of the select box to emit back out with value
    selectItems: {required: true, type: Array},
    selectLabel: {type: String, default: 'Select Label'}
  },
  data () {
    return {
      selected: '',
    }
  },
  methods: {
    selectedValue(value) {
      const selectedName = this.selectName
      this.$emit('change', {selectedName, value})
    }
  }
}
</script>

<style>

</style>