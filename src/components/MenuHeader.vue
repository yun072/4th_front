<script setup>
  import { useRouter } from 'vue-router'

  const router = useRouter();

  const goBack = () => {
    router.push({ name: "manager" });
  }
</script>

<template>
  <Header>
    <div class = "left">메뉴 관리</div>
    <button class = "right" @click="goBack">Go Back</button>
  </Header>

</template>

<style scoped>
  header {
    display: flex; /* 헤더를 플렉스 컨테이너로 설정하여 자식 요소를 배치합니다. */
    justify-content: space-between; /* 자식 요소 사이의 간격을 최대로 설정하여 왼쪽과 오른쪽에 요소를 배치합니다. */
    align-items: center; /* 수직 가운데 정렬을 설정합니다. */
    background-color: #D9D9D9;
    height : 70px;
  }

  .left {
    margin-right: auto; /* 왼쪽 요소를 가장 왼쪽에 배치합니다. */
    padding : 20px;
    font-weight: bold;
    font-size: 18px;
  }

  .right {
    margin-left: auto;
    padding : 20px;
    border: none;
    font-weight: bold;
    background-color: #D9D9D9;
    font-size: 18px;
  }
</style>