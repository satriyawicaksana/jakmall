<template>
  <div id="app">
    <!-- <input type="checkbox" v-model="formObj.checked" @change="resetField" />
    <InputBox v-model="formObj.dropshipperName" :disabled="formObj.checked" />
    <input type="text" v-model="formObj.dropshipperName" :disabled="!formObj.checked" />-->
    <div class="container">
      <div class="stepper">
        <NavigationItem
          :id="navigationStatus[0].id+1"
          :title="navigationStatus[0].title"
          :active="navigationStatus[0].status"
        />
        <div class="arrow"></div>
        <NavigationItem
          :id="navigationStatus[1].id+1"
          :title="navigationStatus[1].title"
          :active="navigationStatus[1].status"
        />
        <div class="arrow"></div>
        <NavigationItem
          :id="navigationStatus[2].id+1"
          :title="navigationStatus[2].title"
          :active="navigationStatus[2].status"
        />
      </div>
      <div class="form"></div>
    </div>
  </div>
</template>

<script>
//import InputBox from "./components/InputBox";
import NavigationItem from "./components/NavigationItem";
export default {
  name: "App",
  components: {
    //InputBox,
    NavigationItem
  },
  data: function() {
    return {
      activeStep: 0,
      navigationStatus: [
        { id: 0, title: "Delivery", status: true },
        { id: 1, title: "Payment", status: false },
        { id: 2, title: "Finish", status: false }
      ],
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

<style lang="stylus">
orange = #FF8A00;
orange-stepper = #FFE4B8;
ivory = #FFF9E4;
dark-green = #1BD97B;
light-green = #E8FBF1;
grey-accent = #eeeeee;
grey-border = #cccccc;
black = #000;

@font-face {
  font-family: inter-medium;
  src: url('./assets/Inter-Medium.otf');
}

flexbox(dir = row, jus = center, ali = center) {
  display: flex;
  flex-direction: dir;
  justify-content: jus;
  align-items: ali;
}

*, *:before, *:after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-family: inter-medium;
  font-size: 62.5%;
}

#app {
  width: 100%;
  min-height: 100vh;
  background-color: ivory;
  flexbox();
}

.container {
  width: 90%;
  height: 90%;
  background-color: white;
  margin: 5% 0 5% 0;
}

.stepper {
  flexbox(row, space-around, center);
  width: 45%;
  height: 50px;
  background-color: ivory;
  border-radius: 25px;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
}

@media (max-width: 1200px) {
  .stepper {
    width: 70%;
  }
}

@media (max-width: 600px) {
  .stepper {
    position: fixed;
    width: 50px;
    height: 40%;
    flex-direction: column;
    left: 0;
    top: 50%;
    transform: translate(0, -50%);
  }
}

.arrow {
  width: 8px;
  height: 8px;
  border: 2px solid orange;
  border-top: none;
  border-left: none;
  transform: rotate(-45deg);
}

@media (max-width: 600px) {
  .arrow {
    transform: rotate(45deg);
  }
}

.form {
}

@media (max-width: 600px) {
  .form {
    padding: 1rem;
    padding-left: 5rem;
  }
}
</style>
