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
.navigation__item_id {
}

.is-active {
}
</style>