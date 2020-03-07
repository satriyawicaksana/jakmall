<template>
  <div id="app">
    <!-- <input type="checkbox" v-model="formObj.checked" @change="resetField" />
    <InputBox v-model="formObj.dropshipperName" :disabled="formObj.checked" />
    <input type="text" v-model="formObj.dropshipperName" :disabled="!formObj.checked" />-->
    <div class="container">
      <div class="stepper">
        <NavigationItem
          :id="navigationStatus[0].id+1"
          :title="navigationStatus[0].title"
          :active="navigationStatus[0].status"
        />
        <div class="arrow"></div>
        <NavigationItem
          :id="navigationStatus[1].id+1"
          :title="navigationStatus[1].title"
          :active="navigationStatus[1].status"
        />
        <div class="arrow"></div>
        <NavigationItem
          :id="navigationStatus[2].id+1"
          :title="navigationStatus[2].title"
          :active="navigationStatus[2].status"
        />
      </div>
      <div class="form">
        <div class="form__navigation">
          <button @click="prevStep">
            <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 24 24" width="16">
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
            </svg>
            <p>{{formObj.navigationText[activeStep]}}</p>
          </button>
        </div>
        <div class="form__container">
          <div class="form__container_left">
            <div class="delivery" v-show="activeStep==0">
              <div class="delivery__top">
                <HeaderText title="Delivery details" />
                <div class="dropshipper">
                  <label class="dropshipper__label" for="dropship">
                    <input
                      type="checkbox"
                      id="dropship"
                      v-model="formObj.checked"
                      @change="resetField"
                    />
                    <span class="checkmark"></span>
                    Send as dropshipper
                  </label>
                </div>
              </div>
              <div class="delivery__bot">
                <div class="delivery__bot_left delivery__bot_child">
                  <InputBox
                    id="Email"
                    type="email"
                    :disabled="!formObj.checked"
                    @change-value="formObj.email = $event"
                    :pattern="/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/"
                    :dropshipperField="false"
                  />
                  <InputBox
                    id="Phone Number"
                    type="tel"
                    :disabled="!formObj.checked"
                    @change-value="formObj.number = $event"
                    :pattern="/^[-+()\d]{6,20}$/"
                    :dropshipperField="false"
                  />
                  <TextareaBox
                    :maxlength="120"
                    @change-value="formObj.address = $event"
                    :incorrect="formObj.incorrect"
                  />
                </div>
                <div class="delivery__bot_right delivery__bot_child">
                  <InputBox
                    id="Dropshipper name"
                    type="text"
                    :disabled="!formObj.checked"
                    @change-value="formObj.dropshipperName = $event"
                    :pattern="/[\w ]/"
                    :dropshipperField="true"
                    :incorrect="formObj.incorrect"
                  />
                  <InputBox
                    id="Dropshipper number"
                    type="tel"
                    :disabled="!formObj.checked"
                    @change-value="formObj.dropshipperNumber = $event"
                    :pattern="/^[-+()\d]{6,20}$/"
                    :dropshipperField="true"
                    :incorrect="formObj.incorrect"
                  />
                </div>
              </div>
            </div>
            <div class="payment" v-show="activeStep==1">
              <div class="shipmentfield">
                <HeaderText title="Shipment" />
                <div class="shipmentfield__container">
                  <SelectionBox
                    title="GO-SEND"
                    amount="15000"
                    @change-value="shipmentHandler($event, 0)"
                    :selected="this.formObj.shipmentMethod == 0"
                  />
                  <SelectionBox
                    title="JNE"
                    amount="9000"
                    @change-value="shipmentHandler($event, 1)"
                    :selected="this.formObj.shipmentMethod == 1"
                  />
                  <SelectionBox
                    title="Personal Courier"
                    amount="29000"
                    @change-value="shipmentHandler($event, 2)"
                    :selected="this.formObj.shipmentMethod == 2"
                  />
                </div>
              </div>
              <div class="paymentfield">
                <HeaderText title="Payment" />
                <div class="paymentfield__container">
                  <SelectionBox
                    title="e-Wallet"
                    amount="1500000"
                    @change-value="paymentHandler($event, 0)"
                    :selected="this.formObj.paymentMethod == 0"
                  />
                  <SelectionBox
                    title="Bank Transfer"
                    amount
                    @change-value="paymentHandler($event, 1)"
                    :selected="this.formObj.paymentMethod == 1"
                  />
                  <SelectionBox
                    title="Virtual Account"
                    amount
                    @change-value="paymentHandler($event, 2)"
                    :selected="this.formObj.paymentMethod == 2"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="form__container_right">
            <div class="summary__top">
              <h3>Summary</h3>
              <p>10 items purchased</p>
              <SummaryBox
                v-for="item in summaryBox"
                :key="item.id"
                :title="item.title"
                :detail="item.detail"
              />
              <!-- <SummaryBox title="Delivery Estimation" detail="today By GO-SEND" />
              <SummaryBox title="Delivery Estimation" detail="today By GO-SEND" />-->
            </div>
            <div class="summary__bot">
              <ListCost
                v-for="list in listCost"
                :key="list.title"
                :title="list.title"
                :amount="list.amount"
              />
              <div class="totalamount">
                <p class="totalamount__title">Total</p>
                <p class="totalamount__amount">{{totalAmount}}</p>
              </div>
              <OrangeButton
                v-if="activeStep!=2"
                :title="formObj.buttonText[activeStep]"
                @next-step="nextStep"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InputBox from "./components/InputBox";
