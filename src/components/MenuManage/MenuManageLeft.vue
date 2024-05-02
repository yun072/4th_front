<template>
  <div class = "container">
    <div v-for="category in categories" :key="category" @click="selectCategory(category)">
      {{ category }}
    </div>
    <button @click="goToMenuAdd()">+ 메뉴 추가</button>
  </div>
</template>

<script setup>
  import { ref, defineEmits } from 'vue';
  import axios from 'axios';
  import router from "@/router";

  const categories = ref([]);
  // 자식 컴포넌트에서 이벤트 생성 후 호출
  const emit = defineEmits(["categorySelected"]);

  // fetch categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/menus/store/1');
      categories.value = [...new Set(response.data.data.map(menu => menu.menuCategory.value))];
      console.log(categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const goToMenuAdd = () => {
    router.push({ name: "menuadd" });
  }
  // select category
  // 이건 부모 컴포넌트에서 이벤트 수신
  const selectCategory = (category) => {
    emit('categorySelected', category);
  };

  fetchCategories(); // 데이터 가져오기
</script>

<style scoped>
  .container{
    background-color: #D9D9D9;
  }
</style>