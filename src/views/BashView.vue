<template>
  <MenuHeader/>
  <div class = "container">
  <div class = "month-scale"> 
  <MonthSaleComponent/>
  </div>
  <div class = "meal-type">
    <MealTypeComponent/>
  </div>
  <div class = "meal-time">
    <MealTimeComponent/>
  </div>
  </div>  
  
</template>
  
<script setup>

import MonthSaleComponent from "@/components/Insight/MonthSaleComponent.vue";
import MealTypeComponent from "@/components/Insight/MealTypeComponent.vue";
import MenuHeader from "@/components/MenuHeader.vue";
import MealTimeComponent from "@/components/Insight/MealTimeComponent.vue";

</script>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 5px;
  height: 400px;
}
.month-scale{
  grid-column: 1 / 2;
  grid-row: 1 / 2;
}
.meal-type{
  grid-column: 2 / 3;
  grid-row: 1 / 2;
}
.meal-time{
  grid-column: 1 / 2;
  grid-row: 2 / 3;
}

</style>