<template>
  <div class="listcost">
    <p class="listcost__title">{{title}}</p>
    <p class="listcost__amount">{{formatAmount}}</p>
  </div>
</template>

<script>
export default {
  name: "ListCost",
  props: ["title", "amount"],
  computed: {
    formatAmount() {
      return new Intl.NumberFormat("en-EN", {
        /* style: "currency",
        currency: "IDR", */
        minimumFractionDigits: 0
      }).format(this.amount);
    }
  }
};
</script>

<style lang="stylus" scoped>
@font-face {
  font-family: inter-bold;
  src: url('../assets/Inter-Bold.otf');
}

.listcost {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 1rem 0;
}

.listcost__title {
  font-size: 1.2rem;
}

.listcost__amount {
  font-family: inter-bold;
  color: black;
  font-size: 1.4rem;
}
</style>