import NavigationItem from "./components/NavigationItem";
import SummaryBox from "./components/SummaryBox";
import ListCost from "./components/ListCost";
import OrangeButton from "./components/OrangeButton";
import HeaderText from "./components/HeaderText";
import TextareaBox from "./components/TextareaBox";
import SelectionBox from "./components/SelectionBox";
export default {
  name: "App",
  components: {
    InputBox,
    NavigationItem,
    SummaryBox,
    ListCost,
    OrangeButton,
    HeaderText,
    TextareaBox,
    SelectionBox
  },
  data: function() {
    return {
      activeStep: 1,
      navigationStatus: [
        { id: 0, title: "Delivery", status: true },
        { id: 1, title: "Payment", status: false },
        { id: 2, title: "Finish", status: false }
      ],
      formObj: {
        checked: true,
        incorrect: false,
        email: "",
        number: "",
        address: "",
        dropshipperName: "",
        dropshipperNumber: "",
        shipmentMethod: -1,
        paymentMethod: -1,
        navigationText: ["Back to cart", "Back to delivery", "Go to homepage"],
        buttonText: ["Continue to Payment", "Pay with e-Wallet"]
      },
      listCost: [
        { id: 1, title: "Cost of goods", amount: 500000 },
        { id: 2, title: "Dropshipping Fee", amount: 5900 }
      ],
      summaryBox: []
    };
  },
  computed: {
    totalAmount: function() {
      return new Intl.NumberFormat("en-EN", {
        /* style: "currency",
        currency: "IDR", */
        minimumFractionDigits: 0
      }).format(this.listCost.reduce((a, b) => a + b.amount, 0));
    }
  },
  methods: {
    resetForm: function() {
      // MASIH SALAH GAK BISA RESET INPUT VALUE NYA
      this.activeStep = 0;
      this.listCost = [
        { title: "Cost of goods", amount: 500000 },
        { title: "Dropshipping Fee", amount: 5900 }
      ];
      this.formObj = {
        checked: true,
        incorrect: false,
        email: "",
        number: "",
        address: "",
        dropshipperName: "",
        dropshipperNumber: "",
        navigationText: ["Back to cart", "Back to delivery", "Go to homepage"],
        buttonText: ["Continue to Payment", "Pay with e-Wallet"]
      };
    },
    resetField: function() {
      if (this.formObj.checked)
        this.listCost.push({ title: "Dropshipping Fee", amount: 5900 });
      else this.listCost.pop();
      this.formObj.dropshipperName = "";
      this.formObj.dropshipperNumber = "";
    },
    shipmentHandler: function(e, shipmentMethod) {
      let shipmentIndex = this.listCost.findIndex(data => data.id == 3);
      let shipmentIndexSummary = this.summaryBox.findIndex(
        data => data.id == 0
      );
      shipmentIndex != -1
        ? (this.listCost.splice(shipmentIndex, 1),
          this.listCost.push({
            id: 3,
            title: e.title + " shipment",
            amount: Number(e.amount)
          }))
        : this.listCost.push({
            id: 3,
            title: e.title + " shipment",
            amount: Number(e.amount)
          });

      this.formObj.shipmentMethod = shipmentMethod;
      let newDeliveryObj = { id: 0, title: "Delivery estimation" };
      if (shipmentIndexSummary != -1) {
        this.summaryBox.splice(shipmentIndexSummary, 1);
        if (shipmentMethod == 0) {
          newDeliveryObj.detail = "today by GO-SEND";
          this.summaryBox.push(newDeliveryObj);
        } else if (shipmentMethod == 1) {
          newDeliveryObj.detail = "2 days by JNE";
          this.summaryBox.push(newDeliveryObj);
        } else if (shipmentMethod == 2) {
          newDeliveryObj.detail = "1 day by Personal Courier";
          this.summaryBox.push(newDeliveryObj);
        }
      } else {
        this.summaryBox.splice(shipmentIndexSummary, 1);
        if (shipmentMethod == 0) {
          newDeliveryObj.detail = "today by GO-SEND";
          this.summaryBox.push(newDeliveryObj);
        } else if (shipmentMethod == 1) {
          newDeliveryObj.detail = "2 days by JNE";
          this.summaryBox.push(newDeliveryObj);
        } else if (shipmentMethod == 2) {
          newDeliveryObj.detail = "1 day by Personal Courier";
          this.summaryBox.push(newDeliveryObj);
        }
      }
    },
    paymentHandler: function(e, paymentMethod) {
      this.formObj.paymentMethod = paymentMethod;
      let newPaymentObj = { id: 1, title: "Payment method" };
      newPaymentObj.detail = e.title;
      let paymentIndexSummary = this.summaryBox.findIndex(data => data.id == 1);
      if (paymentIndexSummary != -1) {
        this.summaryBox.splice(paymentIndexSummary, 1);
        this.summaryBox.push(newPaymentObj);
      } else {
        this.summaryBox.push(newPaymentObj);
      }
      this.formObj.buttonText[1] = "Pay with " + e.title;
    },
    nextStep: function() {
      /* 
        CHECK VALIDITY LATER

      this.formObj.address
        ? (this.formObj.incorrect = false)
        : (this.formObj.incorrect = true); */
      /* this.formObj.checked &&
      !this.formObj.dropshipperName &&
      !this.formObj.dropshipperNumber
        ? (this.formObj.incorrect = true)
        : (this.formObj.incorrect = false); */
      this.activeStep++;
      this.navigationStatus[this.activeStep].status = true;
    },
    prevStep: function() {
      this.navigationStatus[this.activeStep].status = false;
      // Menu masih salah saat kembali page 1
      this.activeStep
        ? this.activeStep == 2
          ? // MASIH SALAH GAK BISA RESET INPUT VALUE NYA
            this.resetForm()
          : this.activeStep--
        : "";
    }
  }
};
</script>

