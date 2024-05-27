<template>
    <div>
      <h2>시각화 예제입니다.</h2>
      <button @click="fetchData">데이터 가져오기</button>
  
      <div v-if="isLoading">데이터를 가져오는 중입니다...</div>
  
      <div v-if="orders && orders.length > 0">
        <h3>주문 목록:</h3>
        <ul>
          <li v-for="order in orders" :key="order.orderId">{{ order }}</li>
        </ul>
      </div>
      <div v-else-if="!isLoading">데이터가 없습니다.</div>
      <div class = "canvas">
      <canvas id="myChart"></canvas>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import Chart from 'chart.js/auto';
  
  const orders = ref([]);
  const isLoading = ref(false);
  const myChart = ref(null);


  const fetchData = async () => {   
    isLoading.value = true;
    try {
      const response = await axios.get('http://localhost:8080/api/v1/orders/hall?storeId=1');
      // 데이터 변환: menuName을 추출하여 개수를 세어 새로운 데이터 구성
      orders.value = response.data.data;
      const menuCounts = {};
      response.data.data.forEach(order => {
        order.orderDetailResponseDtos.forEach(detail => {
          const menuName = detail.menuName;
          if (menuCounts[menuName]) {
            menuCounts[menuName]++;
          } else {
            menuCounts[menuName] = 1;
          }
        });
      });
      // 변환된 데이터를 차트에 적용
      updateChart(menuCounts);
    } catch (error) {
      console.error('데이터를 가져오는 중 에러가 발생했습니다:', error);
    } finally {
      isLoading.value = false;
    }
  };
  
  const updateChart = (menuCounts) => {
    if (myChart.value) {
      // 차트가 이미 생성되었다면 데이터만 업데이트
      myChart.value.data.labels = Object.keys(menuCounts);
      myChart.value.data.datasets[0].data = Object.values(menuCounts);
      myChart.value.update();
    } else {
      // 차트가 아직 없으면 생성
      const ctx = document.getElementById('myChart').getContext('2d');
      myChart.value = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: Object.keys(menuCounts),
          datasets: [{
            label: '주문량',
            data: Object.values(menuCounts),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  };
  
  onMounted(() => {
    fetchData();
  });
  </script>
  
  
  <style scoped>
  .canvas{
    height : 800px;
    width: 800px;
  }
  </style>
  