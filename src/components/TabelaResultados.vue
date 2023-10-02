<script setup lang="ts">
  import { defineProps, computed } from "vue";

  let range = 100

  const props = defineProps<{
    invested: number,
    percentageRend: number
  }>()
  
  const tabela = computed(()  => {
    let tabela: {mes: number, investido: number, rendimento_total: number, patrimonio: number, rendimento_mes: number}[] = []

    let patrimonio_total = 0
    for(let i = 0; i < range; i++){
      let curLine = {
        mes: i,
        investido: 0,
        rendimento_total: 0,
        patrimonio: 0,
        rendimento_mes: 0
      }
      if(patrimonio_total > 0){
        let curRendimentoMes = patrimonio_total * (props.percentageRend / 100)
        curLine.rendimento_mes = Math.round(curRendimentoMes)
        patrimonio_total += curRendimentoMes
      }else{
        curLine.rendimento_mes = 0
      }
      curLine.patrimonio = Math.round(patrimonio_total)
      curLine.rendimento_total = Math.round(patrimonio_total - (props.invested * i))
      curLine.investido = props.invested * i
      patrimonio_total += props.invested
      tabela[i] = curLine
    }
    return tabela
  })


</script>

<template>
  <table v-if="props.invested > 0 && props.percentageRend > 0">
    <thead>
      <tr>
        <th>Mês</th>
        <th>Investido</th>
        <th>Rendimento Total</th>
        <th>Patrimônio</th>
        <th>Rendimento Mês</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="i in range" :key="i">
        <td>{{tabela[i]?.mes}}</td>
        <td>{{tabela[i]?.investido}}</td>
        <td>{{tabela[i]?.rendimento_total}}</td>
        <td>{{tabela[i]?.patrimonio}}</td>
        <td>{{tabela[i]?.rendimento_mes}}</td>
      </tr>
    </tbody>

  </table>
</template>

<style scoped lang="scss">
  tr{
    text-align: center;
  }

</style>