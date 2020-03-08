<template>
  <div
    class="inputbox"
    :class="{inputvalid: isValid, 
      inputinvalid: (!isValid && (isFilled || isEntered)) || boom }"
  >
    <input
      :id="id"
      :type="type"
      :value="value"
      @input="checkValidation"
      @focusout="onFocusOut"
      :disabled="disabled && dropshipperField"
      :class="{inputfilled: isFilled && (!disabled || !dropshipperField)}"
    />
    <label :for="id" :class="{labelfilled: isFilled && (!disabled || !dropshipperField) }">{{title}}</label>
    <div class="icon">
      <svg
        class="green hide"
        :class="{displayed: isValid && isFilled}"
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
        :class="{displayed: (!isValid && (isFilled || isEntered)) || boom}"
        @click="resetField"
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
  </div>
</template>

<script>
export default {
  name: "InputBox",
  props: ["id", "title", "type", "pattern", "dropshipperField"],
  created() {
    window.addEventListener("unload", this.checkValidation());
  },
  data() {
    return {
      isValid: false,
      isFilled: false,
      isEntered: false
    };
  },
  watch: {
    reset(nVal) {
      if (nVal) this.resetField();
    },
    state(nVal) {
      if (nVal) this.isValid;
    }
  },
  computed: {
    state() {
      if (this.id == "email") {
        return this.$store.state.formObj.email.state;
      } else if (this.id == "number") {
        return this.$store.state.formObj.number.state;
      } else if (this.id == "dropshipperName") {
        return this.$store.state.formObj.dropshipperName.state;
      } else {
        return this.$store.state.formObj.dropshipperNumber.state;
      }
    },
    reset() {
      return this.$store.state.formObj.reset;
    },
    value() {
      if (this.id == "email") {
        return this.$store.state.formObj.email.value;
      } else if (this.id == "number") {
        return this.$store.state.formObj.number.value;
      } else if (this.id == "dropshipperName") {
        return this.$store.state.formObj.dropshipperName.value;
      } else {
        return this.$store.state.formObj.dropshipperNumber.value;
      }
    },
    boom() {
      if (this.id == "email") {
        return this.$store.state.formObj.email.boom;
      } else if (this.id == "number") {
        return this.$store.state.formObj.number.boom;
      } else if (this.id == "dropshipperName") {
        return this.$store.state.formObj.dropshipperName.boom;
      } else {
        return this.$store.state.formObj.dropshipperNumber.boom;
      }
    },
    disabled() {
      if (!this.$store.state.formObj.checked && this.dropshipperField) {
        this.resetField();
      }
      return !this.$store.state.formObj.checked;
    }
  },
  methods: {
    onFocusOut() {
      this.isEntered = true;
    },
    checkValidation(e) {
      e.target.value.length ? (this.isFilled = true) : (this.isFilled = false);
      this.pattern.test(e.target.value)
        ? (this.isValid = true)
        : (this.isValid = false);
      this.$store.commit(`set${this.id}`, {
        value: e.target.value,
        state: this.isValid
      });
    },
    resetField() {
      this.isValid = false;
      this.isFilled = false;
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

.inputbox {
  position: relative;
  height: 6rem;
  border: 1px solid grey-border;
  margin: 1rem 0;
}

input {
  height: calc(6rem - 2px);
  border: none;
  background-color: transparent;
  outline: none;
  color: black;
  font-family: inter-bold;
}

label, input {
  width: 100%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  padding: 1rem;
  font-size: 1.5rem;
  transition: transform ease-in-out 0.1s;
}

input:disabled {
  background-color: #eee;
}

.inputfilled, input:focus {
  transform: translateY(-40%);
}

.labelfilled, input:focus ~ label {
  transform: translateY(-100%);
  font-size: 1rem;
}

.inputvalid {
  border-color: dark-green;
  color: dark-green;
}

.inputinvalid {
  border-color: orange;
  color: orange;
}

.icon {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
}

.green {
  fill: dark-green;
}

.orange {
  fill: orange;
}

.hide {
  display: none;
}

.displayed {
  display: inline;
}
</style>