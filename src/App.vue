<template>
  <div id="app">
    <!-- <input type="checkbox" v-model="formObj.checked" @change="resetField" />
    <InputBox v-model="formObj.dropshipperName" :disabled="formObj.checked" />
    <input type="text" v-model="formObj.dropshipperName" :disabled="!formObj.checked" />-->
    <div class="container">
      <div class="stepper"></div>
      <div class="form"></div>
    </div>
  </div>
</template>

<script>
//import InputBox from "./components/InputBox";
export default {
  name: "App",
  components: {
    //InputBox,
  },
  data: function() {
    return {
      formObj: {
        checked: true,
        dropshipperName: "",
        dropshipperNumber: ""
      }
    };
  },
  methods: {
    resetField: function() {
      this.formObj.dropshipperName = "";
      this.formObj.dropshipperNumber = "";
    }
  }
};
</script>

<style>
</style>
