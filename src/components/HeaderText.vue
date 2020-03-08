<template>
  <h2>{{title}}</h2>
</template>

<script>
export default {
  name: "HeaderText",
  props: ["title"]
};
</script>

<style lang="stylus" scoped>
orange = #FF8A00;
grey-accent = #eeeeee;

@font-face {
  font-family: inter-bold;
  src: url('../assets/Inter-Bold.otf');
}

h2 {
  color: orange;
  font-size: 3.5rem;
  font-family: inter-bold;
  position: relative;
  left: 0.5rem;
  z-index: 2;
}

h2:before {
  content: '';
  width: 290px;
  height: 10px;
  position: absolute;
  top: 3rem;
  left: -0.5rem;
  z-index: -1;
  background-color: grey-accent;
}

@media (max-width: 600px) {
  h2:before {
    height: 5px;
    top: 1.8rem;
    width: 200px;
  }

  h2 {
    font-size: 2.1rem;
    margin-bottom: 1rem;
    margin-top: 2rem;
  }
}
</style>