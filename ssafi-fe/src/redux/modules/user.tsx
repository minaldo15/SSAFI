// import axios from 'axios';
// import { useNavigate } from 'react-router';
// import { Dispatch } from 'redux';

// // 액션 타입 정의
// const KAKAO_LOGIN = 'user/KAKAO_LOGIN';

// // 액션 생성자 정의
// export const kakaoLogin = (code: string, navigate: Function) => {
//   return async (dispatch: Dispatch) => {
//     try {
//       const request = {
//         snsType: 'KAKAO',
//         code,
//       };

//       const response = await axios.post(
//         'https://8264-211-192-210-179.ngrok-free.app/api/user/social-login',
//         request,
//       );
//       console.log(response.headers);
//       console.log(response.headers['authorization']);
//       console.log(response.headers['refreshtoken']);
//       if (response.status === 200) {
//         const ACCESS_TOKEN = response.headers['authorization'];
//         const REFRESH_TOKEN = response.headers['refreshtoken'];
//         localStorage.setItem('token', ACCESS_TOKEN);
//         dispatch({ type: KAKAO_LOGIN });
//         axios.defaults.headers.common[
//           'Authorization'
//         ] = `Bearer ${ACCESS_TOKEN}`;
//         navigate('/');
//       } else {
//         console.error('소셜 로그인 실패');
//         window.alert('로그인에 실패하였습니다.');
//         navigate('/');
//       }
//     } catch (error) {
//       console.error('소셜 로그인 에러', error);
//       window.alert('로그인에 실패하였습니다.');
//       navigate('/');
//     }
//   };
// };

// export const actionCreators = {
//   kakaoLogin,
// };

// // 초기 상태 및 리듀서 정의
// const initialState = {
//   // 초기 상태 값 정의
// };

// interface Action {
//   type: string;
// }

// export function userReducer(state = initialState, action: Action) {
//   switch (action.type) {
//     case KAKAO_LOGIN:
//       // KAKAO_LOGIN 액션 처리 코드 추가
//       return state;
//     default:
//       return state;
//   }
// }

export {};
