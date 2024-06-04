import { Link } from 'react-router-dom';
import { PageContainer } from '../../components/PageContainer';

function Cart() {
  return (
    <PageContainer>
      <main className="min-h-[300px]">
        장바구니 페이지
        <Link className="block" to="/order">
          주문하기
        </Link>
      </main>
    </PageContainer>
  );
}

export default Cart;
