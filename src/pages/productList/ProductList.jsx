import { Link, useParams } from 'react-router-dom';

import { PageContainer } from '../../components/PageContainer';

function ProductList() {
  const params = useParams();
  return (
    <PageContainer>
      <main className="min-h-[300px]">
        상품 목록 페이지
        <Link className="block" to="/product/detail">
          상품상세
        </Link>
        <p>카테고리 id: {params.category1}</p>
      </main>
    </PageContainer>
  );
}

export default ProductList;