<style lang="stylus">
orange = #FF8A00;
orange-stepper = #FFE4B8;
ivory = #FFF9E4;
dark-green = #1BD97B;
light-green = #E8FBF1;
grey-accent = #eeeeee;
grey-border = #cccccc;
grey-font = #666;
black = #000;

@font-face {
  font-family: inter-medium;
  src: url('./assets/Inter-Medium.otf');
}

@font-face {
  font-family: inter-bold;
  src: url('./assets/Inter-Bold.otf');
}

flexbox(dir = row, jus = center, ali = center) {
  display: flex;
  flex-direction: dir;
  justify-content: jus;
  align-items: ali;
}

*, *:before, *:after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 62.5%;
}

html, body, input, textarea, button {
  font-family: inter-medium;
  color: grey-font;
}

#app {
  width: 100%;
  min-height: 100vh;
  background-color: ivory;
  flexbox();
}

.container {
  width: 90%;
  height: 90vh;
  background-color: white;
  margin: 5vh 0;
}

.stepper {
  flexbox(row, space-around, center);
  width: 45%;
  height: 50px;
  background-color: ivory;
  border-radius: 25px;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
}

@media (max-width: 1200px) {
  .stepper {
    width: 70%;
  }
}

@media (max-width: 600px) {
  .stepper {
    position: fixed;
    width: 50px;
    height: 40%;
    flex-direction: column;
    left: 0;
    top: 50%;
    transform: translate(0, -50%);
  }
}

