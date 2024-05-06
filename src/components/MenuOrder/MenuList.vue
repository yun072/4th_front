<template>
  <div class="container" style="overflow-y: auto;">
    <div v-for="menu in filteredMenus" :key="menu.menuId" class="menu" :class="{ 'menu-new-row': index % 3 === 0 }">
      <div class="menu-img" @click="addToCart(menu)">
        <img :src="getMenuImageUrl(menu)" alt="Menu Image">
      </div>
      <div class="menu-name">메뉴명 : {{ menu.name }}</div>
      <div class="menu-price">가격 : {{ menu.price }}원</div>
    </div>

    <!-- 장바구니 테이블 -->
    <div v-if="showCart" class="cart-table">
      <h2>장바구니</h2>
      <table>
        <thead>
          <tr>
            <th>메뉴명</th>
            <th>가격</th>
            <th>수량</th>
            <th>총 가격</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in cartItems" :key="index">
            <td>{{ item.name }}</td>
            <td>{{ item.price }}원</td>
            <td>{{ item.quantity }}</td>
            <td>{{ item.price * item.quantity }}원</td>
          </tr>
        </tbody>
      </table>
      <button @click="placeOrder">주문하기</button>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import { ref, watch, computed } from 'vue';
import axios from 'axios';

const props = defineProps({
  // 한국어임.
  category: String
});

// Data
const menus = ref([]);
const showCart = ref(false);
const cartItems = ref([]);

// Methods
const fetchMenus = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/menus/store/1');
    menus.value = response.data.data;
  } catch (error) {
    console.error('Error fetching menus:', error);
  }
};

const addToCart = (menu) => {
  const existingItem = cartItems.value.find(item => item.menuId === menu.menuId);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cartItems.value.push({
      menuId: menu.menuId,
      name: menu.name,
      price: menu.price,
      quantity: 1
    });
  }
  showCart.value = true;
};

const placeOrder = async () => {
  try {
    const orderData = {
      customerId: 1, // 고객 ID를 적절히 설정해야 함
      storeId: 1, // 가게 ID를 적절히 설정해야 함
      orderDetails: cartItems.value.map(item => ({
        menuId: item.menuId,
        quantity: item.quantity
      }))
    };
    const response = await axios.post('http://localhost:8080/api/orders', orderData);
    
    console.log('Order placed:', response.data);
    // 주문이 성공적으로 완료되면 장바구니 비우기 등의 작업 수행
    cartItems.value = [];
    showCart.value = false;
  } catch (error) {
    console.error('Error placing order:', error);
  }
};

// Computed
const filteredMenus = computed(() => {
  if (!menus.value.length) {
    return [];
  }
  return menus.value.filter(menu => {
    return menu.menuCategory.value == props.category;
  });
});

// 메뉴 이미지의 URL 생성하는 함수
const getMenuImageUrl = (menu) => {
  const profileImageFileName = menu.menuPictureUrl;
  const profileImageDirectory = 'http://localhost:8080/images/';
  return `${profileImageDirectory}${profileImageFileName}`;
};

// Watch
watch(() => props.category, () => {
  fetchMenus();
});

</script>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
}

.menu {
  width: calc(33.33% - 20px);
  margin: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-sizing: border-box;
}

.menu-new-row {
  clear: both;
}

.menu-img {
  width: 80px;
  height: 70px;
  background-color: #ddd;
  border-radius: 5px;
  margin: 0 auto 10px;
  display: block;
  cursor: pointer;
}

.menu-name,
.menu-price {
  text-align: center;
}

.menu-img img {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: 100%;
}

.cart-table {
  margin-top: 20px;
}

.cart-table table {
  width: 100%;
  border-collapse: collapse;
}

.cart-table th,
.cart-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

.cart-table th {
  background-color: #f2f2f2;
}

.cart-table button {
  margin-top: 10px;
  padding: 8px 16px;
  background-color: orange;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.cart-table button:hover {
  background-color: rgba(255, 68, 0, 0.895);
}
</style>