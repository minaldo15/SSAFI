// 사용자가 로그인하거나 로그아웃할 때 실행할 액션 생성자 함수를 정의합니다.
interface User {
  username: string;
  password: string;
}

export const login = (user: User) => {
  return {
    type: 'LOGIN' as const,
    payload: user,
  };
};

export const logout = () => {
  return {
    type: 'LOGOUT' as const,
  };
};
