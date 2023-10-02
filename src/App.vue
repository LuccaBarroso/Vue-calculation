<script setup lang="ts">
import { ref } from "vue";
import ProfitPecentage from "@/components/ProfitPercentage.vue";
import IncomeInput from "@/components/IncomeInput.vue";
import TabelaResultados from "@/components/TabelaResultados.vue";

const invested = ref(0);
const percentageRend = ref(1);

function updateInvestments(value: number){
  invested.value = value;
};

function updatePercentage(percentage: number) {
  percentageRend.value = percentage;
}


</script>

<template>
  <div class="app">
   <ProfitPecentage @updatePercentage="updatePercentage" />
   <IncomeInput @updateInvestments="updateInvestments" />
   <TabelaResultados :invested="invested" :percentageRend="percentageRend" />
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin-inline: auto;
}

.app{
  display: flex;
  flex-direction: column;
}
</style>
