import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    formObj: {
      activeStep: 0,
      checked: true,
      email: "",
      number: "",
      address: "",
      dropshipperName: "",
      dropshipperNumber: "",
      shipmentMethod: -1,
      paymentMethod: -1,
      buttonText: ["Continue to Payment", "Pay with e-Wallet"],
      listCost: [
        { id: 1, title: "Cost of goods", amount: 500000 },
        { id: 2, title: "Dropshipping Fee", amount: 5900 }
      ],
      summaryBox: []
    },
  },
  getters: {
    totalAmountFormated(state) {
      return new Intl.NumberFormat("en-EN", {
        minimumFractionDigits: 0
      }).format(state.formObj.listCost.reduce((a, b) => a + b.amount, 0));
    }
  },
  mutations: {
  }
})

