<template>
  <input type="text" :value="value" @input="$emit('value')" :disabled="!disabled" />
</template>

<script>
export default {
  name: "InputBox",
  props: ["value", "disabled"]
};
</script>

<style>
</style>