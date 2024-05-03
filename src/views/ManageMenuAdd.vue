<template>
  <Header>
    <div class="left">메뉴 추가</div>
    <button class="right" @click="goBack">Go Back</button>
  </Header>

  <form @submit.prevent="addMenu" class="body">

    <div class="menu-top">
      <div class="img">
        <img :src="imageSrc" class="img-show" style="max-width: 200px; max-height: 200px;">
        <input type="file" class="img-upload" @change="readInputFile">
      </div>
      <div class="menu">
        <div class="menu-category">
          <label for="category">상품 카테고리</label>
          <br>
          <select v-model="menuCategory" @change="categoryChanged">
            <option value="">카테고리 선택</option>
            <option v-for="category in categories" :key="category" :value="category">{{ category.value }}</option>
          </select>
        </div>
        <div class="menu-name">
          상품명
          <br>
          <input v-model="menuRequestDto.name" class="menu-name-input" placeholder="상품명">
        </div>
        <div class="menu-price">
          상품 가격
          <br>
          <input v-model.number="menuRequestDto.price" class="menu-price-input" placeholder="상품 가격">
        </div>
      </div>
    </div>

    <div class="menu-bottom">
<!--      <div class="menu-detail">-->
<!--        상품 설명-->
<!--        <br>-->
<!--        <input v-model="menuDetail" class="menu-detail-input" placeholder="상품 설명">-->
<!--      </div>-->

      <div class="btn-container">
        <button class="btn_add" type="submit">추가</button>
        <button class="btn_exit" @click="goBack">취소</button>
      </div>
    </div>

  </form>

</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import axios from 'axios';

const router = useRouter();
const categories = ref([]);
const menuCategory = ref('');
const imageSrc = ref('');
const formData = new FormData();
const menuRequestDto = ref({
  storeId: 1,
  name: '',
  price: 0,
  menuCategory: ''
});
// const menuDetail = ref('');

const goBack = () => {
  router.push({ name: "menu" });
};

const fetchCategories = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/menus/store/1');
    categories.value = [...new Set(response.data.data.map(menu => menu.menuCategory))];
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
};

const categoryChanged = () => {
  console.log('menuCategory:', menuCategory.value.key);
  menuRequestDto.value.menuCategory = menuCategory.value.key;
};

const readInputFile = (event) => {
  formData.append('multipartFile', event.target.files[0]);
  const file = event.target.files[0];
  console.log(file);
  if (!file) return;

  for (const pair of formData.entries()) {
    const key = pair[0];
    const value = pair[1];
    if (key === 'multipartFile') {
      console.log('multipartFile:', value);
    } else {
      console.log(key + ': ' + value);
    }
  }
  const reader = new FileReader();

  reader.onload = () => {
    imageSrc.value = reader.result;
    console.log(imageSrc.value);
  };

  reader.readAsDataURL(file);
};

const addMenu = async () => {
  try {

    formData.append('menuRequestDto', new Blob([JSON.stringify(menuRequestDto.value)], { type: "application/json" }));

    // formData에 잘 들어가 있음..
    for (const pair of formData.entries()) {
      const key = pair[0];
      const value = pair[1];
      if (key === 'multipartFile') {
        console.log('multipartFile:', value);
      } else {
        console.log(key + ': ' + value);
      }
    }

    await axios.post(
        'http://localhost:8080/api/menus',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
    );

    console.log('메뉴 추가 완료:');
    router.push({ name: 'menu' });
  } catch (error) {
    console.error('메뉴 추가 에러:', error);
  }

};

fetchCategories();
</script>

<style scoped>
/* Header */
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #D9D9D9;
  height: 100px;
}

.left {
  margin-right: auto; /* 왼쪽 요소를 가장 왼쪽에 배치합니다. */
  padding : 20px;
  font-weight: bold;
  font-size: 18px;
}

 .img-show {
   width: 200px;
   height: 200px;
   object-fit: contain; /* 이미지 비율 유지하며 요소에 맞춤 */
 }

.right {
  margin-left: auto;
  padding : 20px;
  border: none;
  font-weight: bold;
  background-color: #D9D9D9;
  font-size: 18px;
}
.menu-top {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.img {
  float: left;
  display: flex;
  flex-direction: column;
}

.img-show,
.img-upload {
  margin-bottom: 10px;
}

.menu {
  float: right;
}

.menu-bottom {
  clear: both;
  display: flex; /* 추가된 부분 */
  flex-direction: column; /* 추가된 부분 */
  align-items: flex-start; /* 추가된 부분 */
}

/* 상품 설명과 버튼 컨테이너의 스타일 추가 */
.menu-detail {
  float: left;
}

.btn-container {
  float: right;
}

</style>