.arrow {
  width: 8px;
  height: 8px;
  border: 2px solid orange;
  border-top: none;
  border-left: none;
  transform: rotate(-45deg);
}

@media (max-width: 600px) {
  .arrow {
    transform: rotate(45deg);
  }
}

.form {
  height: 100%;
  padding: 2rem 3rem;
}

@media (max-width: 600px) {
  .form {
    padding: 1rem;
    padding-left: 4rem;
  }
}

.form__navigation {
  & button {
    flexbox(row, flex-start, center);
    padding: 1rem 0;
    border: none;
    background: transparent;
    cursor: pointer;

    & svg {
      margin-right: 1rem;
      fill: grey-font;
    }
  }
}

@media (max-width: 600px) {
  .form__navigation {
    padding: 0;
  }
}

.form__container {
  flexbox();
  height: calc(100% - 36px);
}

.form__container_left {
  width: 70%;
  height: 100%;
}

.delivery {
  width: 100%;
  height: 100%;
}

.delivery__top {
  flexbox(row, space-between, center);
}

.dropshipper {
  margin-right: 3rem;
  position: relative;

  & label {
    width: 170px;
    height: 20px;
    font-size: 1.4rem;
    flexbox(row, flex-end, center);
  }

  & input {
    cursor: pointer;
    height: 0;
    width: 0;

    &:checked ~ .checkmark {
      border-color: dark-green;
    }

    &:checked ~ .checkmark:after {
      display: block;
    }
  }
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 20px;
  width: 20px;
  border: 2px solid grey-accent;
}

.checkmark:after {
  content: '';
  display: none;
  position: absolute;
  left: 5px;
  top: 2px;
  width: 5px;
  height: 10px;
  border: solid dark-green;
  border-width: 0 2px 2px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}

.delivery__bot {
  height: calc(100% - 42px);
  padding-top: 2rem;
  flexbox();
}

.delivery__bot_child {
  padding-right: 3rem;
}

.delivery__bot_left {
  width: 60%;
  height: 100%;
}

.delivery__bot_right {
  width: 40%;
  height: 100%;
}

.shipmentfield__container, .paymentfield__container {
  flexbox(row, flex-start, center);
  margin: 3rem 0 6rem 0;
}

.form__container_right {
  width: 30%;
  height: 100%;
  padding-left: 2rem;
  border-left: 2px solid ivory;
  flexbox(column, space-between, flex-start);
}

.summary__top {
  width: 100%;

  & h3 {
    color: orange;
    font-size: 2.5rem;
    font-family: inter-bold;
  }
}

.summary__bot {
  width: 100%;
}

.totalamount {
  flexbox(row, space-between, center);
  margin: 1.5rem 0;
  color: orange;
  font-family: inter-bold;
  font-size: 2rem;
}
</style>
