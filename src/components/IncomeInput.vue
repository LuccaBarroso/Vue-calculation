<script setup lang="ts">
  import { ref, defineEmits, computed } from "vue";

  const monthlyIncome = ref(0);
  const monthlyExpenses = ref(0);
  const monthlyInvestments = ref(0);
  const investedPercentage = ref(0);

  const emit = defineEmits<{
    updateInvestments: [value: number]
  }>()

  const updateValue = (e: Event) => {
    if(monthlyExpenses.value > 0 && monthlyIncome.value > 0){
      if(monthlyIncome.value < (monthlyExpenses.value + monthlyInvestments.value)){
        let newInvested = monthlyIncome.value - monthlyExpenses.value;
        if(newInvested < 0){
          newInvested = 0;
        }
        monthlyInvestments.value = newInvested;
        if(monthlyIncome.value < (monthlyExpenses.value + monthlyInvestments.value)){
          monthlyExpenses.value = monthlyIncome.value;
        }
      }
    }

    investedPercentage.value = (monthlyInvestments.value / monthlyIncome.value) * 100;
    emit("updateInvestments", monthlyInvestments.value);
  };

  const updatePercentage = (e: Event) => {
    const expectedInvestment = (monthlyIncome.value * investedPercentage.value) / 100;
    monthlyInvestments.value = expectedInvestment;
    monthlyExpenses.value = monthlyIncome.value - expectedInvestment;
    emit("updateInvestments", monthlyInvestments.value);
  };

  const showPercentagePicker = computed(() => {
    return monthlyIncome.value > 0;
  })
</script>

<template>
  <div class="holder">
    <div class="values">
      <div class="input">
        <label for="monthlyIncome">Renda Mensal</label>
        <input type="number" id="monthlyIncome" v-model="monthlyIncome" @change="updateValue" />
      </div>
      <div class="input">
        <label for="monthlyExpenses">Gastos Mensais</label>
        <input type="number" id="monthlyExpenses" v-model="monthlyExpenses" @change="updateValue" />
      </div>
      <div class="input">
        <label for="monthlyInvestments">Investimentos Mensais</label>
        <input type="number" id="monthlyInvestments" v-model="monthlyInvestments" @change="updateValue" />
      </div>
    </div>
    <div class="percentage-invested" v-if="showPercentagePicker">
      <input type="range" min="0" max="100" class="slider" id="investedPercentage" step="1" v-model="investedPercentage" @change="updatePercentage" />
    </div>
  </div>
</template>

<style scoped lang="scss">
  .percentage-invested{
    input{
      margin-top: 40px;
      width: 100%;
    }
  }
  .values{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 60px;
    .input{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      label{
        color: white;
        font-size: 1.5rem;
        font-weight: bold;
      }
      input{
        border: 1px solid white;
        border-radius: 3px;
        padding: 10px;
        color: white;
        font-size: 1.5rem;
        font-weight: bold;
        background-color: transparent;
        margin-top: 10px;
      }
    }
  }
</style>