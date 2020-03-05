<template>
  <div class="summarybox">
    <p class="summarybox__title">{{title}}</p>
    <p class="summarybox__detail">{{detail}}</p>
  </div>
</template>

<script>
export default {
  name: "SummaryBox",
  props: ["title", "detail"]
};
</script>
<style lang="stylus" scoped>
grey-border = #cccccc;
dark-green = #1BD97B;

.summarybox {
  width: 100%;
  margin-top: 3rem;
  position: relative;
}

.summarybox:before {
  content: '';
  width: 30%;
  height: 1px;
  position: absolute;
  background-color: grey-border;
  top: -1.5rem;
}

.summarybox__title {
  color: black;
  font-size: 1.4rem;
}

.summarybox__detail {
  color: dark-green;
  font-size: 1.6rem;
}
</style>