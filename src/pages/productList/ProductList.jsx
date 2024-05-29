import { Link, useParams } from 'react-router-dom';

function ProductList() {
  const params = useParams();
  return (
    <main className="min-h-[300px]">
      상품 목록 페이지
      <Link className="block" to="/product/detail">
        상품상세
      </Link>
      <p>카테고리 id: {params.category1}</p>
    </main>
  );
}

export default ProductList;
