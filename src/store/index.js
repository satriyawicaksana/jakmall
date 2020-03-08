import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';


Vue.use(Vuex)
function INITIAL_STATE() {
  return {
    activeStep: 0,
    checked: true,
    reset: false,
    email: {
      value: "",
      state: false,
      boom: false,
    },
    number: {
      value: "",
      state: false,
      boom: false,
    },
    address: {
      value: "",
      state: false,
      boom: false,
    },
    dropshipperName: {
      value: "",
      state: false,
      boom: false,
    },
    dropshipperNumber: {
      value: "",
      state: false,
      boom: false,
    },
    shipmentMethod: -1,
    paymentMethod: -1,
    buttonText: ["Continue to Payment", "Pay with e-Wallet"],
    navigationText: ["Back to cart", "Back to delivery", "Go to homepage"],
    listCost: [
      { id: 0, title: "Cost of goods", amount: 500000 },
      { id: 1, title: "Dropshipping Fee", amount: 5900 }
    ],
    summaryBox: [],
    orderId: "",
  }
}

export default new Vuex.Store({
  state: {
    formObj: INITIAL_STATE()
  },
  plugins: [createPersistedState()],
  getters: {
    totalAmountFormated(state) {
      return new Intl.NumberFormat("en-EN", {
        minimumFractionDigits: 0
      }).format(state.formObj.listCost.reduce((a, b) => a + b.amount, 0));
    },
    summaryBoxById: (state) => (id) => {
      return state.formObj.summaryBox.findIndex(data => data.id === id)
    },
    listCostById: (state) => (id) => {
      return state.formObj.listCost.findIndex(data => data.id === id)
    }
  },
  mutations: {
    switchCheckbox(state) {
      state.formObj.checked = !state.formObj.checked;
      if (!state.formObj.checked) {
        state.formObj.dropshipperName.value = "";
        state.formObj.dropshipperName.state = false;
        state.formObj.dropshipperName.boom = false;
        state.formObj.dropshipperNumber.value = "";
        state.formObj.dropshipperNumber.state = false;
        state.formObj.dropshipperNumber.boom = false;
      }
    },
    addToListCost(state, payload) {
      state.formObj.listCost.push(payload);
    },
    removeFromListCost(state) {
      state.formObj.listCost.pop();
    },
    addToSummaryBox(state, payload) {
      state.formObj.summaryBox.push(payload);
    },
    removeFromSummaryBox(state, payload) {
      state.formObj.summaryBox.splice(payload.id, 1);
    },
    setShipmentMethod(state, payload) {
      state.formObj.shipmentMethod = payload;
    },
    setPaymentMethod(state, payload) {
      state.formObj.paymentMethod = payload;
    },
    changeButtonText(state, payload) {
      state.formObj.buttonText[1] = payload;
    },
    setemail(state, payload) {
      state.formObj.email = payload;
    },
    setnumber(state, payload) {
      state.formObj.number = payload;
    },
    setaddress(state, payload) {
      state.formObj.address = payload;
    },
    setdropshipperName(state, payload) {
      state.formObj.dropshipperName = payload;
    },
    setdropshipperNumber(state, payload) {
      state.formObj.dropshipperNumber = payload;
    },
    prevStep(state) {
      if (state.formObj.activeStep == 2) {
        state.formObj.activeStep = 0;
        const s = INITIAL_STATE();
        Object.keys(s).forEach(key => state.formObj[key] = s[key]);
        state.formObj.reset = true;
      }
      else if (state.formObj.activeStep == 1) {
        state.formObj.listCost.pop();
        state.formObj.summaryBox.pop();
        state.formObj.activeStep--;
      }
    },
    nextStep(state) {
      !state.formObj.email.state ? state.formObj.email.boom = true : state.formObj.email.boom = false;
      !state.formObj.number.state ? state.formObj.number.boom = true : state.formObj.number.boom = false;
      !state.formObj.address.state ? state.formObj.address.boom = true : state.formObj.address.boom = false;
      if (state.formObj.checked) {
        !state.formObj.dropshipperName.state ? state.formObj.dropshipperName.boom = true : state.formObj.dropshipperName.boom = false;
        !state.formObj.dropshipperNumber.state ? state.formObj.dropshipperNumber.boom = true : state.formObj.dropshipperNumber.boom = false;
      }
      if (state.formObj.activeStep == 1) {
        const PAYMENT_NAME = ["e-Wallet", "Bank Transfer", "Virtual Account"];
        const ALPHANUM_REF = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
        state.formObj.summaryBox.push({ id: 1, title: "Payment method", detail: PAYMENT_NAME[state.formObj.paymentMethod] });
        for (let i = 0; i < 5; i++) {
          state.formObj.orderId += ALPHANUM_REF.charAt(Math.floor(Math.random() * ALPHANUM_REF.length));
        }
        state.formObj.activeStep++;
      }

      if (state.formObj.email.state &&
        state.formObj.number.state &&
        state.formObj.address.state &&
        ((state.formObj.checked && state.formObj.dropshipperName.state) || !state.formObj.checked) &&
        ((state.formObj.checked && state.formObj.dropshipperNumber.state) || !state.formObj.checked) && state.formObj.activeStep == 0) {
        state.formObj.shipmentMethod = 0;
        state.formObj.summaryBox.push({ id: 0, title: "Delivery estimation", detail: "today by GO-SEND" })
        state.formObj.paymentMethod = 0;
        state.formObj.listCost.push({ id: 2, title: "GO-SEND shipment", amount: 15000 })
        state.formObj.activeStep++;
      }

    }
  }
})

