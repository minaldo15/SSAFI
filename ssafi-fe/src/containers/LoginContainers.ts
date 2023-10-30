// import { connect } from 'react-redux';
// import { Dispatch } from '@reduxjs/toolkit';
// import { useNavigate } from 'react-router';
// import { actionCreators as userActions } from '../redux/modules/user';
// import Header from '../components/Header';

// interface RootState {
//   auth: {
//     isLoggedIn: boolean;
//   };
// }

// interface User {
//   username: string;
//   password: string;
// }

// const mapStateToProps = (state: RootState) => {
//   return {
//     isLoggedIn: state.auth.isLoggedIn,
//   };
// };
// const navigate = useNavigate();

// const mapDispatchToProps = (dispatch: Dispatch) => {
//   return {
//     login: (code: string) => {
//       dispatch(userActions.kakaoLogin(code, navigate) as any);
//     },
//     logout: () => {
//       // 로그아웃 로직 추가 (필요시)
//     },
//   };
// };

// const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Header);

// export default LoginContainer;
export {};
