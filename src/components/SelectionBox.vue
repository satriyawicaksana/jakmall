<template>
  <div class="selectionbox" :class="{active: selected}" @click="clickHandler">
    <p class="title" :class="{fontactive: selected}">{{title}}</p>
    <p
      class="amount"
      :class="{fontactive: selected, fontactiveamount: selected}"
      v-show="amount"
    >{{formatAmount}}</p>
    <div class="icon">
      <svg
        class="green hide"
        :class="{displayed: selected}"
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 0 24 24"
        width="24"
      >
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: "SelectionBox",
  props: ["title", "id", "amount", "type", "selected"],
  computed: {
    formatAmount() {
      return new Intl.NumberFormat("en-EN", {
        minimumFractionDigits: 0
      }).format(this.amount);
    }
  },
  methods: {
    clickHandler() {
      if (this.type == "shipment") {
        const s = this.$store.getters.summaryBoxById(0);
        const l = this.$store.getters.listCostById(2);
        const days = ["today", "2 days", "1 day"];
        if (s != -1) {
          this.$store.commit("removeFromSummaryBox", { id: 0 });
          this.$store.commit("addToSummaryBox", {
            id: 0,
            title: "Delivery estimation",
            detail: days[this.id] + " by " + this.title
          });
        }
        if (l != -1) {
          this.$store.commit("removeFromListCost");
          this.$store.commit("addToListCost", {
            id: 2,
            title: this.title + " shipment",
            amount: Number(this.amount)
          });
        }
        this.$store.commit("setShipmentMethod", this.id);
      } else if (this.type == "payment") {
        this.$store.commit("setPaymentMethod", this.id);
        this.$store.commit("changeButtonText", "Pay with " + this.title);
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
dark-green = #1BD97B;
light-green = #E8FBF1;
grey-border = #cccccc;

@font-face {
  font-family: inter-bold;
  src: url('../assets/Inter-Bold.otf');
}

.selectionbox {
  height: 60px;
  width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  position: relative;
  background-color: transparent;
  border: 1px solid grey-border;
  padding: 1rem;
  margin-right: 1rem;
  cursor: pointer;
}

.icon {
  position: absolute;
  right: 1rem;
}

.green {
  fill: dark-green;
}

.hide {
  display: none;
}

.displayed {
  display: block;
}

.title {
  font-size: 1.2rem;
}

.amount {
  font-size: 1.4rem;
}

.active {
  background-color: light-green;
  border: 2px solid dark-green;
}

.fontactive {
  color: black;
}

.fontactiveamount {
  font-family: inter-bold;
}
</style>