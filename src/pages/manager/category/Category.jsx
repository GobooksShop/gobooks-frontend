import { Link } from 'react-router-dom';
import { PageContainer } from '../../../components/PageContainer';

function Category() {
  return (
    <PageContainer>
      <main className="min-h-[300px]">
        <Link className="block" to="/category/management">
          카테고리 관리
        </Link>
        <Link className="block" to="/product/management">
          상품 관리
        </Link>
        <br />
        <div>카테고리 관리 페이지</div>
      </main>
    </PageContainer>
  );
}

export default Category;
