<script setup lang="ts">
  import { ref, defineEmits } from "vue";
  import api from "@/services/api";

  const rangePercentage = ref(1);
  const infoSelic = ref({
    selic: 0,
    data: ""
  });


  const emit = defineEmits<{
    updatePercentage: [percentage: number]
  }>()

  const updatePercentage = (e: Event) => {
    const target = e.target as HTMLInputElement;
    rangePercentage.value = Number(target.value);
    emit("updatePercentage", rangePercentage.value);
  };

  api.get("/prime-rate").then((response) => {
    console.log(response.data["prime-rate"][0]);
    infoSelic.value.selic = response.data["prime-rate"][0].value;
    infoSelic.value.data = response.data["prime-rate"][0].date;
  });

</script>

<template>
  <div class="percentage">
    <div class="topo">
      <div class="shower">
        <span class="percentage-value">{{rangePercentage}}</span>
        <span class="percentage-sign">%</span>
      </div>
      <h2>
        Rendimento Mensal
      </h2>
    </div>
    <p>
      A taxa de juros atual é de <strong>{{infoSelic.selic}}%</strong> ao ano (<strong>{{infoSelic.selic / 12}}%</strong>), segundo o Banco Central do Brasil.
      <span>
        *Dado valido até em {{infoSelic.data}}
      </span>
    </p>
  </div>
  <input type="range" min="0" max="3" value="1" class="slider" id="rangePercentage" step="0.1" @input="updatePercentage" />
</template>

<style scoped lang="scss">
  .percentage{
    display: flex;
    flex-direction: column;
    p{
      text-align: center;
    }
    
    margin-bottom: 20px;
    .topo{
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      .shower{
        border: 1px solid white;
        color: white;
        padding: 10px;
        border-radius: 3px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        .percentage-value{
          font-size: 1.5rem;
          font-weight: bold;
        }
        .percentage-sign{
          font-size: 1.5rem;
          font-weight: bold;
        }
      }
      h2{
        color: white;
        font-size: 1.5rem;
        margin-left: 10px;
      }
    }
    
    input{
      widows: 90%;
      margin: 0 auto;
      margin-top: 20px;
      margin-bottom: 20px;
    }
  }
</style>