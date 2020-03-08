<template>
  <div class="textareabox">
    <textarea
      id="address"
      cols="30"
      rows="10"
      :maxlength="maxlength"
      required
      :class="{inputvalid: isValid || state, inputinvalid: (!isValid && isEntered) || boom }"
      :value="value"
      @input="reduceChar"
      @focusout="focusOut"
    ></textarea>
    <label
      for="address"
      :class="{labelfilled: isValid || state, fontvalid: isValid || state, fontinvalid: (!isValid && isEntered) || boom }"
    >Delivery address</label>
    <div class="icon" :class="{down: !isValid || boom}">
      <svg
        class="green hide"
        :class="{displayed: isValid}"
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 0 24 24"
        width="24"
      >
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
      </svg>
      <svg
        class="orange hide"
        :class="{displayed: (!isValid && isEntered) || boom}"
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 0 24 24"
        width="24"
      >
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path
          d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
        />
      </svg>
    </div>
    <p>{{remainingChar}} characters left</p>
  </div>
</template>

<script>
export default {
  name: "TextareaBox",
  data() {
    return {
      remainingChar: 120,
      isValid: false,
      isEntered: false
    };
  },
  watch: {
    reset(nVal) {
      if (nVal) this.resetField();
    }
  },
  computed: {
    filled() {
      return this.$store.state.formObj.address.value;
    },
    state() {
      return this.$store.state.formObj.address.state;
    },
    reset() {
      return this.$store.state.formObj.reset;
    },
    value() {
      return this.$store.state.formObj.address.value;
    },
    boom() {
      return this.$store.state.formObj.address.boom;
    }
  },
  props: ["maxlength"],
  methods: {
    reduceChar(e) {
      this.remainingChar = this.maxlength - e.target.value.length;
      e.target.value ? (this.isValid = true) : (this.isValid = false);
      this.$store.commit("setaddress", {
        value: e.target.value,
        state: this.isValid
      });
    },
    focusOut() {
      this.isEntered = true;
    },
    resetField() {
      this.remainingChar = 120;
      this.isValid = false;
      this.isEntered = false;
    }
  }
};
</script>

<style lang="stylus" scoped>
grey-border = #cccccc;
dark-green = #1BD97B;
orange = #FF8A00;

@font-face {
  font-family: inter-bold;
  src: url('../assets/Inter-Bold.otf');
}

.textareabox {
  position: relative;
}

textarea {
  width: 100%;
  padding: 1rem;
  padding-top: 2.5rem;
  color: black;
  font-family: inter-bold;
  font-size: 1.5rem;
  outline: none;
  border: 1px solid grey-border;
}

textarea:focus ~ label, .labelfilled {
  top: 0rem;
  font-size: 1rem;
}

label {
  position: absolute;
  top: 1rem;
  left: 0;
  padding: 1rem;
  font-size: 1.5rem;
  transition: top ease-in-out 0.1s;
}

.inputvalid {
  border-color: dark-green;
}

.fontvalid {
  color: dark-green;
}

.inputinvalid {
  border-color: orange;
}

.fontinvalid {
  color: orange;
}

.icon {
  position: absolute;
  right: 1rem;
  top: 0.5rem;
}

.green {
  fill: dark-green;
}

.orange {
  fill: orange;
}

.down {
  top: 1.5rem;
}

.hide {
  display: none;
}

.displayed {
  display: block;
}
</style>