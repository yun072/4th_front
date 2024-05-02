const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  devServer: {
    proxy: {
      '/api': { // 프록시할 경로 설정
        target: 'http://localhost:8080', // 백엔드 서버의 주소 및 포트
        changeOrigin: true,
        pathRewrite: { '^/api': '' }, // 요청 경로 재작성
      }
    },
    port: 3000 // 프론트엔드 개발 서버의 포트 설정
  },
  transpileDependencies: true
});