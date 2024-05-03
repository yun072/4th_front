<template>
  <div class = "container">
    <div v-for="category in categories" :key="category" @click="selectCategory(category)" :class="{ 'selected': selectedCategory === category }">
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
  let selectedCategory = null;

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
  // category 는 menuCategory.value(한국어) 임.
  const selectCategory = (category) => {
    emit('categorySelected', category);
    selectedCategory = category;
    console.log(category);
  };

  fetchCategories(); // 데이터 가져오기
</script>

<style scoped>
.container {
  height: 100vh; /* 세로 길이를 화면의 전체 높이로 설정 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #E8E8E8;
}

.container > div {
  font-weight: bold; /* 두꺼운 글씨체로 설정 */
  cursor: pointer;
  padding: 10px;
  margin: 5px;
}

.container > div.selected {
  background-color: white; /* 클릭된 카테고리의 배경색을 흰색으로 설정 */
  border-radius: 5px; /* 모서리를 둥글게 만듭니다. */
}

button {
  position: fixed; /* 화면 아래에 고정되도록 설정 */
  bottom: 20px; /* 아래 여백 조정 */
  right: 20px; /* 오른쪽 여백 조정 */
  margin-right: auto;
}
</style>