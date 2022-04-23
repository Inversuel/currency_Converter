import { createStore } from "vuex";
import axios from "axios";

export interface stateType {
  rates: [
    {
      currency: string;
      code: string;
      mid: number;
    }
  ];
  ratesOptions: [{ name: string; code: string }];
}

const state: stateType = {
  rates: [
    {
      currency: "",
      code: "",
      mid: 0,
    },
  ],
  ratesOptions: [{ name: "", code: "" }],
};

const mutations = {
  setRates(state: stateType) {
    axios
      .get("http://api.nbp.pl/api/exchangerates/tables/a")
      .then((Response) => {
        state.rates = Response.data[0].rates;
      })
      .catch((err) => console.error(err));
    axios
      .get("http://api.nbp.pl/api/exchangerates/tables/b")
      .then((Response) => {
        Response.data[0].rates.forEach(
          (item: { currency: string; code: string; mid: number }) =>
            state.rates.push(item)
        );
      })
      .then(() => {
        state.rates.forEach((rates: any) => {
          state.ratesOptions.push({
            name: rates.code,
            code: rates.mid,
          });
        });
      })
      .catch((err) => console.error(err));
  },
  setOptions(state: stateType) {},
};

const actions = {
  setRates: ({ commit }: any) => commit("setRates"),
  setOptions: ({ commit }: any) => commit("setOptions"),
};

const getters = {
  ratesOptions: (state: { ratesOptions: any }) => state.ratesOptions,
  rates: (state: { rates: any }) => state.rates,
};

export default createStore({
  state,
  mutations,
  actions,
  getters,
});
