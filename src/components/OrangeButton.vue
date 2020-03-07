<template>
  <button @click="$emit('next-step')">{{title}}</button>
</template>

<script>
export default {
  name: "OrangeButton",
  props: ["title"]
};
</script>

<style lang="stylus" scoped>
orange = #FF8A00;

button {
  width: 100%;
  background-color: orange;
  padding: 1.5rem 0;
  margin-top: 1rem;
  border: none;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 3px 5px 10px rgba(255, 138, 0, 0.2);
  border-radius: 2px;
  color: white;
  font-size: 1.4rem;
  cursor: pointer;
}
</style>