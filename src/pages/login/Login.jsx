import { Button } from '@mui/material';
import { PageContainer } from '../../components/PageContainer';
import { useEffect } from 'react';
import useStore from '../../store/useStore';

function Login() {
  const store = useStore();
  const setUser = useStore((state) => state.setUser);

  const onClickLogin = () => {
    setUser({
      name: '고북스',
      email: 'gobooks@gmail.com',
      role: 'USER',
    });
  };

  useEffect(() => {
    console.log(store);
  }, [store]);
  return (
    <PageContainer>
      <main className="min-h-[300px]">로그인 페이지</main>
      <Button onClick={onClickLogin}>테스트</Button>
    </PageContainer>
  );
}

export default Login;
