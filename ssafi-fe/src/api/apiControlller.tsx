import axios from 'axios';

export const BASE_URL = 'http://localhost:8083/api';

const token = localStorage.getItem('accessToken');

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    accept: 'application/json',
    Authorization: token,
  },
  withCredentials: true,
});

const getAccessToken = () => {
  return localStorage.getItem('accessToken');
};

const getRefreshToken = () => {
  return localStorage.getItem('refreshToken');
};

const setAccessToken = (accessToken: string) => {
  localStorage.setItem('accessToken', accessToken);
};

const setRefreshToken = (refreshToken: string) => {
  localStorage.setItem('refreshToken', refreshToken);
};

// Request 🧑
instance.interceptors.request.use(
  async (config) => {
    const accessToken = getAccessToken();
    console.log(`보내기 > ${accessToken}`);
    if (accessToken) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = accessToken;
    }
    // console.log(config);
    return config;
  },
  (error) => Promise.reject(error),
);

// Response 🧑
instance.interceptors.response.use(
  async (response) => {
    console.log('응답 =>', response);
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    console.log(error, getRefreshToken());
    // // 401 에러면 refresh token 보내기
    if (error?.response?.data?.status === 401) {
      console.log('access-token 만료');
      try {
        console.log('refresh-token 보냄!');
        const response = await axios.post(`${BASE_URL}/auth/refresh`, {
          headers: {
            Authorization: getRefreshToken(),
          },
        });

        console.log('이전 access : ', getAccessToken());
        console.log('이전 refresh : ', getRefreshToken());
        // 응답 헤더에서 Access Token과 Refresh Token 추출
        const accessToken = response.headers['Authorization'];
        const refreshToken = response.headers['RefreshToken'];
        console.log('이후 access : ', accessToken);
        console.log('이후 refresh : ', refreshToken);
        // access token 을 다시 setting 하고 origin request 를 재요청
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        originalRequest.headers.Authorization = accessToken;

        // 새로운 토큰 발급 확인
        console.log('새로 발급한 토근', accessToken, refreshToken);

        return instance(originalRequest);
      } catch (error) {
        // 만약 refreshToken 보내도 error 가 뜨면 login 화면으로 보내기 -> redirect
        console.log('Error refreshing token:', error);

        // !login 이동
        console.log('리프레시토큰도 에러났나');
        window.location.href = '/auth'; // 로그인화면으로 보내기
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      }
    } else if (error?.response?.data?.status === 403) {
      // access token 자체를 안보낸 경우
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      // !login 이동
      window.location.href = '/auth';
      console.log('아니면 혹시 여기서? 여긴 403 에러');
    }

    return Promise.reject(error);
  },
);

export default instance;
