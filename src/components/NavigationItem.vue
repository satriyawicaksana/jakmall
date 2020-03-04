<template>
  <div class="navigation__item">
    <div class="navigation__item_id" v-bind:class="{'is-active':active}">{{id}}</div>
    <p>{{title}}</p>
  </div>
</template>

<script>
export default {
  name: "NavigationItem",
  props: ["id", "title", "active"]
};
</script>

<style lang="stylus" scoped>
orange = #FF8A00;
orange-stepper = #FFE4B8;

.navigation__item {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  color: orange;
  font-size: 1.2rem;
}

.navigation__item_id {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 0.5rem;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: orange-stepper;
}

.is-active {
  color: white;
  background-color: orange;
}

@media (max-width: 600px) {
  p {
    display: none;
  }
}
</style>