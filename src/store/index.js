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
      navigationText: ["Back to cart", "Back to delivery", "Go to homepage"],
      listCost: [
        { id: 0, title: "Cost of goods", amount: 500000 },
        { id: 1, title: "Dropshipping Fee", amount: 5900 }
      ],
      summaryBox: []
    },
  },
  getters: {
    totalAmountFormated(state) {
      return new Intl.NumberFormat("en-EN", {
        minimumFractionDigits: 0
      }).format(state.formObj.listCost.reduce((a, b) => a + b.amount, 0));
    },
    summaryBoxById: (state) => (id) => {
      return state.summaryBox.findIndex(data => data.id == id)
    },
    listCostById: (state) => (id) => {
      return state.listCost.findIndex(data => data.id == id)
    }
  },
  mutations: {
    switchCheckbox(state) {
      state.formObj.checked = !state.formObj.checked;
      if (!state.formObj.checked) {
        state.formObj.dropshipperName = "";
        state.formObj.dropshipperNumber = "";
      }
    },
    addToListCost(state, payload) {
      state.formObj.listCost.push(payload);
    },
    removeFromListCost(state) {
      state.formObj.listCost.pop();
    },
    setemail(state, payload) {
      state.formObj.email = payload;
    },
    setnumber(state, payload) {
      state.formObj.number = payload;
    },
    setdropshipperName(state, payload) {
      state.formObj.dropshipperName = payload;
    },
    setdropshipperNumber(state, payload) {
      state.formObj.dropshipperNumber = payload;
    },
    nextStep(state) {
      state.activeStep++;
      if (state.activeStep == 1) {
        state.shipmentMethod = 0;
        state.paymentMethod = 0;
      }
    }
  }
})

