import { Link, useParams } from 'react-router-dom';
import type { Product } from '../types';

interface ProductDetailProps {
  products: Product[];
}

const priceFormatter = new Intl.NumberFormat('ja-JP');

export function ProductDetail({ products }: ProductDetailProps) {
  const { id } = useParams();
  const productId = id && /^\d+$/.test(id) ? Number(id) : Number.NaN;
  const product = products.find((item) => item.id === productId);

  if (!product) {
    return (
      <section className="product-not-found">
        <h2>商品が見つかりません</h2>
        <p>指定された商品は存在しないか、現在表示できません。</p>
        <Link className="detail__back" to="/">
          ← 商品一覧へ戻る
        </Link>
      </section>
    );
  }

  return (
    <section className="detail">
      <Link className="detail__back" to="/">
        ← 商品一覧へ戻る
      </Link>

      <article className="detail__panel">
        <div className="detail__imagewrap">
          <img
            className="detail__image"
            src={product.imageUrl}
            alt={product.name}
          />
        </div>
        <div className="detail__body">
          <h2 className="detail__name">{product.name}</h2>
          <p className="detail__description">{product.description}</p>
          <p className="detail__price">
            ¥{priceFormatter.format(product.price)}
            <span className="detail__tax">税込</span>
          </p>
        </div>
      </article>
    </section>
  );
}
