<template>
    <div>
      <h2>시각화 예제입니다.</h2>
      <button @click="fetchData">데이터 가져오기</button>
  
      <div v-if="isLoading">데이터를 가져오는 중입니다...</div>
  
      <div v-if="orders && orders.length > 0">
        <h3>주문 목록:</h3>
        <ul>
          <li v-for="order in orders" :key="order.id">{{ order }}</li>
        </ul>
      </div>
      <div v-else-if="!isLoading">데이터가 없습니다.</div>
      <canvas id="myChart" width="100px" height="50px"></canvas>
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
      orders.value = response.data.data;
    } catch (error) {
      console.error('데이터를 가져오는 중 에러가 발생했습니다:', error);
    } finally {
      isLoading.value = false;
    }
  };
  
  onMounted(() => {
    const ctx = document.getElementById('myChart').getContext('2d');
    myChart.value = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
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
  });
  </script>
  
  <style scoped>
  canvas{
    height : 10%;
    width: 10px;
  }
  </style>
  