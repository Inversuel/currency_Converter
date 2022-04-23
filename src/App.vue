<template>
  <div id="app">
    <h1>Currency Converter</h1>
    <section class="margin">
      <Checkbox
        id="binary"
        v-model="convertToPln"
        :binary="true"
        @change="clearValue()"
        style="margin-right: 5px"
      />
      <label for="binary">Convert to PLN: {{ convertToPln }}</label>
    </section>
    <section class="margin">
      <InputText
        type="number"
        min="0"
        v-model="selectedSourceCurrencyValue"
        @change="onChangeConvert()"
      />
      <Dropdown
        v-model="selectedSourceCurrency"
        :options="ratesOptions"
        placeholder="Select currency"
        optionLabel="name"
        optionValue="code"
        :filter="true"
        filterPlaceholder="Find currency"
        @change="onChangeConvert()"
      />
    </section>
    <i
      class="pi pi-arrow-down"
      style="font-size: 2rem; margin: 5px"
      v-if="!convertToPln"
    ></i>
    <section v-if="!convertToPln" class="margin">
      <InputText
        type="number"
        disabled
        min="0"
        v-model="selectedTargetCurrencyValue"
        @change="onChangeConvert()"
      />
      <Dropdown
        v-model="selectedTargetCurrency"
        :options="ratesOptions"
        placeholder="Select currency"
        optionLabel="name"
        optionValue="code"
        :filter="true"
        filterPlaceholder="Find currency"
        @change="onChangeConvert()"
      />
    </section>
    <Button
      class="margin"
      label="Convert"
      @click="handleConvert($event)"
    ></Button>
    <div>
      <h1>{{ value }} {{ valueCurrency }}</h1>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const selectedSourceCurrency = ref();
    const selectedSourceCurrencyValue = ref();
    const selectedTargetCurrency = ref();
    const selectedTargetCurrencyValue = ref();
    const ratesOptions = computed(() => store.getters.ratesOptions);
    const value = ref();
    const valueCurrency = ref("");
    const convertToPln = ref(true);

    //convert on click
    const handleConvert = (e: any) => {
      e.PreventDefault;
      if (convertToPln.value) {
        value.value =
          selectedSourceCurrencyValue.value * selectedSourceCurrency.value;
        valueCurrency.value = "PLN";
      }
      if (!convertToPln.value) {
        let SourcePLN =
          selectedSourceCurrencyValue.value * selectedSourceCurrency.value;
        selectedTargetCurrencyValue.value =
          SourcePLN / selectedTargetCurrency.value;
      }
    };
    //Without clicking button convert on change 
    const onChangeConvert = () => {
      console.log(
        selectedSourceCurrency.value,
        selectedSourceCurrencyValue.value,
        selectedTargetCurrency.value,
        selectedTargetCurrencyValue.value
      );

      if (convertToPln.value) {
        value.value =
          selectedSourceCurrencyValue.value * selectedSourceCurrency.value;
        valueCurrency.value = "PLN";
      }
      if (!convertToPln.value) {
        let SourcePLN =
          selectedSourceCurrencyValue.value * selectedSourceCurrency.value;
        selectedTargetCurrencyValue.value =
          SourcePLN / selectedTargetCurrency.value;
      }
    };

    const clearValue = () => {
      value.value = "";
      valueCurrency.value = "";
    };

    onMounted(() => {
      store.dispatch("setRates");
      store.dispatch("setOptions");
    });

    return {
      value,
      ratesOptions,
      handleConvert,
      onChangeConvert,
      clearValue,
      convertToPln,
      valueCurrency,
      selectedSourceCurrency,
      selectedSourceCurrencyValue,
      selectedTargetCurrency,
      selectedTargetCurrencyValue,
    };
  },
};
</script>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

section {
  display: flex;
  justify-content: center;
}

.margin {
  margin: 5px;
}
input {
  margin-right: 5px;
}
</style>
