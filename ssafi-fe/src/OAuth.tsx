const restApiKey = 'a21cb4cfd9c1a81b77614f1af356f2d1'; // REST API KEY
const redirectUri = 'http://localhost:3000/auth'; // Redirect URI

// oauth 요청 URL
const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${restApiKey}&redirect_uri=${redirectUri}&response_type=code`;
export default kakaoURL;
