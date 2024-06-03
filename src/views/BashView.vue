<template>
  <MenuHeader/>
  <div class = "container">
    <div class = "container-left">
      <div class = "month-scale"> 
        <MonthSaleComponent/>
      </div>
      <div class = "meal-type">
        <MealTypeComponent/>
      </div>
      <div class = "meal-time">
        <MealTimeComponent/>
      </div>
      <div class = "menu-prefer">
        <MenuPrefer/>
      </div>  
    </div>
    <div class="container-right">
      <DeliveryFrequency/>
      <button>Download PDF</button>
    </div>
  </div>
</template>
  
<script setup>

import MonthSaleComponent from "@/components/Insight/MonthSaleComponent.vue";
import MealTypeComponent from "@/components/Insight/MealTypeComponent.vue";
import MenuHeader from "@/components/MenuHeader.vue";
import MenuPrefer from "@/components/Insight/MenuPreferComponent.vue";
import MealTimeComponent from "@/components/Insight/MealTimeComponent.vue";
import DeliveryFrequency from "@/components/Insight/DeliveryFrequencyComponent.vue";
</script>

<style scoped>
.container {
  display: flex;
  height: 100vh;
}

.container-left {
  display: grid;
  grid-template-columns: 1fr 1fr; /* 2열로 설정 */
  grid-template-rows: 1fr 1fr; /* 2개의 행으로 설정 */
  gap: 10px; /* 간격을 조절할 수 있습니다 */
  width: 50%; /* 화면의 왼쪽 절반을 차지하도록 설정 */
  border-right: 1px solid #ccc; /* 오른쪽에 구분선 추가 (선택 사항) */
}

.container-right {
  width: 50%; /* 화면의 오른쪽 절반을 차지하도록 설정 */
  padding: 10px;
}

.month-scale {
  grid-column: 1;
  grid-row: 1;
  border: 1px solid #ccc; /* 각 아이템의 스타일을 조정할 수 있습니다 */
  padding: 10px;
  box-sizing: border-box;
}

.meal-type {
  grid-column: 2;
  grid-row: 1;
  border: 1px solid #ccc;
  padding: 10px;
  box-sizing: border-box;
}

.meal-time {
  grid-column: 1;
  grid-row: 2;
  border: 1px solid #ccc;
  padding: 10px;
  box-sizing: border-box;
}

.menu-prefer {
  grid-column: 2;
  grid-row: 2;
  border: 1px solid #ccc;
  padding: 10px;
  box-sizing: border-box;
}
</style>
