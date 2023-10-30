const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/uapi/domestic-stock', // 해당 경로로 시작하는 요청만 프록시됩니다.
    createProxyMiddleware({
      target: 'https://openapi.koreainvestment.com:29443', // 타겟 서버 주소
      changeOrigin: true, // 호스트 헤더를 타겟 서버에 맞춰 변경합니다.
      secure: false, // SSL/TLS 검증 비활성화
    }),
  );
};
